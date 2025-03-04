import { BaseRecommendationItem } from "./BaseRecommendationItem.js";

export class SponsoredRecommendationItem extends BaseRecommendationItem {
  public render(): HTMLElement {
      const li = document.createElement("li");
      li.className = "recommendation-item";

      // Customizing the link element
      const link = this.createLinkElement({
          target: "_self", // Open in the same tab
          textDecoration: "underline",
          className: "custom-link-class"
      });

      // Customizing the image element
      const image = this.createImageElement({
          altText: "Sponsored Ad",
          className: "sponsored-image",
          loading: "eager"
      });

      const content = this.createContentWrapper();

      link.appendChild(image);
      link.appendChild(content);
      li.appendChild(link);

      return li;
  }

  /**
   * Creates the content wrapper containing the title and branding.
   */
  private createContentWrapper(): HTMLDivElement {
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "recommendation-content";

      const title = document.createElement("p");
      title.textContent = this.recommendation.name || "Sponsored Content";
      title.className = "recommendation-title";

      const branding = document.createElement("p");
      branding.textContent = this.recommendation.branding || "Sponsored";
      branding.className = "recommendation-branding";

      contentWrapper.appendChild(title);
      contentWrapper.appendChild(branding);

      return contentWrapper;
  }
}
