install:
	npm install
start:
	npx babel-node src/bin/gendiff.js '__tests__/__fixtures__/before.ini' '__tests__/__fixtures__/after.ini'
publish:
	npm publish
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test:
	npm test
