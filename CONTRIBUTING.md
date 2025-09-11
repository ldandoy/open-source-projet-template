# Contribuer

Merci d’envisager une contribution 🤝  
Ce document explique **comment installer le projet, le lancer, coder proprement, écrire des tests et ouvrir une PR**.

> En participant, vous acceptez le [Code of Conduct](./CODE_OF_CONDUCT.md) et la licence du dépôt (MIT).  
> Pour signaler une faille, suivez la politique décrite dans `SECURITY.md` (ne pas ouvrir d’issue publique).

---

## Sommaire

1. [Aperçu & structure](#aperçu--structure)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Lancer le projet](#lancer-le-projet)
5. [Qualité & conventions](#qualité--conventions)
6. [Tests](#tests)
7. [Ajouter une dépendance](#ajouter-une-dépendance)
8. [Variables d’environnement](#variables-denvironnement)
9. [Branches, issues & PR](#branches-issues--pr)
10. [Standards API & Web](#standards-api--web)
11. [Checklist de PR](#checklist-de-pr)

---

## Aperçu & structure

**Monorepo pnpm (workspaces)** — mode simple sans `packages/`.

├─ apps/
│ ├─ web/ # Next.js (App Router, TS, Tailwind)
│ └─ api/ # NestJS (Fastify, Swagger)
├─ .github/workflows/ci.yml # CI (lint, typecheck, tests)
├─ tsconfig.base.json # options TypeScript partagées
├─ .eslintrc.cjs, .prettierrc, .editorconfig
├─ CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, LICENSE
└─ pnpm-workspace.yaml

## Prérequis

- **Node.js 20+** (recommandé : `nvm` pour gérer les versions)
- **pnpm** via Corepack :

  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate

  ```

- Git
- (optionnel pour plus tard) Docker / Docker Compose

## Installation

À la racine du dépôt:

```markdown
# 1) Cloner & se placer dans le dossier

git clone <URL_DU_REPO>
cd <nom-du-repo>

# 2) Node & pnpm

nvm use 20 # si vous utilisez nvm
corepack enable
corepack prepare pnpm@latest --activate

# 3) Dépendances

pnpm install

# 4) Hooks Git (Husky)

pnpm run prepare
```

## Lancer le projet

```bash
pnpm dev

pnpm --filter ./apps/web dev
# http://localhost:3000

pnpm --filter ./apps/api dev
# Swagger: http://localhost:4000/api/docs
# Health:  http://localhost:4000/api/healthz
```

## Qualité & conventions

```bash
pnpm lint            # ESLint
pnpm format          # vérifie le format Prettier
pnpm format:write    # corrige automatiquement

pnpm typecheck
```

### Conventional Commits + commitlint

Exemple :

- feat(web): add project list page
- fix(api): handle empty project id
- docs: update README with run instructions
  -chore(ci): cache pnpm

Scopes suggérés : web, api, infra, ci, docs.

## Tests

```bash

```

## Variables d’environnement

- API (apps/api/.env)

```bash
PORT=4000
NODE_ENV=development
```

Copiez apps/api/.env.example vers .env puis adaptez.

- Web (apps/web/.env.local) : selon vos besoins Next.js (non versionné).

Ne jamais commiter des secrets. Fournir un .env.example à jour.

## Branches, issues & PR

- Branches : créez une feature branch depuis main
  Exemple : feat/projects-list, fix/api-timeout, docs/contributing.
- Issues : décrivez le contexte, les étapes de reproduction, l’attendu et le résultat actuel. Ajoutez des captures/logs si possible.
- Pull Requests :
  - Liez l’issue (Closes #123).
  - Titre au format Conventional Commit.
  - Screenshots / GIFs pour les changements UI.
  - Cochez la checklist ci-dessous.

## Standards API & Web

### API (NestJS + Fastify)

- Préfixe global : /api (ex : /api/healthz, /api/projects).
- Swagger : tenu à jour (/api/docs).
- Utiliser les décorateurs @ApiTags, @ApiProperty, etc.
- Validation : si besoin, privilégier des DTOs (class) + pipes Nest, ou Zod selon les modules (cohérence au sein du module).
- Erreurs : HTTP codes clairs (404 si ressource absente, 400 si payload invalide, etc.).
- Logs : évitez les console.log; utilisez le logger Nest si nécessaire.

### Web (Next.js)

- App Router + RSC.
- UI : Tailwind (classes utilitaires), composants simples et accessibles.
- Appels API : fetch depuis les Server Components (ou clients si nécessaire), pas d’URL en dur pour la prod (variable d’environnement).

## Checklist de PR

- Le code compile et passe les tests (pnpm -F ./apps/api test)
- Typecheck, lint et format sont OK (pnpm typecheck && pnpm lint && pnpm format)
- README/Docs mis à jour si nécessaire (incl. Swagger pour l’API)
- Pas de secret ni d’info sensible commité
- Message de commit au format Conventional Commits

## Licence

En contribuant, vous acceptez que votre contribution soit licenciée sous la licence MIT du projet.
