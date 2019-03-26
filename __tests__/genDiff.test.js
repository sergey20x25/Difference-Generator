import genDiff from '../src';

const testJsonPath1 = '__tests__/__fixtures__/before.json';
const testJsonPath2 = '__tests__/__fixtures__/after.json';
const expected = `{
  + name: sergey20x25
  - name: sergey20x25-gd
    version: 1.0.2
  - description: Hexlet project - gendiff. Differences finding util.
  + host: hexlet.io
  + author: sergey20x25
  + license: ISC
}`;

test('genDiff test', () => {
  expect(genDiff(testJsonPath1, testJsonPath2)).toEqual(expected);
});
