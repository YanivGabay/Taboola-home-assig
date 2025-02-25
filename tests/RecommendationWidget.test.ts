/**
 * Tests for RecommendationWidget
 * 
 * Tests cover:
 * - Widget initialization
 * - Loading state
 * - Recommendations rendering
 * 
 * Test Setup:
 * - jest.mock('../src/api/taboolaAPI') replaces the real API call with a mock function
 *   This allows us to control the API response without making real network requests
 * 
 * Widget Constructor:
 * - containerId: The ID of the container element where widget will be rendered
 * - widgetType: Type of recommendations to display (e.g., 'sponsored')
 */
import { RecommendationWidget } from '../src/components/RecommendationWidget';
import { TaboolaRecommendation, TaboolaResponse } from '../src/api/types';
import { fetchRecommendations } from '../src/api/taboolaAPI';

// Mock the API to avoid real network calls
jest.mock('../src/api/taboolaAPI');
const mockedFetch = fetchRecommendations as jest.MockedFunction<typeof fetchRecommendations>;

const mockRecommendations: TaboolaRecommendation[] = [
    {
        type: 'video',
        name: 'Test Title 1',
        branding: 'Test Brand',
        thumbnail: [{ url: 'https://test-image.jpg' }],
        url: 'https://test-url.com',
        origin: 'sponsored',
        created: new Date().toISOString(),
        id: '123'
    }
];

const mockResponse: TaboolaResponse = {
    id: 'test-response-id',
    list: mockRecommendations
};

describe('RecommendationWidget', () => {
    let container: HTMLElement;
    const containerId = 'recommendation-widget';

    beforeEach(() => {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
        mockedFetch.mockResolvedValue(mockResponse);
    });

    afterEach(() => {
        document.body.removeChild(container);
        jest.clearAllMocks();
    });

    test('should show loading state initially', () => {
        const widget = new RecommendationWidget(containerId, 'sponsored');
        widget.init();
        
        const loading = document.querySelector('.taboola-loading');
        expect(loading).toBeTruthy();
        expect(loading?.textContent).toContain('Loading');
    });

    test('should render recommendations after loading', async () => {
        const widget = new RecommendationWidget(containerId, 'sponsored');
        await widget.init();
        
        const items = document.querySelectorAll('.recommendation-item');
        expect(items.length).toBe(mockRecommendations.length);
    });
}); 