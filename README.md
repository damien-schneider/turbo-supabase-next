# Turborepo, NextJS, Supabase, Tailwind Boilerplate

A modern full-stack monorepo boilerplate with NextJS, Supabase, TailwindCSS, and shadcn/ui components, using Turborepo for efficient build processes.

## Features

- 🏎️ **Turborepo** - High-performance build system for JavaScript and TypeScript
- ⚡ **Next.js** - React framework for production-grade applications
- 🔐 **Supabase** - Open source Firebase alternative with authentication and database
- 💅 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
- 📦 **PNPM** - Fast, disk space efficient package manager
- 🔍 **TypeScript** - Static type checking
- 🔗 **tRPC** - End-to-end typesafe APIs
- 📊 **TanStack Query** - Powerful asynchronous state management
- 🌗 **Theme Switcher** - Dark and light mode support
- 🛠️ **Biome** - Fast linter, formatter, and more
- 📦 **Just** - Fast, simple, and reliable task runner

## Prerequisites

- Node.js >= 20
- PNPM >= 9.12.3

## Getting Started

### Installation

1. Clone this repository:

```bash
git clone https://github.com/damien-schneider/turbo-supabase-next.git
cd turbo-supabase-next
```

2. Install dependencies:

```bash
pnpm install
```

### Environment Setup

1. Create a Supabase project at [https://supabase.com](https://supabase.com)

2. Create environment files:

```bash
# In apps/web directory
cp .env.example .env.local
```

3. Fill in your Supabase credentials in the `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Run the development server:

```bash
pnpm dev
```

This will start all applications in the monorepo in development mode. The main web app will be available at [http://localhost:3000](http://localhost:3000).

### Build

To build all applications and packages:

```bash
pnpm build
```

### Lint

To lint all applications and packages:

```bash
pnpm lint
```

To check types:

```bash
pnpm check-types
```

For Biome linting:

```bash
pnpm biome-check
```

## Project Structure

```
turbo-supabase-next/
├── apps/
│   └── web/                # Next.js web application
│       ├── app/            # App router pages
│       ├── components/     # Application-specific components
│       ├── ui/             # Web-specific UI components
│       └── public/         # Static assets
├── packages/
│   ├── eslint-config/      # ESLint configurations
│   ├── supabase/           # Supabase client and types
│   ├── typescript-config/  # TypeScript configurations
│   └── ui/                 # Shared UI components (shadcn/ui)
```

## Adding UI Components

To add shadcn/ui components to your application:

```bash
just init-shadcn-components
```

This will place the UI components in the `packages/ui/src/components` directory.

## Using Components

Import components from the UI package:

```tsx
import { Button } from "@workspace/ui/components/ui/button"
```

## Authentication Flow

This boilerplate includes a complete authentication flow with sign-in, sign-up, password reset, and session management using Supabase Auth.

## Theming

The project uses a theme system built with TailwindCSS and CSS variables. You can modify the theme in:

- Dark mode variables are defined in `apps/web/app/auth/layout.tsx`
- CSS variables are used throughout the project

## Deployment

This project can be deployed to any platform that supports Next.js applications (Vercel, Netlify, etc.).

## License

[MIT](LICENSE)