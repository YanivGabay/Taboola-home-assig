/**
 * Tests for RecommendationItemFactory
 * 
 * Tests cover:
 * - Factory creates correct item type - abit redundant but future testing can be done here
 */
import { RecommendationItemFactory } from '../src/components/RecommendationItemFactory';
import { SponsoredRecommendationItem } from '../src/components/SponsoredRecommendationItem';
import { TaboolaRecommendation } from '../src/api/types';

describe('RecommendationItemFactory', () => {
    const mockRecommendation: TaboolaRecommendation = {
        type: 'video',
        name: 'Test Title',
        branding: 'Test Brand',
        thumbnail: [{ url: 'https://test-image.jpg' }],
        url: 'https://test-url.com',
        origin: 'sponsored',
        created: new Date().toISOString(),
        id: '123'
    };

    test('should create sponsored recommendation item', () => {
        const item = RecommendationItemFactory.create('sponsored', mockRecommendation);
        expect(item).toBeInstanceOf(SponsoredRecommendationItem);
    });

  
}); 