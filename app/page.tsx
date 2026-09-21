'use client'

import { useState } from 'react'
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

// Calculate at build time
const categories = [...new Set(productsData.map((p: Product) => p.category))].sort() as string[]
const avgRating = (productsData.reduce((sum: number, p: Product) => sum + p.rating, 0) / productsData.length).toFixed(1)

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const topProducts = productsData.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">SaaS</span><span className="text-gray-900">Hub</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#browse" className="text-gray-600 hover:text-blue-600 font-medium">Browse</a>
            <Link href="/submit" className="text-gray-600 hover:text-blue-600 font-medium">Submit</Link>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Compare</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
            <Link href="/submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
              Submit
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Software Alternatives & Startups
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            Find, compare, and review the best SaaS products
          </p>
          <p className="text-blue-100 mb-8">
            Community & experts driven • Independent since 2014
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#browse" className="inline-block bg-white text-blue-600 px-8 py-3 rounded font-semibold hover:bg-gray-50">
              Browse Products
            </a>
            <Link href="/submit" className="inline-block bg-blue-500 text-white px-8 py-3 rounded font-semibold hover:bg-blue-400">
              Submit Product
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">{productsData.length}</div>
              <div className="text-gray-600 font-medium">SaaS Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">{categories.length}</div>
              <div className="text-gray-600 font-medium">Categories</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">{avgRating}</div>
              <div className="text-gray-600 font-medium">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{product.name}</h3>
                    <span className="text-yellow-500 font-bold ml-2">⭐ {product.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500">{product.reviews} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:bg-blue-50 hover:border-blue-300 transition font-medium text-sm text-gray-900"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Section */}
      <section id="browse" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">All Products</h2>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded font-medium transition ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              All
            </button>
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded font-medium transition text-sm ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="mb-6 text-gray-600 text-sm">
            Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{productsData.length}</span> products
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition cursor-pointer h-full flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{product.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium">
                      {product.category}
                    </span>
                    <div className="text-right">
                      <div className="text-yellow-500 font-bold">⭐ {product.rating}</div>
                      <div className="text-xs text-gray-500">{product.reviews}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found. Try different search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/submit" className="hover:text-white">Submit</Link></li>
                <li><a href="#" className="hover:text-white">Compare</a></li>
                <li><a href="#" className="hover:text-white">Alternatives</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Forum</a></li>
                <li><a href="#" className="hover:text-white">Experts</a></li>
                <li><a href="#" className="hover:text-white">Startups</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 SaaSHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
