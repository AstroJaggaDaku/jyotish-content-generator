const puppeteer = require('puppeteer');
const fs = require('fs');

const rashis = [
  { name: 'মেষ', url: 'mesh' },
  { name: 'বৃষ', url: 'brish' },
  { name: 'মিথুন', url: 'mithun' },
  { name: 'কর্কট', url: 'karkat' },
  { name: 'সিংহ', url: 'singha' },
  { name: 'কন্যা', url: 'konna' },
  { name: 'তুলা', url: 'tula' },
  { name: 'বৃশ্চিক', url: 'brischik' },
  { name: 'ধনু', url: 'dhonu' },
  { name: 'মকর', url: 'mokor' },
  { name: 'কুম্ভ', url: 'kumbh' },
  { name: 'মীন', url: 'meen' }
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let data = {};

  for (let rashi of rashis) {
    const fullUrl = `https://www.anandabazar.com/horoscope/todays-${rashi.url}-horoscope-ajker-${rashi.url}-rashifal-in-bengali`;
    await page.goto(fullUrl, { waitUntil: 'networkidle2' });

    const result = await page.evaluate(() => {
      const content = document.querySelector('.custom-horoscope-data')?.innerText;
      return content || 'Content not found';
    });

    data[rashi.url] = {
      name: rashi.name,
      content: result
    };
  }

  await browser.close();

  fs.writeFileSync('./public/rashi.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log("✅ Rashifal updated.");
})();
