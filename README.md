# Ticket System Frontend

A ticket management system frontend built with [Next.js](https://nextjs.org), React, and Tailwind CSS.

## Features

- View, create, update, and delete tickets
- Filter and sort tickets by priority, status, and creation date
- Paginated ticket list with search functionality
- Responsive UI with custom components and badges
- API integration via environment variable (`NEXT_PUBLIC_API_URL`)

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env` file and add your API URL:

   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Next.js app directory
- `src/components/` — Reusable UI components
- `src/lib/api/` — API utilities and interfaces
- `src/shared/` — Shared types and enums
- `public/` — Static assets

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Technologies

- Next.js
- React
- Tailwind CSS
- React Query
- React Form
- TypeScript
