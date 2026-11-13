import { chromium } from "playwright-core";
const url = process.argv[2] || "https://leafneko.cc.cd/";
const out = process.argv[3] || ".shots/live.png";
const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const browser = await chromium.launch({
  executablePath: "C://Program Files//Google//Chrome//Application//chrome.exe",
  proxy: proxy ? { server: proxy } : undefined,
});
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(4000);
console.log(await page.evaluate(() => {
  const main = document.querySelector("main") || document.body;
  return { text: (main.innerText || "").replace(/\s+/g, "").length, title: document.title };
}));
await page.screenshot({ path: out });
await browser.close();
