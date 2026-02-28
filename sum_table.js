// sum-tables.js
const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
  const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

  let totalSum = 0;

  for (const seed of seeds) {
    const url = baseUrl + seed;
    console.log(`Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Extract all numbers from all tables
    const numbers = await page.evaluate(() => {
      const allNumbers = [];

      // Find all table cells in all tables
      const cells = document.querySelectorAll('table td, table th');
      for (const cell of cells) {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) {
          allNumbers.push(num);
        }
      }

      return allNumbers;
    });

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;

    console.log(`Sum for seed ${seed}: ${pageSum}`);
  }

  console.log(`FINAL TOTAL SUM: ${totalSum}`);
  await browser.close();
}

main().catch(console.error);
