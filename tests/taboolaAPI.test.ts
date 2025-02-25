/**
 * Test suite for the fetchRecommendations function from the Taboola API module.
 *
 * This suite uses Jest to simulate different fetch responses.
 * We replace the global fetch with a Jest mock to avoid making real HTTP requests.
 */

import { fetchRecommendations } from "../src/api/taboolaAPI";
import { TaboolaResponse } from '../src/api/types';

// Mock fetch globally
global.fetch = jest.fn();

describe("fetchRecommendations", () => {
  beforeEach(() => {
    // Clear mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  // Test case: Successful response scenario.
  it("should fetch recommendations and return JSON data when response is ok", async () => {
    const mockResponse: TaboolaResponse = {
      id: 'test-id',
      list: [{
        type: 'video',
        name: 'Test Article',
        branding: 'Test Brand',
        thumbnail: [{ url: 'https://test-image.jpg' }],
        url: 'https://test.com',
        origin: 'sponsored',
        created: '2024-03-20',
        id: '123'
      }]
    };

    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    const result = await fetchRecommendations('testSource');
    expect(result).toEqual(mockResponse);
  });

  // Test case: Error scenario when all retries fail.
  // we do 3 retries, cus we can receive a empty response from the API
  it("should throw an error when all retries fail", async () => {
    // Mock failed response for all three attempts
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: false });

    await expect(fetchRecommendations('testSource')).rejects.toThrow('Network response was not ok');
  });
});
