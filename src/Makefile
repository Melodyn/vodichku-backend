setup: install-dependencies create-config dev
install-dependencies:
	npm ci
create-config:
	cp -n development.env.example development.env || true

# local run
dev:
	npm run dev
test:
	npm run test
stop: stop-node
stop-node:
	kill -15 `pidof node` || true