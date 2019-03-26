install:
	npm install
start:
	npx babel-node src/bin/gendiff.js '__tests__/__fixtures__/before.yml' '__tests__/__fixtures__/after.yml'
publish:
	npm publish
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test:
	npm test
