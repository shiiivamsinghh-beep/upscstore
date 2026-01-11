export interface Product {
    id: string;
    title: string;
    description: string;
    institute: string; // e.g., "Vision IAS", "Vajiram"
    price: number;
    originalPrice: number;
    category: 'gs' | 'optional' | 'test-series' | 'current-affairs' | 'books';
    image: string;
    rating: number;
    reviews: number;
    isBestSeller?: boolean;
    isNew?: boolean;
}
