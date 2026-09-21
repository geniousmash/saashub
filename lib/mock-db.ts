// Mock database for development
// This allows the app to work without PostgreSQL or Supabase setup

interface Product {
  id: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  website?: string
}

// In-memory database (persists during app runtime)
let products: Product[] = [
  {
    id: '1',
    name: 'Stripe',
    description: 'Payment processing platform for internet businesses',
    category: 'Payments',
    rating: 4.8,
    reviews: 250,
    website: 'https://stripe.com',
  },
  {
    id: '2',
    name: 'Notion',
    description: 'All-in-one workspace for notes and collaboration',
    category: 'Productivity',
    rating: 4.7,
    reviews: 320,
    website: 'https://notion.so',
  },
  {
    id: '3',
    name: 'Figma',
    description: 'Collaborative interface design tool',
    category: 'Design',
    rating: 4.9,
    reviews: 280,
    website: 'https://figma.com',
  },
  {
    id: '4',
    name: 'Slack',
    description: 'Business messaging and collaboration platform',
    category: 'Communication',
    rating: 4.6,
    reviews: 450,
    website: 'https://slack.com',
  },
  {
    id: '5',
    name: 'Linear',
    description: 'Issue tracking for modern software teams',
    category: 'Project Management',
    rating: 4.8,
    reviews: 190,
    website: 'https://linear.app',
  },
  {
    id: '6',
    name: 'Vercel',
    description: 'Frontend cloud platform for deployment',
    category: 'Developer Tools',
    rating: 4.7,
    reviews: 210,
    website: 'https://vercel.com',
  },
]

let nextId = 7

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
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
