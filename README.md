# SaaSHub - SaaS Directory Platform

A modern SaaS product discovery platform built with Next.js and PostgreSQL. Browse, discover, and submit software-as-a-service products across multiple categories.

## Features

- 🔍 **Advanced Search & Filter** - Search products by name and filter by category
- 📝 **Product Submission** - Submit new SaaS products to the directory
- ⭐ **Ratings & Reviews** - Community-driven ratings and reviews
- 🏷️ **Categorized Browsing** - Explore products by category
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Fast Performance** - Built with Next.js for optimal performance

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/saashub.git
cd saashub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your database credentials:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/saashub
DB_HOST=localhost
DB_PORT=5432
DB_NAME=saashub
DB_USER=postgres
DB_PASSWORD=password
```

5. Initialize the database:
```bash
npm run db:init
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

### Products Table
```sql
CREATE TABLE products (
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
```

### Users Table (Coming Soon)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Reviews Table (Coming Soon)
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  user_id INT REFERENCES users(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
saashub/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── login/
│   │   └── page.tsx
│   ├── product/
│   │   └── [id]/page.tsx
│   ├── submit/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   └── db.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get a specific product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

## Usage Examples

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Create a new product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slack",
    "description": "Business messaging platform",
    "category": "Communication",
    "website": "https://slack.com"
  }'
```

## Roadmap

- [x] Basic product listing
- [x] Search and filter
- [x] Product submission form
- [ ] User authentication
- [ ] Reviews and ratings system
- [ ] Expert reviewer system
- [ ] Product comparisons
- [ ] Advanced analytics dashboard
- [ ] Chrome extension
- [ ] Mobile app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@saashub.com or open an issue on GitHub.

## Changelog

### Version 1.0.0
- Initial release
- Basic product listing and search
- Product submission form
- Responsive design
