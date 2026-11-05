import puppeteer from 'puppeteer-core';
import path from 'path';

async function generatePdf() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outputPath = path.resolve(process.cwd(), 'Mikael_Carlsson_Portfolio.pdf');

  console.log('Launching browser at:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  console.log('Navigating to http://localhost:5173/#/print ...');
  await page.goto('http://localhost:5173/#/print', {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  // Give images and fonts a moment to fully settle
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Generating PDF to:', outputPath);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '12mm',
      right: '12mm',
    },
  });

  await browser.close();
  console.log('PDF generated successfully!');
}

generatePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
