# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo template for open-source projects using pnpm workspaces with two main applications:

- **apps/api**: NestJS + Fastify API server with TypeScript (runs on port 4000)
- **apps/web**: Next.js 15 + React 19 frontend with Turbopack

## Development Commands

### Getting Started

```bash
pnpm install
pnpm dev  # Starts both API and web concurrently
```

### Common Tasks

```bash
# Development
pnpm dev                    # Run both API and web apps concurrently
pnpm -F ./apps/api dev      # Run only API (port 4000)
pnpm -F ./apps/web dev      # Run only web frontend

# Building
pnpm -F ./apps/api build    # Build API to dist/
pnpm -F ./apps/web build    # Build web app

# Testing
pnpm test                   # Run all tests with Vitest
pnpm test:watch            # Run tests in watch mode
pnpm -F ./apps/api test    # Run API tests only

# Code Quality
pnpm lint                  # Lint all files with ESLint
pnpm format                # Check formatting with Prettier
pnpm format:write          # Fix formatting issues
pnpm typecheck             # TypeScript type checking across all apps
```

## Architecture

### API (NestJS + Fastify)

- **Entry point**: `apps/api/src/main.ts` - Fastify adapter with security middleware
- **Module structure**: Uses NestJS modules with global configuration
- **Configuration**: Environment validation with Zod via `apps/api/src/config/env.ts`
- **API documentation**: Swagger available at `/api/docs` when running
- **Global prefix**: All API routes prefixed with `/api`

### Web (Next.js 15)

- **App Router**: Uses Next.js 15 app directory structure
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono fonts
- **Build optimization**: Uses Turbopack for faster builds and development

### Shared Configuration

- **TypeScript**: Strict mode enabled with ES2022 target
- **ESLint**: Flat config with TypeScript rules, Prettier integration
- **Vitest**: Node environment for testing with HTML coverage reports
- **Git hooks**: Husky with lint-staged for pre-commit formatting/linting

## Package Management

Uses pnpm with workspace configuration. Each app has its own package.json with specific dependencies:

- API uses NestJS ecosystem with Fastify
- Web uses Next.js with React 19
- Root manages shared dev dependencies and quality tools

## Environment Variables

API supports environment file hierarchy:

1. `.env.${NODE_ENV}.local`
2. `.env.${NODE_ENV}`
3. `.env.local`
4. `.env`

Environment variables are validated at startup using Zod schemas.

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
NEVER USE MOCK DATA - Always connect to real database/API. No hardcoded arrays or fake data.
