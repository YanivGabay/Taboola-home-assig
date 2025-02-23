import { fetchRecommendations } from "../api/taboolaAPI";
import { TaboolaRecommendation } from "../api/types";

import Logger from '../utils/Logger';

/**
 * RecommendationWidget is a container component for displaying recommendations.
 * It handles fetching data from the Taboola API, managing loading and error states,
 * and rendering the fetched sponsored recommendations.
 */

export class RecommendationWidget {
    private container: HTMLElement;
  
    /**
     * Creates an instance of RecommendationWidget.
     * @param containerId - The ID of the HTML element where the widget will be rendered.
     */
    constructor(containerId: string) {
      const el = document.getElementById(containerId);
      if (!el) {
        throw new Error(`Container element with id "${containerId}" not found.`);
      }
      this.container = el;
    }
  
    /**
     * Initializes the widget by displaying a loading state, fetching recommendations,
     * and rendering the results (or an error message if fetching fails).
     */
    public async init(): Promise<void> {
      this.renderLoading();
  
      try {
        // Fetch recommendations from the Taboola API using a constant source ID.
        const response = await fetchRecommendations("demoSource");
        Logger.info("Recommendations fetched successfully");
        Logger.debug("Response:", response);
        // Render the list of recommendations.
        this.renderRecommendations(response.list);
      } catch (error: any) {
        // If an error occurs during fetching, render an error message.
        this.renderError(error);
      }
    }
  
    /**
     * Renders a loading indicator in the container.
     */
    private renderLoading(): void {
      this.container.innerHTML = `<p>Loading recommendations...</p>`;
    }
  
    /**
     * Renders an error message in the container.
     * @param error - The error encountered during fetching.
     */
    private renderError(error: Error): void {
      this.container.innerHTML = `<p>Error loading recommendations: ${error.message}</p>`;
    }
  
    /**
     * Renders a list of recommendations.
     * Each recommendation is displayed as a list item containing an anchor.
     * Clicking the anchor opens the recommendation URL in a new tab.
     * @param recommendations - An array of recommendations fetched from the API.
     */
    private renderRecommendations(recommendations: TaboolaRecommendation[]): void {
      // Clear the container.
      this.container.innerHTML = "";
  
      // Create a list element to hold recommendation items.
      const ul = document.createElement("ul");
      ul.style.listStyleType = "none"; // Remove default list styling.
  
      recommendations.forEach((rec) => {
        const li = document.createElement("li");
  
        // Create an anchor element for each recommendation.
        const a = document.createElement("a");
        a.href = rec.url;
        a.target = "_blank"; // Opens the link in a new tab.
        a.style.textDecoration = "none";
        a.style.display = "block";
        a.style.marginBottom = "10px";
  
        // Render the thumbnail image if available.
        const img = document.createElement("img");
        // Use the first thumbnail's URL. Adjust if your API provides multiple thumbnails.
        img.src = rec.thumbnail[0].url;
        img.alt = rec.name;
        img.style.maxWidth = "100%";
        a.appendChild(img);
  
        // Render the recommendation name.
        const title = document.createElement("p");
        title.textContent = rec.name;
        a.appendChild(title);
  
        li.appendChild(a);
        ul.appendChild(li);
      });
  
      this.container.appendChild(ul);
    }
  }