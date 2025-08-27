# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload (client + server on port 3000)
- `npm run build` - Build production bundle (client build + server bundle)
- `npm run start` - Start production server (port 3000)
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes using Drizzle

## Architecture

This is a full-stack React + Express application with the following structure:

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI**: Shadcn/ui components with Tailwind CSS
- **State Management**: React Query (@tanstack/react-query) for server state
- **Build Tool**: Vite
- **Internationalization**: Bilingual (Hebrew/English) support with language context

### Backend (`server/`)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with passport authentication
- **API**: RESTful endpoints under `/api`

### Shared (`shared/`)
- **Schema**: Drizzle database schema and Zod validation schemas
- **Types**: Shared TypeScript types between client and server

### Database Schema
Key tables:
- `users` - User authentication
- `products` - Product catalog (bilingual: `name_he/en`, `description_he/en`)
- `articles` - Blog/article content (bilingual)
- `contact_submissions` - Contact form submissions
- `cart_items` - Shopping cart (session-based)

### Key Features
- Bilingual e-commerce site (Hebrew/English)
- Product catalog with shopping cart
- Article/blog system
- Contact form
- WhatsApp integration
- Formula builder component

## Path Aliases
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## Development Notes
- The app runs in development mode with Vite dev server
- Database requires `DATABASE_URL` environment variable
- Client and server are served from single Express instance
- Uses PostgreSQL with UUID primary keys
- Session-based cart (no user authentication required for shopping)