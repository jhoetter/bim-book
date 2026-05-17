.PHONY: install dev build clean img

install:
	pip3 install pillow
	@mkdir -p web/public
	@ln -sfn ../../assets web/public/assets 2>/dev/null || true
	cd web && npm install
	@echo ""
	@echo "Installation abgeschlossen. Starte mit: make dev"

dev:
	cd web && npm run dev

build:
	cd web && npm run build

clean:
	rm -rf web/dist web/node_modules

# Bild generieren: make img TYPE=section DESC="..." NAME="kap06_wandaufbau"
img:
	python3 skills/imagegen/generate.py --type $(TYPE) --desc "$(DESC)" --name $(NAME)
