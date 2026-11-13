/**
 * 慢网络切页自检
 *
 * 模拟「点导航 → 新页面 HTML 要 3 秒才回来」，检查中间那段时间页面是否白屏。
 *
 * 判定标准：
 *   跳转后 1.5 秒（新页面还没到）时，主内容区文字量必须仍然 > 100（旧页面还在），
 *   且不能出现「主区可见但空白」。
 *
 * 用法：node scripts/ui-slow-check.mjs [baseURL]
 */

import { chromium } from "playwright-core";

const BASE = process.argv[2] || "http://127.0.0.1:8899";
const CHROME =
	process.env.CHROME_PATH ||
	"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const browser = await chromium.launch({
	executablePath: CHROME,
	proxy: proxy ? { server: proxy } : undefined,
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

await page.route("**/*", async (route) => {
	const url = route.request().url();
	if (!url.startsWith(BASE) && !url.startsWith("data:")) return route.abort();
	// 只延迟「页面文档」请求，模拟慢网拉取新页面
	if (url.endsWith("/archive/") || url.endsWith("/archive/index.html")) {
		await new Promise((r) => setTimeout(r, 3000));
	}
	return route.continue();
});

const text = () =>
	page.evaluate(() => {
		const main = document.querySelector("main") || document.body;
		return (main.innerText || "").replace(/\s+/g, "").length;
	});

await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => document.documentElement.classList.contains("swup-enabled"), null, { timeout: 20000 });
await page.waitForTimeout(600);
console.log("跳转前 首页文字量:", await text());

await page.evaluate(() => window.swup.navigate("/archive/"));

await page.waitForTimeout(1500);
const during = await text();
const holdClass = await page.evaluate(() =>
	document.documentElement.classList.contains("is-fetch-hold"),
);
console.log("跳转后 1.5s（新页面未到）文字量:", during, "| is-fetch-hold:", holdClass);

await page.waitForTimeout(3000);
const after = await text();
console.log("跳转后 4.5s（新页面已到）文字量:", after);

await page.screenshot({ path: ".shots/slow-nav.png" });
await browser.close();

const pass = during > 100 && after > 100;
console.log("\n=== 结果 ===");
console.log(pass ? "通过：等待期间旧页面保持可见，没有白屏" : "未通过：等待期间出现空白");
if (!pass) process.exitCode = 1;
