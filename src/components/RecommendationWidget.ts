import { fetchRecommendations } from "../api/taboolaAPI.js";
import { TaboolaRecommendation } from "../api/types.js";
import { RecommendationItemFactory } from "./RecommendationItemFactory.js";

/**
 * RecommendationWidget is a container component for displaying recommendations.
 * It handles fetching data from the Taboola API, managing loading and error states,
 * and rendering the fetched sponsored recommendations.
 */

export class RecommendationWidget {
  private container: HTMLElement;
  private widgetType: string;
  /**
   * Creates an instance of RecommendationWidget.
   * @param containerId - The ID of the HTML element where the widget will be rendered.
   */
  constructor(containerId: string, widgetType: string) {
    const el = document.getElementById(containerId);

    console.log("Container element:", el);
    if (!el) {
      throw new Error(`Container element with id "${containerId}" not found.`);
    }
    this.container = el;
    this.widgetType = widgetType;
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
    this.container.innerHTML = `<div class="taboola-loading">Loading recommendations...</div>`;
  }

  /**
   * Renders an error message in the container.
   * @param error - The error encountered during fetching.
   */
  private renderError(error: Error): void {
    this.container.innerHTML = `<div class="taboola-error">Error loading recommendations: ${error.message}</div>`;
  }

  /**
   * Renders a list of recommendations.
   * Each recommendation is displayed as a list item containing an anchor.
   * Clicking the anchor opens the recommendation URL in a new tab.
   * @param recommendations - An array of recommendations fetched from the API.
   */
  private renderRecommendations(
    recommendations: TaboolaRecommendation[]
  ): void {
    this.container.innerHTML = "";

    const ul = document.createElement("ul");
    ul.className = "recommendations-list";
    ul.style.listStyleType = "none";

    recommendations.forEach((rec) => {
      // Use the factory to get the correct item type
      const itemComponent = RecommendationItemFactory.create(
        this.widgetType,
        rec
      );
      const itemElement = itemComponent.render();
      ul.appendChild(itemElement);
    });

    this.container.appendChild(ul);
  }
}
