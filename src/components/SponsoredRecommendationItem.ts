// src/components/SponsoredRecommendationItem.ts
import { TaboolaRecommendation } from "../api/types.js";
import { IRecommendationItem } from "./IRecommendationItem.js";

/**
 * Renders a sponsored recommendation item (image + link + title).
 * Also demonstrates a fallback placeholder if asset fails to load.
 */
export class SponsoredRecommendationItem implements IRecommendationItem{
  private recommendation: TaboolaRecommendation;
  private readonly FALLBACK_PLACEHOLDER = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"; // or your own placeholder URL

  constructor(recommendation: TaboolaRecommendation) {
    this.recommendation = recommendation;
  }

  public render(): HTMLElement {
    const li = document.createElement("li");
    li.className = "recommendation-item";

    const a = document.createElement("a");
    a.href = this.recommendation.url;
    a.target = "_blank"; // open in a new tab
    a.style.textDecoration = "none"; // no text decoration
    a.style.display = "flex"; // flexbox
    a.style.flexDirection = "column"; // column layout
    a.style.height = "100%"; // full height

    // Image section
    const img = document.createElement("img");
    let imgUrl = this.recommendation.thumbnail[0].url;
    if (!imgUrl.startsWith("https://")) {
        imgUrl = imgUrl.replace("http://", "https://");
    }
    img.src = imgUrl;
    img.alt = this.recommendation.name || "Sponsored Content";
    img.className = "recommendation-image";
    img.loading = "lazy"; // lazy loading means that the image is not loaded until it is visible in the viewport
    img.referrerPolicy = "no-referrer"; // no referrer policy means that the image is not sent to the referrer

    img.onerror = () => {
        console.log("Failed to load image:", imgUrl);
        img.src = this.FALLBACK_PLACEHOLDER;
    };

    // Create a content wrapper
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "recommendation-content";

    // Title section
    const title = document.createElement("p");
    title.textContent = this.recommendation.name || "Sponsored Content";
    title.className = "recommendation-title";

    // Branding section
    const branding = document.createElement("p");
    branding.textContent = this.recommendation.branding || "Sponsored";
    branding.className = "recommendation-branding";

    // Append in correct order
    contentWrapper.appendChild(title);
    contentWrapper.appendChild(branding);

    a.appendChild(img);
    a.appendChild(contentWrapper);
    li.appendChild(a);

    return li;
  }
}
