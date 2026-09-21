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
    const cats = [...new Set(productsData.map((p: Product) => p.category))].sort()
    setCategories(cats as string[])
    
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

  const featuredProducts = productsData.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">SaaS</span>Hub
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="#browse" className="text-gray-600 hover:text-blue-600 font-medium">Browse</Link>
              <Link href="/submit" className="text-gray-600 hover:text-blue-600 font-medium">Submit</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium">Experts</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium">Compare</Link>
            </nav>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
              <Link href="/submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Software Alternatives & Startups</h1>
          <p className="text-xl text-blue-100 mb-8">Find, compare, and review the best SaaS products for your business</p>
          <p className="text-blue-100 mb-8">Community & experts driven • Independent since 2014</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#browse" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
              Browse Categories
            </Link>
            <Link href="/submit" className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-400 font-semibold">
              Submit Product
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{stats.totalProducts}+</div>
              <div className="text-gray-600 mt-2 font-medium">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{stats.totalReviews.toLocaleString()}</div>
              <div className="text-gray-600 mt-2 font-medium">Community Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{stats.averageRating}</div>
              <div className="text-gray-600 mt-2 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chrome Extension & Features */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-lg font-semibold mb-2">Chrome Extension</h3>
              <p className="text-gray-600 text-sm mb-4">Find product alternatives with one click</p>
              <Link href="#" className="text-blue-600 hover:underline font-medium text-sm">Install →</Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold mb-2">Become an Expert</h3>
              <p className="text-gray-600 text-sm mb-4">Promote your product & earn rewards</p>
              <Link href="#" className="text-blue-600 hover:underline font-medium text-sm">Learn more →</Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Startups Directory</h3>
              <p className="text-gray-600 text-sm mb-4">List your startup and get visibility</p>
              <Link href="#" className="text-blue-600 hover:underline font-medium text-sm">Submit →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition border border-gray-200 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1">{product.name}</h3>
                    <span className="text-yellow-500 font-bold">⭐ {product.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
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

      {/* Top Categories */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-600 hover:shadow-md transition text-center cursor-pointer"
              >
                <div className="text-gray-900 font-medium text-sm">{cat}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experts Tournament Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">SaaSHub Experts Tournament</h2>
          <p className="text-lg mb-8 text-purple-100">The ongoing tournament that rewards the best products</p>
          <div className="flex justify-center gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold">99</div>
              <div className="text-purple-100 text-sm">Hours</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99</div>
              <div className="text-purple-100 text-sm">Minutes</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99</div>
              <div className="text-purple-100 text-sm">Seconds</div>
            </div>
          </div>
          <Link href="#" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
            Join Us & Compete
          </Link>
        </div>
      </section>

      {/* Browse Section */}
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

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg border transition font-medium text-sm ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="mb-6 text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold">{productsData.length}</span> products
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-400 transition cursor-pointer h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
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
            <p className="text-gray-600 text-lg">No products found. Try adjusting your search or filters.</p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to get the latest SaaS products and updates</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Contacts</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="/submit" className="hover:text-white">Submit Product</Link></li>
                <li><Link href="#" className="hover:text-white">Compare</Link></li>
                <li><Link href="#" className="hover:text-white">Chrome Extension</Link></li>
                <li><Link href="#" className="hover:text-white">Alternatives</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="#" className="hover:text-white">Experts</Link></li>
                <li><Link href="#" className="hover:text-white">Startups</Link></li>
                <li><Link href="#" className="hover:text-white">News</Link></li>
                <li><Link href="#" className="hover:text-white">Discuss</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                <li><Link href="#" className="hover:text-white">Sitemap</Link></li>
                <li><Link href="#" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p className="mb-2">
              <strong>SaaSHub</strong> - Independent software marketplace since 2026
            </p>
            <p className="text-gray-500">
              © 2026 SaaSHub. All rights reserved. | Helping software professionals find the right tools.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
