# --- Base commune ---
    FROM node:20-alpine AS base
    WORKDIR /workspace
    ENV PNPM_HOME="/root/.local/share/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable
    
    # --- Dépendances pour builder ---
    FROM base AS builder-deps
    # Désactive Husky dans Docker
    ENV HUSKY=0
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
    COPY apps/web/package.json apps/web/tsconfig.json apps/web/next.config.ts ./apps/web/
    RUN pnpm -r --filter ./apps/web... install --frozen-lockfile
    
    # --- Build ---
    FROM builder-deps AS build
    ENV NEXT_TELEMETRY_DISABLED=1
    COPY apps/web ./apps/web
    # Si tu as un dossier public/, il sera inclus automatiquement par Next
    RUN pnpm -F ./apps/web build
    
    # --- Runner (standalone) ---
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    # Copie la sortie standalone générée par Next
    COPY --from=build /workspace/apps/web/.next/standalone ./
    # Copie les assets statiques et public
    COPY --from=build /workspace/apps/web/.next/static ./apps/web/.next/static
    COPY --from=build /workspace/apps/web/public ./apps/web/public
    # Port par défaut Next
    ENV PORT=3000
    EXPOSE 3000
    CMD ["node", "apps/web/server.js"]
    