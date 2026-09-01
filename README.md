# Pharma Distribution System

A modern pharmaceutical distribution platform built with Next.js, featuring a minimalist WebGL 3D interactive interface powered by Supabase.

## Features

- **Supabase Integration**: Real-time database and authentication
- **3D Interactive UI**: Beautiful WebGL-powered interface using Three.js and React Three Fiber
- **Modern Minimalist Design**: Smooth animations with Tailwind CSS and Framer Motion
- **Secure Authentication**: Supabase Auth with multiple provider support
- **Type-Safe**: Built with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Animations**: Framer Motion, Lenis smooth scroll

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and helpers
├── types/           # TypeScript types
└── styles/          # Global styles
```

## License

MIT
