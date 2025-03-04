// src/components/IRecommendationItem.ts
export interface IRecommendationItem {
  render(): HTMLElement;
  
}
// an interface for the recommendation items
// this way, if we want to create a new widget, we can just add a new type and a new class
// and the factory will handle the rest
