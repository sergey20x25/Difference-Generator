import genDiff from '../src';

const testJsonPath1 = '__tests__/__fixtures__/before.json';
const testJsonPath2 = '__tests__/__fixtures__/after.json';
const testYamlPath1 = '__tests__/__fixtures__/before.yml';
const testYamlPath2 = '__tests__/__fixtures__/after.yml';
const testIniPath1 = '__tests__/__fixtures__/before.ini';
const testIniPath2 = '__tests__/__fixtures__/after.ini';
const expectedJson = `{
  + name: sergey20x25
  - name: sergey20x25-gd
    version: 1.0.2
  - description: Hexlet project - gendiff. Differences finding util.
  + host: hexlet.io
  + author: sergey20x25
  + license: ISC
}`;
const expectedYml = `{
    language: node_js
  - node_js: node
  + script: make lint
  - script: make test
  + plugins: import
}`;
const expectedIni = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

describe('genDiff tests', () => {
  test('json test', () => {
    expect(genDiff(testJsonPath1, testJsonPath2)).toEqual(expectedJson);
  });

  test('yaml test', () => {
    expect(genDiff(testYamlPath1, testYamlPath2)).toEqual(expectedYml);
  });

  test('ini test', () => {
    expect(genDiff(testIniPath1, testIniPath2)).toEqual(expectedIni);
  });
});
