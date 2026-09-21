'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  website?: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['All', ...new Set(products.map(p => p.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SaaSHub</div>
          <div className="flex gap-6">
            <Link href="/browse" className="text-gray-600 hover:text-blue-600">Browse</Link>
            <Link href="/submit" className="text-gray-600 hover:text-blue-600">Submit</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Discover the Best SaaS Products</h1>
          <p className="text-xl text-gray-600 mb-8">Curated directory of top software tools for your business</p>
          <Link href="#browse" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Explore Directory
          </Link>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name (e.g., Slack, Figma)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
              className={`px-4 py-2 rounded-lg border transition ${
                (cat === 'All' && !selectedCategory) || selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </span>
                      <div className="text-sm text-gray-500">
                        ⭐ {product.rating} ({product.reviews} reviews)
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">No products found</div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>&copy; 2026 SaaSHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
