# --- Base commune ---
    FROM node:20-alpine AS base
    WORKDIR /workspace
    ENV PNPM_HOME="/root/.local/share/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable
    
    # --- Dépendances pour builder (avec dev deps) ---
    FROM base AS builder-deps
    # Désactive Husky dans Docker
    ENV HUSKY=0
    # Copie fichiers du monorepo nécessaires à l'install
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
    # Copie les manifests de l'app API
    COPY apps/api/package.json apps/api/tsconfig.json apps/api/tsconfig.build.json ./apps/api/
    # Installe seulement ce qui est nécessaire pour l'app API
    RUN pnpm -r --filter ./apps/api... install --frozen-lockfile
    
    # --- Build ---
    FROM builder-deps AS build
    # Copie le code source de l'API
    COPY apps/api ./apps/api
    # Build (génère apps/api/dist)
    RUN pnpm -F ./apps/api build
    
    # --- Dépendances prod minimalistes ---
    FROM base AS prod-deps
    # Désactive Husky dans Docker
    ENV HUSKY=0
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
    COPY apps/api/package.json ./apps/api/
    RUN pnpm -r --filter ./apps/api... install --frozen-lockfile --prod
    
    # --- Runner ---
    FROM node:20-alpine AS runner
    ENV NODE_ENV=production
    # Copie TOUT l'environnement de build - approche simple mais efficace
    COPY --from=build /workspace /workspace
    WORKDIR /workspace/apps/api
    # Port interne Nest
    ENV PORT=4000
    EXPOSE 4000
    CMD ["node", "dist/main.js"]
    