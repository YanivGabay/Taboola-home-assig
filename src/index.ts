// src/index.ts

import { RecommendationWidget } from "./components/RecommendationWidget.js";

console.log("Index file is being executed!");


// Wait for the DOM to load before initializing the widget.
document.addEventListener("DOMContentLoaded", () => {
  const widget = new RecommendationWidget("recommendation-widget", "sponsored");
  widget.init();
});
