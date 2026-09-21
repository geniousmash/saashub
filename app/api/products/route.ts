import { getAllProducts, createProduct } from '@/lib/mock-db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, category, website } = body

    if (!name || !description || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const product = createProduct({
      name,
      description,
      category,
      website: website || undefined,
      rating: 0,
      reviews: 0,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

