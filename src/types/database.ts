export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    description: string | null
                    institute: string | null
                    price: number
                    original_price: number | null
                    category: 'gs' | 'optional' | 'test-series' | 'current-affairs' | 'books'
                    image: string | null
                    rating: number | null
                    reviews: number | null
                    is_best_seller: boolean | null
                    is_new: boolean | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    description?: string | null
                    institute?: string | null
                    price: number
                    original_price?: number | null
                    category: 'gs' | 'optional' | 'test-series' | 'current-affairs' | 'books'
                    image?: string | null
                    rating?: number | null
                    reviews?: number | null
                    is_best_seller?: boolean | null
                    is_new?: boolean | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    description?: string | null
                    institute?: string | null
                    price?: number
                    original_price?: number | null
                    category?: 'gs' | 'optional' | 'test-series' | 'current-affairs' | 'books'
                    image?: string | null
                    rating?: number | null
                    reviews?: number | null
                    is_best_seller?: boolean | null
                    is_new?: boolean | null
                }
            }
        }
    }
}
