import { TaboolaRecommendation } from "../api/types.js";
import { IRecommendationItem } from "./IRecommendationItem.js";

/**
 * Abstract base class for recommendation items.
 * Implements shared logic for rendering elements like <img> and <a>.
 */
export abstract class BaseRecommendationItem implements IRecommendationItem {
    protected recommendation: TaboolaRecommendation;
    protected readonly FALLBACK_PLACEHOLDER = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s";

    constructor(recommendation: TaboolaRecommendation) {
        this.recommendation = recommendation;
    }

    public abstract render(): HTMLElement; // Must be implemented by subclasses

    /**
     * Creates a link (<a>) element for the recommendation.
     * @param options - Optional attributes for customization.
     */
    protected createLinkElement(options: { 
        target?: string; 
        textDecoration?: string; 
        display?: string; 
        flexDirection?: string;
        height?: string;
        className?: string;
    } = {}): HTMLAnchorElement {
        const a = document.createElement("a");
        a.href = this.recommendation.url;
        a.target = options.target ?? "_blank"; // Default: open in new tab
        a.style.textDecoration = options.textDecoration ?? "none";
        a.style.display = options.display ?? "flex";
        a.style.flexDirection = options.flexDirection ?? "column";
        a.style.height = options.height ?? "100%";

        if (options.className) {
            a.className = options.className;
        }

        return a;
    }

    /**
     * Creates an image (<img>) element with a fallback if the image fails to load.
     * @param options - Optional attributes for customization.
     */
    protected createImageElement(options: { 
        altText?: string; 
        className?: string; 
        loading?: "lazy" | "eager"; 
        referrerPolicy?: ReferrerPolicy;
    } = {}): HTMLImageElement {
        const img = document.createElement("img");
        let imgUrl = this.recommendation.thumbnail[0]?.url || this.FALLBACK_PLACEHOLDER;

        if (!imgUrl.startsWith("https://")) {
            imgUrl = imgUrl.replace("http://", "https://");
        }

        img.src = imgUrl;
        img.alt = options.altText ?? this.recommendation.name ?? "Sponsored Content";
        img.className = options.className ?? "recommendation-image";
        img.loading = options.loading ?? "lazy"; // Default: lazy load
        img.referrerPolicy = options.referrerPolicy ?? "no-referrer"; // Default: prevent referrer leaks

        img.onerror = () => {
            console.log("Failed to load image:", imgUrl);
            img.src = this.FALLBACK_PLACEHOLDER;
        };

        return img;
    }
}
