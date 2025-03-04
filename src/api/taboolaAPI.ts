// This file will contain the code for the Taboola API.

import { TaboolaResponse } from "./types";

//const section
// THOSE SHOULD BE IN A .ENV FILE, but we are not allowed to use libraries
const API_BASE =
  "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";
const API_KEY = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
const APP_TYPE = "desktop";
const COUNT = 4;
const TYPE = "video";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Using a reliable public CORS proxy for the USA region for the API
const CORS_PROXY = "https://corsproxy.io/?key=4d9510c4&url=";

/**
 * Fetch recommendations from the Taboola API.
 * For this test, only the required parameters are used.
 *
 * @param sourceId - A constant string for the source, e.g., "demoSource"
 * @returns A promise that resolves with the TaboolaResponse.
 */
export async function fetchRecommendations(
  sourceId: string = "demoSource"
): Promise<TaboolaResponse> {
  //not sure if this is better than just using params
  const fullApiUrl = `${API_BASE}?app.type=${APP_TYPE}&app.apikey=${API_KEY}&source.id=${sourceId}&rec.count=${COUNT}&source.type=${TYPE}`;
  const url = `${CORS_PROXY}${encodeURIComponent(fullApiUrl)}`;

  const response = await retry(
    () => getResponse(url),
    MAX_RETRIES,
    RETRY_DELAY
  );

  return response;
}

async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  let attempts = 0;

  while (attempts < retries) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed:`, error);

      if (attempts >= retries) {
        throw new Error(`Failed after ${retries} attempts`);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Failed after ${retries} attempts`);
}

async function getResponse(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
