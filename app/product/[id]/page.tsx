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
  features?: string[]
  pricing?: string
  founded?: number
}

export async function generateStaticParams() {
  return productsData.map((product: Product) => ({
    id: product.id,
  }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = productsData.find((p: Product) => p.id === params.id)
  return {
    title: product ? `${product.name} - SaaSHub` : 'Product Not Found',
    description: product?.description || 'Discover SaaS products on SaaSHub',
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productsData.find((p: Product) => p.id === params.id)
  const relatedProducts = productsData
    .filter((p: Product) => p.category === product?.category && p.id !== params.id)
    .slice(0, 3)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold text-blue-600">
              SaaSHub
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
              ← Back
            </Link>
          </nav>
        </header>
        <div className="text-center py-12">
          <p className="text-lg">Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            SaaSHub
          </Link>
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            ← Back
          </Link>
        </nav>
      </header>

      <section className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start gap-8 flex-col md:flex-row">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex gap-2 flex-wrap mb-6">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.pricing && (
                  <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                    {product.pricing}
                  </span>
                )}
                {product.founded && (
                  <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium">
                    Founded {product.founded}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-700 max-w-2xl">{product.description}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md min-w-48 text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">⭐</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{product.rating}</div>
              <div className="text-gray-600 text-sm">Based on {product.reviews.toLocaleString()} reviews</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {product.website && (
          <div className="mb-12">
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Visit {product.name} →
            </a>
          </div>
        )}

        {product.features && product.features.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                  <div className="text-blue-600 text-xl">✓</div>
                  <p className="font-semibold text-gray-900">{feature}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-gray-600 text-sm mb-2">Category</div>
              <div className="text-2xl font-semibold">{product.category}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-gray-600 text-sm mb-2">Pricing</div>
              <div className="text-2xl font-semibold">{product.pricing || "N/A"}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-gray-600 text-sm mb-2">Founded</div>
              <div className="text-2xl font-semibold">{product.founded || "N/A"}</div>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose {product.name}?</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Highly rated by {product.reviews.toLocaleString()}+ users worldwide</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>{product.pricing} pricing - transparent and scalable</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Trusted solution in {product.category}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Industry-leading features</span>
            </li>
          </ul>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Similar Products in {product.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/product/${related.id}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">{related.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{related.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-500 font-semibold">⭐ {related.rating}</span>
                      <span className="text-xs text-gray-500">{related.reviews} reviews</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-sm">
            <p>&copy; 2026 SaaSHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
