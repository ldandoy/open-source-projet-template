# OSS Stack Template

![CI Status](https://github.com/ldandoy/open-source-projet-template/workflows/CI/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D20.10.0-green.svg)
![pnpm](https://img.shields.io/badge/pnpm-10.15.1-orange.svg)

Un template de projet open source avec monorepo utilisant les dernières technologies.

## 🚀 Applications

- **apps/web** : Next.js 15 + React 19 + Tailwind CSS v4 (frontend)
- **apps/api** : NestJS + Fastify sur **:4000** (API backend)

## ✨ Fonctionnalités

- **Qualité de code** : ESLint, Prettier, TypeScript strict
- **Tests** : Vitest avec couverture de code
- **Git hooks** : Husky + lint-staged + commitlint
- **CI/CD** : GitHub Actions avec tests automatisés
- **Monorepo** : pnpm workspace pour la gestion des dépendances

## 🛠️ Développement

### Prérequis

- Node.js ≥ 20.10.0
- pnpm 10.15.1
- Docker & Docker Compose

### Option 1 : Développement hybride (recommandé)

**Le meilleur des deux mondes : infrastructure Docker + apps locales avec hot-reload**

```bash
# 1. Infrastructure uniquement (DB, pgAdmin, Mailpit)
cd infra/compose
make dev

# 2. Applications en local avec hot-reload
cd ../../
pnpm install
pnpm dev
```

**Services disponibles :**

- 🔥 **API** : http://localhost:5000 (hot-reload)
- 🔥 **Web** : http://localhost:3000 (hot-reload)
- 🗄️ **PostgreSQL** : localhost:5432
- 🔧 **pgAdmin** : http://localhost:8081 (admin@example.com / admin)
- 📧 **Mailpit** : http://localhost:8025

### Option 2 : Développement full-local

```bash
# Installation
pnpm install

# Développement (sans Docker)
pnpm dev                    # Lance API + Web en mode dev
pnpm -F ./apps/api dev      # API uniquement (port 5000)
pnpm -F ./apps/web dev      # Web uniquement (port 3000)
```

### Option 3 : Environnement complet Docker

```bash
# Tous les services en Docker (mode production-like)
cd infra/compose
make up
```

**Services disponibles :**

- 🏢 **API** : http://localhost:5000 (Docker)
- 🏢 **Web** : http://localhost:3000 (Docker)
- 🗄️ **PostgreSQL** : localhost:5432
- 🔧 **pgAdmin** : http://localhost:8081
- 📧 **Mailpit** : http://localhost:8025

## 🔧 Commandes disponibles

### Développement local

```bash
pnpm dev                    # API + Web avec hot-reload
pnpm -F ./apps/api dev      # API uniquement
pnpm -F ./apps/web dev      # Web uniquement
```

### Docker

```bash
cd infra/compose

make dev                    # Infrastructure uniquement
make up                     # Tous les services
make down                   # Arrêter tous les services
make logs                   # Voir les logs
make status                 # Statut des services
make build                  # Reconstruire les images
```

### Tests & Qualité

```bash
pnpm test                   # Tests avec Vitest
pnpm lint                   # ESLint
pnpm format                 # Vérification Prettier
pnpm typecheck              # Vérification TypeScript
```

## 📁 Structure

```
├── apps/
│   ├── api/                # NestJS + Fastify API
│   │   ├── src/
│   │   └── test/
│   └── web/                # Next.js frontend
│       └── src/
├── .github/workflows/      # CI/CD GitHub Actions
└── package.json            # Configuration workspace
```

## 🧪 Tests

Les tests s'exécutent automatiquement sur chaque push/PR via GitHub Actions.

- **Framework** : Vitest
- **Couverture** : Rapports HTML générés
- **API** : Tests avec Supertest
- **Web** : Tests unitaires React

## 📝 Contribution

1. Fork le projet
2. Crée une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit tes changements (`git commit -m 'feat: ajouter nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvre une Pull Request

Les commits doivent suivre la [convention des commits](https://www.conventionalcommits.org/fr/).

## 📄 Licence

MIT - voir [LICENSE.md](LICENSE.md)
