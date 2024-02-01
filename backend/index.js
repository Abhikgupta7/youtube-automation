require('dotenv').config()
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000
// const PORT = 4000

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

app.use(cors());

app.get('/search', async (req, res) => {
  const searchQuery = req.query.query;
  console.log(searchQuery);
  // return;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true, });
    const page = await browser.newPage();

    await page.goto(`https://www.youtube.com`, { timeout: 90000 });

    await page.type('input#search', searchQuery);
    await page.click('button#search-icon-legacy');


    await page.goto(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, { timeout: 90000 }, {
      waitUntil: 'domcontentloaded',
    });

    await page.waitForSelector('#video-title');

    const topVideos = await page.evaluate(() => {
      const videoElements = document.querySelectorAll('#video-title');
      const result = [];
      for (const videoElement of videoElements) {
        console.log(videoElement.className);
        if (videoElement.className == "yt-simple-endpoint style-scope ytd-video-renderer") {
          const title = videoElement.textContent;
          const videoUrl = videoElement.href;
          result.push({ title, videoUrl });
        }
        if (result.length == 5) break;
      }

      return result;
    });


    await browser.close();

    res.json(topVideos);
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is Listening ${PORT}`);
});