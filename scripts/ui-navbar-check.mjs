/** 导航栏不越界自检：各窄屏宽度下，导航内所有可见元素的右边缘不得超出视口 */
import { chromium } from "playwright-core";
const BASE = process.argv[2] || "http://127.0.0.1:8899";
const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const browser = await chromium.launch({ executablePath: "C://Program Files//Google//Chrome//Application//chrome.exe", proxy: proxy ? { server: proxy } : undefined });
const problems = [];
for (const w of [320, 360, 375, 393, 412]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.route("**/*", (r) => r.request().url().startsWith(BASE) || r.request().url().startsWith("data:") ? r.continue() : r.abort());
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  const res = await page.evaluate(() => {
    const vw = window.innerWidth;
    const nav = document.querySelector("#navbar");
    const buttons = [...nav.querySelectorAll("button, a, #search-container")].map((el) => {
      const r = el.getBoundingClientRect();
      return { id: el.id || el.tagName.toLowerCase(), right: Math.round(r.right), w: Math.round(r.width) };
    }).filter((b) => b.w > 0);
    const maxRight = buttons.length ? Math.max(...buttons.map((b) => b.right)) : -1;
    const over = buttons.filter((b) => b.right > vw + 1);
    return { vw, maxRight, over };
  });
  const ok = res.over.length === 0;
  console.log(`视口 ${String(w).padStart(3)}  最右元素 ${String(res.maxRight).padStart(3)}px  ${ok ? "OK" : "← 越界: " + res.over.map((o) => o.id).join(",")}`);
  if (!ok) problems.push(`视口 ${w} 越界元素 ${res.over.map((o) => `${o.id}@${o.right}`).join(", ")}`);
  if (w === 375) await page.screenshot({ path: ".shots/nav-375.png", clip: { x: 0, y: 0, width: w, height: 120 } });
  await ctx.close();
}
await browser.close();
console.log(problems.length ? "\n✗ " + problems.join(" | ") : "\n全部通过：各宽度下导航元素均在视口内");
if (problems.length) process.exitCode = 1;
