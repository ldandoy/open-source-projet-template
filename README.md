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

### Démarrage rapide

```bash
# Installation
pnpm install

# Développement (lance les deux apps)
pnpm dev
```

### Commandes disponibles

```bash
# Développement
pnpm dev                    # Lance API + Web
pnpm -F ./apps/api dev      # API uniquement (port 4000)
pnpm -F ./apps/web dev      # Web uniquement

# Construction
pnpm -F ./apps/api build    # Build API
pnpm -F ./apps/web build    # Build Web

# Tests & Qualité
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
