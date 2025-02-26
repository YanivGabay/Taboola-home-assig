/**
 * Tests for SponsoredRecommendationItem component
 * 
 * Tests cover:
 * - Basic rendering of elements (image, title, branding)
 * - Fallback behavior for missing branding
 * - Image error handling with fallback image
 */
import { SponsoredRecommendationItem } from '../src/components/SponsoredRecommendationItem';
import { TaboolaRecommendation } from '../src/api/types';


const imageUrl = 'https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/01/url-shortener.jpg'

describe('SponsoredRecommendationItem', () => {
    const mockRecommendation: TaboolaRecommendation = {
        type: 'video',
        name: 'Test Title',
        branding: 'Test Brand',
        thumbnail: [{ url: imageUrl }],
        url: 'https://test-url.com',
        origin: 'sponsored',
        created: new Date().toISOString(),
        id: '123'
    };
    
    test('should create a valid recommendation item', () => {
        const item = new SponsoredRecommendationItem(mockRecommendation);
        const element = item.render();

        expect(element.tagName).toBe('LI');
        expect(element.querySelector('img')?.src).toBe(mockRecommendation.thumbnail[0].url);
        expect(element.querySelector('.recommendation-title')?.textContent).toBe(mockRecommendation.name);
        expect(element.querySelector('.recommendation-branding')?.textContent).toBe(mockRecommendation.branding);
    });

    test('should handle missing branding', () => {
        const noBrandingItem = new SponsoredRecommendationItem({
            ...mockRecommendation,
            branding: undefined
        });
        const element = noBrandingItem.render();
        
        expect(element.querySelector('.recommendation-branding')?.textContent).toBe('Sponsored');
    });

    test('should handle image load error', () => {
        const item = new SponsoredRecommendationItem(mockRecommendation);
        const element = item.render();
        const image = element.querySelector('img');

        image?.dispatchEvent(new Event('error'));
        expect(image?.src).toContain('encrypted-tbn0.gstatic.com'); // Fallback image url
    });
}); 