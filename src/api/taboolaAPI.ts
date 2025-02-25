// This file will contain the code for the Taboola API.

import { TaboolaResponse } from './types';

//const section
// THOSE SHOULD BE IN A .ENV FILE, but we are not allowed to use libraries
const API_BASE = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";
const API_KEY = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
const APP_TYPE = "desktop";
const COUNT = 4;
const TYPE = "video";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second



// Using a reliable public CORS proxy for the USA region for the API
const CORS_PROXY = 'https://corsproxy.io/?';

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
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        attempts++;
        console.log(`Attempt ${attempts} of ${MAX_RETRIES} to fetch recommendations`);

        const params = new URLSearchParams({
            "app.type": APP_TYPE,
            "app.apikey": API_KEY,
            "source.id": sourceId,
            "rec.count": COUNT.toString(),
            "source.type": TYPE,
        });

        const url = `${CORS_PROXY}${encodeURIComponent(API_BASE)}?${params.toString()}`;
        console.log("Fetching URL:", url);
        
       
           

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(`Received ${data.list.length} recommendations`);

            if (data.list && data.list.length > 0) {
                console.log("Recieved recommendations:", data.list , "after", attempts, "attempts");
                return data;
            }

            console.log("Received empty list, retrying...");
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } catch (error) {
            if (attempts === MAX_RETRIES) {
                throw error;
            }
            console.log(`Attempt ${attempts} failed:`, error);
        }
    }

    throw new Error(`Failed to get non-empty recommendations after ${MAX_RETRIES} attempts`);
}