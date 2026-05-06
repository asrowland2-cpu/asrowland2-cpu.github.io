// One-off Playwright screenshots at desktop and mobile widths.
// Assumes astro preview is running on http://localhost:4321/.
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

for (const [label, viewport] of [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let .rise animations settle
  await page.screenshot({ path: `/tmp/home-${label}.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
console.log('done');
