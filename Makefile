.PHONY: install dev dev-all server server-mcp build clean img

install:
	pip3 install pillow
	@mkdir -p web/public
	@ln -sfn ../../assets web/public/assets 2>/dev/null || true
	cd web && npm install
	cd server && npm install
	@echo ""
	@echo "Installation abgeschlossen."
	@echo "ANTHROPIC_API_KEY in .env setzen, dann: make dev-all"

dev:
	npm run dev

# Alias: identisch mit dev
dev-all: dev

server:
	cd server && npm run start

server-dev:
	cd server && npm run dev

build:
	cd web && npm run build

clean:
	rm -rf web/dist web/node_modules server/node_modules

# MCP-Server manuell starten (für Tests)
mcp:
	cd server && npm run mcp

# Bild generieren: make img TYPE=section DESC="..." NAME="kap06_wandaufbau"
img:
	python3 skills/imagegen/generate.py --type $(TYPE) --desc "$(DESC)" --name $(NAME)
