.PHONY: install dev build clean img

install:
	pip3 install mkdocs mkdocs-material pillow
	@mkdir -p docs/assets
	@ln -sfn "$(CURDIR)/assets/illustrations" docs/assets/illustrations 2>/dev/null || true
	@ln -sfn "$(CURDIR)/assets/diagrams" docs/assets/diagrams 2>/dev/null || true
	@echo ""
	@echo "Installation abgeschlossen."
	@echo "Starte Entwicklungsserver mit: make dev"

dev:
	PATH="$$PATH:$$HOME/Library/Python/3.9/bin" mkdocs serve --dev-addr localhost:2100

build:
	mkdocs build --clean

clean:
	rm -rf site/

# Bild generieren: make img TYPE=section DESC="..." NAME="kap06_wandaufbau"
img:
	python3 skills/imagegen/generate.py --type $(TYPE) --desc "$(DESC)" --name $(NAME)
