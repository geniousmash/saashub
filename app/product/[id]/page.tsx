'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  website?: string
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`)
      if (!res.ok) throw new Error('Product not found')
      const data = await res.json()
      setProduct(data)
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!product) return <div className="text-center py-12">Product not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">SaaSHub</Link>
          <Link href="/" className="text-gray-600 hover:text-blue-600">Back</Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <p className="text-lg text-gray-600 mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-yellow-500">⭐ {product.rating}</div>
              <div className="text-gray-600">{product.reviews} reviews</div>
            </div>
            {product.website && (
              <div>
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <p className="text-gray-600">Review functionality coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}
