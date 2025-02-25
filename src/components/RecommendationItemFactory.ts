// src/components/RecommendationItemFactory.ts


// a factory class that creates recommendation items based on the widget type
// this way, if we want to create a new widget, we can just add a new type and a new class
// and the factory will handle the rest


import { TaboolaRecommendation } from "../api/types.js";
import { IRecommendationItem } from "./IRecommendationItem.js";
import { SponsoredRecommendationItem } from "./SponsoredRecommendationItem.js";
//import { VideoRecommendationItem } from "./VideoRecommendationItem.js";

export class RecommendationItemFactory {
  public static create(widgetType: string, recommendation: TaboolaRecommendation): IRecommendationItem {
    // For example, if we want a “video” widget type:
   // if (widgetType === "video") {
    //  return new VideoRecommendationItem(recommendation);
    
    // If “sponsored” or any other type you define:
    if (widgetType === "sponsored") {
      return new SponsoredRecommendationItem(recommendation);
    }
    // Fallback or default if the widgetType doesn't match anything else
    return new SponsoredRecommendationItem(recommendation);
  }
}
