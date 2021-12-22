const { parse } = require("url");
const got = require("got");
// Initialize metascraper passing in the list of rules bundles to use.
const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
]);


// For an API route to work, you need to export a function as default (a.k.a request handler),
// which then receives the following parameters:
// - req: The request object.
// - res: The response object.
// See https://vercel.com/docs/serverless-functions/supported-languages#node.js for details.
export default async function handler(req, res) {
  // Parse the "?url" query parameter.
  const targetUrl = parse(req.url, true).query?.url;

  // Make sure the provided URL is valid.
  if (!targetUrl) {
    res
      .status(401)
      .send('Please provide a valid URL in the "url" query parameter.');
    return;
  }

  try {
    // Use the got library to fetch the website content.
    const { body: html, url } = await got(targetUrl);
    // Extract the metadata from the website content.
    const metadata = await metascraper({ html, url });
    // The Vercel Edge Network can cache the response at the edge in order to 
    // serve data to your users as fast as possible.
    // Here we're caching the response at the edge for 1 hour.
    // See https://vercel.com/docs/edge-network/caching for details.
    res.setHeader("Cache-Control", "s-maxage=3600");    
    // Make this API publicly accessible. 
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Return the metadata as JSON
    res.status(200).json(metadata);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: `Unable to scrape "${url}".` });
  }
}