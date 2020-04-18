const puppeteer = require("puppeteer");
const fs = require("fs");
const Path = require("path");
const Axios = require("axios");
let browser;

const fetchQuranImages = async (pageNumber) => {
  const page = await browser.newPage();
  await page.goto(`https://www.searchtruth.com/quran/mushaf/7/${pageNumber}/`, {
    waitUntil: "networkidle2",
  });
  const data = await page.evaluate(
    () => document.querySelector("#centerData > img").src
  );

  const path = Path.resolve(__dirname, "quran-images", `${pageNumber}.jpg`);

  const res = await Axios({
    url: data,
    responseType: "stream",
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(path);
    res.data.pipe(writer);
    writer.on("finish", () => {
      resolve(pageNumber);
      writer.end();
    });
    writer.on("error", reject);
  });
};

const downloadAllQuranImages = async () => {
  browser = await puppeteer.launch();
  console.log("fetching Quran Pages...");
  const arrOfPages = Array.from({ length: 604 }, (_, i) => i + 1);
  for await (let num of arrOfPages) {
    console.log(`downloading page number: ${num}`);
    const res = await fetchQuranImages(num);

    if (res === 604) {
      browser.close();
      console.log("finished");
    }
  }
};

module.exports = {
  downloadAllQuranImages,
};
