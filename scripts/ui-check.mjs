/**
 * 站点可用性自检（真实浏览器）
 *
 * 目的：用真实 Chromium 打开本地 dist，逐个页面验证「内容是否真的渲染出来」，
 * 再模拟站内跳转（点导航）验证 Swup 切换后内容是否还在——
 * 而不是靠抓 HTML 猜。
 *
 * 用法：node scripts/ui-check.mjs [baseURL]
 * 默认 http://127.0.0.1:8899
 */

import { chromium } from "playwright-core";

const BASE = process.argv[2] || "http://127.0.0.1:8899";
const CHROME =
	process.env.CHROME_PATH ||
	"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const PAGES = [
	["首页", "/"],
	["归档", "/archive/"],
	["追番", "/anime/"],
	["关于", "/about/"],
	["友链", "/friends/"],
	["文章页", "/posts/markdown-tutorial/"],
];

const VIEWPORTS = [
	["桌面", { width: 1440, height: 900 }],
	["手机", { width: 390, height: 844 }],
];

/** 统计主内容区可见文字量：用 offsetHeight/innerText 判断是否真的画出来了 */
async function measure(page) {
	return page.evaluate(() => {
		const main = document.querySelector("main") || document.body;
		const text = (main.innerText || "").replace(/\s+/g, "");
		const bodyText = (document.body.innerText || "").replace(/\s+/g, "");
		const mainRect = main.getBoundingClientRect();
		return {
			mainText: text.length,
			bodyText: bodyText.length,
			mainHeight: Math.round(mainRect.height),
			cssLoaded: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() !== "",
			htmlClass: document.documentElement.className,
		};
	});
}

const browser = await chromium.launch({ executablePath: CHROME });
const problems = [];

for (const [viewportName, viewport] of VIEWPORTS) {
	const context = await browser.newContext({ viewport });
	const page = await context.newPage();
	// 本地自检：拦掉所有外部请求，避免外部接口拖到超时导致判定不准
	await page.route("**/*", (route) => {
		const url = route.request().url();
		if (url.startsWith(BASE) || url.startsWith("data:")) return route.continue();
		return route.abort();
	});
	page.on("pageerror", (e) => problems.push(`[${viewportName}] 脚本报错: ${e.message}`));

	for (const [name, path] of PAGES) {
		await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 45000 });
		await page.waitForFunction(() => document.documentElement.classList.contains("swup-enabled"), null, { timeout: 20000 });
await page.waitForTimeout(600);
		const m = await measure(page);
		const flag = m.mainText < 100 || !m.cssLoaded ? "  ← 疑似空白/未上样式" : "";
		console.log(
			`${viewportName} 首次打开 ${name.padEnd(4)} 主区文字 ${String(m.mainText).padStart(5)} 字，主区高度 ${m.mainHeight}px，CSS ${m.cssLoaded ? "已加载" : "缺失"}${flag}`,
		);
		if (m.mainText < 100) problems.push(`[${viewportName}] ${name} 首次打开主区文字仅 ${m.mainText} 字`);
		if (!m.cssLoaded) problems.push(`[${viewportName}] ${name} 样式变量未生效`);
	}

	// 站内跳转：点导航里的“归档”，看切换后内容是否还在
	await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 45000 });
	await page.waitForFunction(() => document.documentElement.classList.contains("swup-enabled"), null, { timeout: 20000 });
await page.waitForTimeout(600);
	// 站内跳转：走 Swup 的真实导航 API（等价于点导航链接），看切换后内容是否还在
	const beforeUrl = page.url();
	await page.evaluate(() => {
		if (window.swup && typeof window.swup.navigate === "function") {
			window.swup.navigate("/archive/");
		} else {
			window.location.href = "/archive/";
		}
	});
	await page.waitForTimeout(2000);
	const m = await measure(page);
	const url = page.url();
	const ok = m.mainText > 100 && url.includes("archive");
	console.log(
		`${viewportName} 站内跳转 归档   主区文字 ${String(m.mainText).padStart(5)} 字，地址 ${url.replace(BASE, "") || "/"}${ok ? "" : "  ← 切换后空白"}`,
	);
	if (!ok) problems.push(`[${viewportName}] 站内跳转到归档后主区文字 ${m.mainText} 字（地址 ${url}，起始 ${beforeUrl.replace(BASE, "")}）`);
	await page.screenshot({ path: `.shots/nav-${viewportName}-archive.png` });

	await context.close();
}

await browser.close();

console.log("\n=== 结果 ===");
if (problems.length === 0) {
	console.log("全部通过：6 个页面 × 2 种视口内容均渲染，站内跳转后内容保留");
} else {
	for (const p of problems) console.log("✗ " + p);
	process.exitCode = 1;
}
