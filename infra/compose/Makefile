SHELL := /bin/bash
PROJECT := oss-local

.PHONY: help up down logs ps restart clean build rebuild status dev

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Démarre tous les services
	docker compose -p $(PROJECT) -f docker-compose.yml up -d

dev: ## Démarre uniquement les services d'infrastructure pour le développement (DB, pgAdmin, Mailpit)
	@echo "🚀 Démarrage des services d'infrastructure pour le développement..."
	docker compose -p $(PROJECT) -f docker-compose.yml up db pgadmin mailpit -d
	@echo ""
	@echo "✅ Services d'infrastructure démarrés !"
	@echo ""
	@echo "📋 Services disponibles :"
	@echo "   • PostgreSQL  : localhost:5432"
	@echo "   • pgAdmin     : http://localhost:8081 (admin@example.com / admin)"
	@echo "   • Mailpit     : http://localhost:8025"
	@echo ""
	@echo "🏃 Pour lancer les apps en mode développement :"
	@echo "   cd ../../ && pnpm dev"
	@echo ""

down: ## Arrête tous les services
	docker compose -p $(PROJECT) -f docker-compose.yml down

logs: ## Affiche les logs en temps réel
	docker compose -p $(PROJECT) -f docker-compose.yml logs -f

ps: ## Liste les conteneurs
	docker compose -p $(PROJECT) -f docker-compose.yml ps

restart: ## Redémarre tous les services
	docker compose -p $(PROJECT) -f docker-compose.yml restart

clean: ## Arrête et supprime les volumes
	docker compose -p $(PROJECT) -f docker-compose.yml down -v

build: ## Construit les images
	docker compose -p $(PROJECT) -f docker-compose.yml build

rebuild: ## Reconstruit les images sans cache
	docker compose -p $(PROJECT) -f docker-compose.yml build --no-cache


status: ## Affiche le statut des services
	@echo "=== Statut des services ==="
	@docker compose -p $(PROJECT) -f docker-compose.yml ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
