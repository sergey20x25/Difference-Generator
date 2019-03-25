import genDiff from '../src';

const testJsonPath1 = '__tests__/__fixtures__/before.json';
const testJsonPath2 = '__tests__/__fixtures__/after.json';
const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('genDiff test', () => {
  expect(genDiff(testJsonPath1, testJsonPath2)).toEqual(expected);
});
