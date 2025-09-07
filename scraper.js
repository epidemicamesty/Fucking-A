const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event) => {
  const query = event.queryStringParameters.query || "";
  let results = [];

  try {
    // Example: Scraping Reddit (safe fallback)
    const url = `https://www.reddit.com/search/?q=${encodeURIComponent(query)}&type=link`;
    const { data } = await axios.get(url, { headers: { "User-Agent": "ScraperGodBot/1.0" } });
    const $ = cheerio.load(data);

    $("img").each((i, el) => {
      const src = $(el).attr("src");
      if (src && src.startsWith("http")) results.push(src);
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ results })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
