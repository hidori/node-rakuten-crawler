.PHONY: install
install:
	npm ci

.PHONY: env
env:
	if [ ! -e .env ]; then \
		cp .env.example .env; \
	fi

.PHONY: test
test: env
	npm test

.PHONY: format
format:
	npm run format

.PHONY: build
build:
	docker buildx build -t rakuten-crawler .

.PHONY: run
run: env
	docker run -it --rm --name rakuten-crawler --env-file .env -e PLAYWRIGHT_HEADLESS=true \
		rakuten-crawler ./src/index.js login emagazine/rakuten emagazine/shop
