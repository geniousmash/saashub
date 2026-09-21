// Mock database for development - loads from products.json
import productsData from './products.json'

export interface Product {
  id: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  website?: string
  features?: string[]
  pricing?: string
  founded?: number
}

// In-memory database (persists during app runtime)
let products: Product[] = productsData as Product[]
let nextId = Math.max(...products.map(p => parseInt(p.id))) + 1

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.features?.some(f => f.toLowerCase().includes(lowerQuery))
  )
}

export function createProduct(product: Omit<Product, 'id'>): Product {
  const newProduct: Product = {
    ...product,
    id: String(nextId++),
  }
  products.push(newProduct)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return undefined

  products[index] = { ...products[index], ...updates }
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return false

  products.splice(index, 1)
  return true
}

export function getCategories(): string[] {
  return [...new Set(products.map(p => p.category))].sort()
}

export function getStats() {
  return {
    totalProducts: products.length,
    totalCategories: getCategories().length,
    averageRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1),
    totalReviews: products.reduce((sum, p) => sum + p.reviews, 0),
  }
}

export function getTopRatedProducts(limit: number = 10): Product[] {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function getMostReviewedProducts(limit: number = 10): Product[] {
  return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit)
}
