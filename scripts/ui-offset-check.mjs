/**
 * 横向留白自检
 *
 * 在多种设备尺寸/触屏参数下，检查页面主体是否左右对称贴边。
 * 判定：body 的左边缘应接近 0，且主体左右留白差不超过 2px。
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] || "http://127.0.0.1:8899";
const CHROME = process.env.CHROME_PATH || "C://Program Files//Google//Chrome//Application//chrome.exe";
const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

const CASES = [
	["小米/安卓触屏 393×852", 393, 852, true],
	["平板 810×1080", 810, 1080, true],
	["iPhone 390×844", 390, 844, true],
	["小屏 320×568", 320, 568, true],
	["桌面 1440×900", 1440, 900, false],
];

const browser = await chromium.launch({
	executablePath: CHROME,
	proxy: proxy ? { server: proxy } : undefined,
});
const problems = [];

for (const [name, width, height, touch] of CASES) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		hasTouch: touch,
		isMobile: touch,
	});
	const page = await ctx.newPage();
	await page.route("**/*", (r) =>
		r.request().url().startsWith(BASE) || r.request().url().startsWith("data:") ? r.continue() : r.abort(),
	);
	await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 45000 });
	await page.waitForTimeout(1500);

	const m = await page.evaluate(() => {
		const el = document.querySelector("#navbar-wrapper") || document.body;
		const r = el.getBoundingClientRect();
		return {
			left: Math.round(r.left),
			rightGap: Math.round(window.innerWidth - r.right),
			gutter: getComputedStyle(document.documentElement).scrollbarGutter,
			docLeft: Math.round(document.documentElement.getBoundingClientRect().left),
			scrollW: document.documentElement.scrollWidth,
			innerW: window.innerWidth,
		};
	});

	// 触屏：左右留白必须对称且不能有横向溢出；桌面允许右侧预留滚动条宽度
	const diff = Math.abs(m.left - m.rightGap);
	const overflowX = m.scrollW > m.innerW + 1;
	const ok = touch ? diff <= 2 && !overflowX : !overflowX;
	console.log(
		`${name.padEnd(20)} 左边距 ${String(m.left).padStart(3)}px 右边距 ${String(m.rightGap).padStart(3)}px | scrollbar-gutter: ${m.gutter} | 文档宽 ${m.scrollW}/${m.innerW}${ok ? "" : "  ← 左右不对称"}`,
	);
	if (!ok) problems.push(`${name} 左边距 ${m.left}px / 右边距 ${m.rightGap}px（scrollbar-gutter: ${m.gutter}）`);
	await ctx.close();
}

await browser.close();
console.log("\n=== 结果 ===");
if (problems.length === 0) {
	console.log("全部通过：各尺寸下主体左右贴边对称");
} else {
	for (const p of problems) console.log("✗ " + p);
	process.exitCode = 1;
}
