// This file will contain the code for the Taboola API.



import { TaboolaResponse } from './types';


//const section
// THOSE SHOULD BE IN A .ENV FILE, but we are not allowed to use libraries
const API_BASE = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";
const API_KEY = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
const APP_TYPE = "desktop";
const COUNT = 4;
const TYPE = "video";



/**
 * Fetch recommendations from the Taboola API.
 * For this test, only the required parameters are used.
 *
 * @param sourceId - A constant string for the source, e.g., "demoSource"
 * @returns A promise that resolves with the TaboolaResponse.
 */
export function fetchRecommendations(
    sourceId: string = "demoSource"
): Promise<TaboolaResponse> { //return type
    const params = new URLSearchParams({
        "app.type": APP_TYPE,
        "app.apikey": API_KEY,
        "source.id": sourceId,
        "rec.count": COUNT.toString(),
        "source.type": TYPE,
    });

    const url = `${API_BASE}?${params.toString()}`;
    console.log("Fetching URL:", url);

    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        console.log("Response:", response);
        return response.json();
    });
}