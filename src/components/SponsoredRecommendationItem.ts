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
    const a = document.createElement("a");
    a.href = this.recommendation.url;
    a.target = "_blank";
    a.style.textDecoration = "none";
    a.style.display = "block";
    a.style.marginBottom = "10px";

    const img = document.createElement("img");
    // Force https if needed
    let imgUrl = this.recommendation.thumbnail[0].url;
    if (!imgUrl.startsWith("https://")) {
      imgUrl = imgUrl.replace("http://", "https://");
    }
    img.src = imgUrl;
    img.alt = this.recommendation.name;
    img.style.maxWidth = "100%";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";

    // Use the fallback placeholder if the main image fails
    img.onerror = () => {
      console.log("Failed to load image:", imgUrl);
      img.src = this.FALLBACK_PLACEHOLDER;
    };

    a.appendChild(img);

    // Render the recommendation name
    const title = document.createElement("p");
    title.textContent = this.recommendation.name;
    a.appendChild(title);

    li.appendChild(a);
    return li;
  }
}
