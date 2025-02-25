//types section
//will represent a single recommendation item
export interface TaboolaRecommendation {
   
    description?: string; // optional because not every item has it
    type: string; // the type of the recommendation
    name: string;
    created: string;
    branding?: string; // optional if not always present
    duration?: string; // optional
    views?: string;    // optional
    thumbnail: Array<{ url: string; width?: string; height?: string }>;
    categories?: string[];
    id: string;
    origin: string;
    url: string;
  }

//the actual response from the API
export interface TaboolaResponse {
    id: string;
    list: TaboolaRecommendation[];//an array of recommendations
  }
