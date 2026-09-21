import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await sql`
      SELECT id, name, description, category, rating, reviews, website
      FROM products
      WHERE id = ${params.id}
    `
    if (product.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, category, website } = body

    const result = await sql`
      UPDATE products
      SET name = ${name}, description = ${description}, category = ${category}, website = ${website}
      WHERE id = ${params.id}
      RETURNING id, name, description, category, rating, reviews, website
    `
    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await sql`DELETE FROM products WHERE id = ${params.id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
