'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import productsData from '@/lib/products.json'

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
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0, averageRating: '0', totalReviews: 0 })

  useEffect(() => {
    // Extract unique categories
    const cats = [...new Set(productsData.map((p: Product) => p.category))].sort()
    setCategories(cats as string[])
    
    // Calculate stats
    const avgRating = (productsData.reduce((sum: number, p: Product) => sum + p.rating, 0) / productsData.length).toFixed(1)
    const totalReviews = productsData.reduce((sum: number, p: Product) => sum + p.reviews, 0)
    setStats({
      totalProducts: productsData.length,
      totalCategories: cats.length,
      averageRating: avgRating,
      totalReviews: totalReviews,
    })
  }, [])

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">SaaSHub</Link>
          <div className="flex gap-6">
            <Link href="#browse" className="text-gray-600 hover:text-blue-600 font-medium">Browse</Link>
            <Link href="/submit" className="text-gray-600 hover:text-blue-600 font-medium">Submit</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Discover the Best SaaS Products</h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8">Curated directory of {stats.totalProducts} top software tools across {stats.totalCategories} categories</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#browse" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Explore Directory
            </Link>
            <Link href="/submit" className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-400 font-semibold">
              Submit Your Product
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{stats.totalProducts}+</div>
              <div className="text-gray-600 mt-2">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{stats.totalReviews.toLocaleString()}</div>
              <div className="text-gray-600 mt-2">Community Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{stats.averageRating}</div>
              <div className="text-gray-600 mt-2">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Browse All Products</h2>
        
        {/* Search Box */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or features... (e.g., 'Slack', 'Payment Processing')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-lg"
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg border transition font-medium ${
                !selectedCategory
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg border transition font-medium ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{productsData.length}</span> products
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition cursor-pointer h-full">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    <div className="text-right">
                      <div className="text-yellow-500 font-semibold">⭐ {product.rating}</div>
                      <div className="text-xs text-gray-500">{product.reviews} reviews</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your criteria</p>
            </div>
          )}
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">SaaSHub</h3>
              <p className="text-sm">Discover, compare, and review the best SaaS products for your business.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="/?category=Payments" className="hover:text-white">Payments</Link></li>
                <li><Link href="/?category=Design" className="hover:text-white">Design</Link></li>
                <li><Link href="/?category=Developer Tools" className="hover:text-white">Developer Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="/submit" className="hover:text-white">Submit Product</Link></li>
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 SaaSHub. All rights reserved. | Built with ❤️ for the SaaS community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
