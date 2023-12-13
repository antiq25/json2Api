import puppeteer from "puppeteer";
import fs from "fs";
import readline from "readline";

interface ApiCall {
  method: string;
  requestUrl: string;
  headers: { [key: string]: string };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the URL of the page to analyze for API calls: ", (url) => {
  if (!url) {
    console.log("No URL provided. Aborting.");
    rl.close();
    return;
  }

  (async () => {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Prepare to intercept network requests
    await page.setRequestInterception(true);
    const apiCalls: ApiCall[] = [];

    // Add event listener to capture all network requests
    page.on("request", (interceptedRequest) => {
      const requestUrl = interceptedRequest.url();
      const method = interceptedRequest.method();
      const headers = interceptedRequest.headers();

      // Filter out non-HTTP request methods if needed
      const validMethods = ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"];
      if (validMethods.includes(method)) {
        // Log the API call details including headers
        apiCalls.push({
          method,
          requestUrl,
          headers: JSON.parse(JSON.stringify(headers)), // Clone headers object
        });
      }

      // Continue the request
      interceptedRequest.continue();
    });

    // Navigate to the target page
    await page.goto(url, { waitUntil: "networkidle0" });

    // Write the API calls to a JSON file
    const apiCallsJson = JSON.stringify(apiCalls, null, 2);
    fs.writeFileSync("api-calls.json", apiCallsJson);

    // Close Puppeteer
    await browser.close();
    rl.close();

    console.log("API calls with headers have been saved to api-calls.json");
  })();
});
