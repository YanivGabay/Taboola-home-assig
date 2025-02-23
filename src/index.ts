// src/index.ts

import { RecommendationWidget } from "./components/RecommendationWidget";

// Wait for the DOM to load before initializing the widget.
document.addEventListener("DOMContentLoaded", () => {
  const widget = new RecommendationWidget("recommendation-widget");
  widget.init();
});
