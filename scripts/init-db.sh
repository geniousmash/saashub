#!/bin/bash

# SaaSHub Database Initialization Script
# This script creates the necessary tables and seed data for the SaaSHub application

set -e

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "Error: PostgreSQL is not installed or not in PATH"
    echo "Please install PostgreSQL first:"
    echo "  - macOS with Homebrew: brew install postgresql@15"
    echo "  - Visit: https://www.postgresql.org/download/"
    exit 1
fi

# Get database configuration from environment variables
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-saashub}"
DB_USER="${DB_USER:-postgres}"
DB_PASSWORD="${DB_PASSWORD:-postgres}"

echo "🔧 SaaSHub Database Initialization"
echo "=================================="
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo ""

# Export password for psql
export PGPASSWORD=$DB_PASSWORD

# Create database if it doesn't exist
echo "📦 Creating database..."
psql -h $DB_HOST -U $DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
psql -h $DB_HOST -U $DB_USER -c "CREATE DATABASE $DB_NAME"

echo "✅ Database created or already exists"
echo ""

# Create tables
echo "🏗️  Creating tables..."

psql -h $DB_HOST -U $DB_USER -d $DB_NAME << EOF

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  website VARCHAR(255),
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

EOF

echo "✅ Tables created successfully"
echo ""

# Seed sample data
echo "🌱 Seeding sample data..."

psql -h $DB_HOST -U $DB_USER -d $DB_NAME << EOF

-- Insert sample products (ignore duplicates)
INSERT INTO products (name, description, category, website, rating, reviews) VALUES
('Stripe', 'Payment processing platform for internet businesses', 'Payments', 'https://stripe.com', 4.8, 250),
('Notion', 'All-in-one workspace for notes and collaboration', 'Productivity', 'https://notion.so', 4.7, 320),
('Figma', 'Collaborative interface design tool', 'Design', 'https://figma.com', 4.9, 280),
('Slack', 'Business messaging and collaboration platform', 'Communication', 'https://slack.com', 4.6, 450),
('Linear', 'Issue tracking for modern software teams', 'Project Management', 'https://linear.app', 4.8, 190),
('Vercel', 'Frontend cloud platform for deployment', 'Developer Tools', 'https://vercel.com', 4.7, 210)
ON CONFLICT (name) DO NOTHING;

EOF

echo "✅ Sample data seeded successfully"
echo ""
echo "🎉 Database initialization complete!"
echo ""
echo "📊 Database Statistics:"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME << EOF
SELECT 'Products' as table_name, COUNT(*) as row_count FROM products
UNION ALL
SELECT 'Users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'Reviews' as table_name, COUNT(*) as row_count FROM reviews;
EOF

echo ""
echo "✅ You're all set! Your SaaSHub database is ready."
echo "   Your Next.js app is running on http://localhost:3000"

