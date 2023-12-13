import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

interface ApiCall {
  method: string;
  requestUrl: string;
  headers: { [key: string]: string };
}

function generateRandomFunctionName(): string {
  const prefix = "fetchData";
  const suffix = Math.random().toString(36).substring(2, 15);
  return `${prefix}_${suffix}`;
}

function generateFetchCall(apiCall: ApiCall, functionName: string): string {
  const { requestUrl, method, headers } = apiCall;
  const headersString = JSON.stringify(headers, null, 2);

  return `export const ${functionName} = () => {
  return fetch("${requestUrl}", {
    method: "${method}",
    headers: ${headersString}
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};`;
}

function convertApiCallsToJson(jsonFilePath: string): void {
  fs.readFile(
    jsonFilePath,
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error("Error reading the JSON file:", err);
        return;
      }

      try {
        const apiCalls: ApiCall[] = JSON.parse(data);
        const fetchCalls = apiCalls
          .map((apiCall) =>
            generateFetchCall(apiCall, generateRandomFunctionName()),
          )
          .join("\n\n");
        console.log(fetchCalls);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    },
  );
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonFilePath = path.resolve(__dirname, "../../api-calls.json");
convertApiCallsToJson(jsonFilePath);
