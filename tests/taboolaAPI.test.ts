/**
 * Test suite for the fetchRecommendations function from the Taboola API module.
 *
 * This suite uses Jest to simulate different fetch responses.
 * We replace the global fetch with a Jest mock to avoid making real HTTP requests.
 */

import { fetchRecommendations } from "../src/api/taboolaAPI";

describe("fetchRecommendations", () => {
  // Set up the global fetch mock before each test.
  beforeEach(() => {
    // @ts-ignore: Suppress TS error when reassigning global.fetch.
    global.fetch = jest.fn();
  });

  // Reset mocks after each test to avoid interference.
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test case: Successful response scenario.
  it("should fetch recommendations and return JSON data when response is ok", async () => {
    // Create a fake JSON response that follows the expected TaboolaResponse structure.
    const fakeResponse = {
      id: "testId",
      list: [],
    };

    // Mock fetch to simulate a successful HTTP response.
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      // The json method returns a promise that resolves to fakeResponse.
      json: async () => fakeResponse,
    });

    // Call the fetchRecommendations function and await its result.
    const result = await fetchRecommendations("demoSource");

    // Assert that the result matches our fakeResponse.
    expect(result).toEqual(fakeResponse);

    // Verify that the constructed URL contains the required query parameters.
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("app.type=desktop")
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4")
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("source.id=demoSource")
    );
  });

  // Additional realistic test: Verify that a realistic recommendation list has the expected structure.
  it("should return a realistic recommendation list", async () => {
    // Create a fake realistic response with two recommendation items.
    const mockResponse = {
      id: "123456",
      list: [
        {
          type: "video",
          name: "Sample Article",
          created: "2024-03-20",
          // Updated thumbnail to match expected structure: an object with a url property.
          thumbnail: [{ url: "https://example.com/thumb.jpg" }],
          id: "item123",
          origin: "sponsored",
          url: "https://example.com/article",
        },
        {
          type: "video",
          name: "Another Sample Article",
          created: "2024-03-21",
          thumbnail: [{ url: "https://example.com/thumb2.jpg", width: "500", height: "300" }],
          id: "item456",
          origin: "sponsored",
          url: "https://example.com/article2",
        },
      ],
    };

    // Mock fetch to resolve with this realistic response.
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchRecommendations("demoSource");

    // Basic runtime checks for the top-level structure.
    expect(typeof result.id).toBe("string");
    expect(Array.isArray(result.list)).toBe(true);
    expect(result.list.length).toBe(2);

    // Iterate through each recommendation and perform basic type checks.
    result.list.forEach((item) => {
      expect(typeof item.type).toBe("string");
      expect(typeof item.name).toBe("string");
      expect(typeof item.created).toBe("string");
      expect(Array.isArray(item.thumbnail)).toBe(true);
      // Check that each thumbnail is an object with a url property.
      item.thumbnail.forEach((thumb) => {
        expect(typeof thumb.url).toBe("string");
      });
      expect(typeof item.id).toBe("string");
      expect(typeof item.origin).toBe("string");
      expect(typeof item.url).toBe("string");
    });
  });

  // Test case: Error scenario when the HTTP response is not ok.
  it("should throw an error when the response is not ok", async () => {
    // Mock fetch to simulate a failing HTTP response.
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    // Assert that the fetchRecommendations function rejects with an error.
    await expect(fetchRecommendations("demoSource")).rejects.toThrow(
      "Network response was not ok"
    );
  });
});
