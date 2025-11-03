# Lupl Backend

Lupl Art Agency Backend built with Express.js and Prisma ORM.

## Features

- Artist Management
- Portfolio Management (Works, Exhibitions, etc.)
- Product/Art Shop Management
- Order Management
- Reviews & Ratings
- Announcements & Press Coverage
- Partner Management
- Contact Form
- Admin Dashboard

## Tech Stack

- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Zod

## Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials and JWT secret.

4. Run Prisma migrations:
```bash
npm run prisma:migrate
```

5. Generate Prisma Client:
```bash
npm run prisma:generate
```

6. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5001`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/:id` - Get artist by ID
- `POST /api/artists` - Create artist (Admin)
- `PUT /api/artists/:id` - Update artist (Admin)
- `DELETE /api/artists/:id` - Delete artist (Admin)

### Portfolio
- `GET /api/portfolio/categories` - Get all portfolio categories
- `GET /api/portfolio/categories/:categoryId` - Get category items
- `GET /api/portfolio/items` - Get all portfolio items
- `GET /api/portfolio/items/:id` - Get item by ID
- `POST /api/portfolio/categories` - Create category
- `POST /api/portfolio/items` - Create portfolio item
- `PUT /api/portfolio/items/:id` - Update item
- `DELETE /api/portfolio/items/:id` - Delete item

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/cancel` - Cancel order

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review (Authenticated)
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Contact
- `GET /api/contact` - Get all contact messages (Admin)
- `GET /api/contact/:id` - Get contact message by ID
- `POST /api/contact` - Submit contact form
- `PUT /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact message

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/analytics` - Get analytics

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

## Portfolio Categories

- **사생대회** (Drawing Contest)
- **미디어아트** (Media Art)
- **전시** (Exhibitions)
- **인클루시브 패션** (Inclusive Fashion)
- **점자메뉴판** (Braille Menu)

## Environment Variables

```
PORT=5001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/lupl_db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## License

Copyright © 2024 Lupl. All rights reserved.

