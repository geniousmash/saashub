import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, description, category, rating, reviews, website
      FROM products
      ORDER BY rating DESC
      LIMIT 100
    `
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

    const result = await sql`
      INSERT INTO products (name, description, category, website, rating, reviews)
      VALUES (${name}, ${description}, ${category}, ${website || null}, 0, 0)
      RETURNING id, name, description, category, rating, reviews, website
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
