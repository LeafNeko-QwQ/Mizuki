import { chromium } from "playwright-core";
const BASE = "http://127.0.0.1:8899";
const browser = await chromium.launch({ executablePath: "C://Program Files//Google//Chrome//Application//chrome.exe" });
for (const w of [320, 360, 393, 412]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.route("**/*", (r) => r.request().url().startsWith(BASE) || r.request().url().startsWith("data:") ? r.continue() : r.abort());
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const vw = window.innerWidth;
    const bad = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > vw + 1) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || "",
          cls: (el.className && el.className.toString().slice(0, 60)) || "",
          right: Math.round(r.right),
          w: Math.round(r.width),
        });
      }
    });
    return { vw, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 6) };
  });
  console.log(`\n视口 ${w} → 文档宽 ${info.scrollW}，越界元素 ${info.bad.length} 个`);
  info.bad.forEach((b) => console.log(`   ${b.tag}${b.id ? "#" + b.id : ""}.${b.cls} 右边 ${b.right} 宽 ${b.w}`));
  await ctx.close();
}
await browser.close();
