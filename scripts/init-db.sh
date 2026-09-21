#!/bin/bash

# Database initialization script for SaaSHub
# This script creates the necessary tables and seed data

PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME << EOF

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
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
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- Seed sample data
INSERT INTO products (name, description, category, website, rating, reviews) VALUES
('Stripe', 'Payment processing platform for internet businesses', 'Payments', 'https://stripe.com', 4.8, 250),
('Notion', 'All-in-one workspace for notes and collaboration', 'Productivity', 'https://notion.so', 4.7, 320),
('Figma', 'Collaborative interface design tool', 'Design', 'https://figma.com', 4.9, 280),
('Slack', 'Business messaging and collaboration platform', 'Communication', 'https://slack.com', 4.6, 450),
('Linear', 'Issue tracking for modern software teams', 'Project Management', 'https://linear.app', 4.8, 190),
('Vercel', 'Frontend cloud platform for deployment', 'Developer Tools', 'https://vercel.com', 4.7, 210)
ON CONFLICT DO NOTHING;

EOF

echo "Database initialized successfully!"
