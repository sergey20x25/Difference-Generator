import fs from 'fs';
import _ from 'lodash';

export default (firstFilePath, secondFilePath) => {
  const firstFileData = JSON.parse(fs.readFileSync(firstFilePath, 'utf8'));
  const secondFileData = JSON.parse(fs.readFileSync(secondFilePath, 'utf8'));
  const firstKeys = Object.keys(firstFileData);
  const secondKeys = Object.keys(secondFileData);
  const addedKeys = _.difference(secondKeys, firstKeys);
  const deletedKeys = _.difference(firstKeys, secondKeys);
  const sameKeys = _.intersection(firstKeys, secondKeys);

  const addedStrings = addedKeys.reduce((acc, key) => [...acc, `  + ${key}: ${secondFileData[key]}`], []);
  const deletedStrings = deletedKeys.reduce((acc, key) => [...acc, `  - ${key}: ${firstFileData[key]}`], []);
  const sameKeysStrings = sameKeys.reduce((acc, key) => (firstFileData[key] === secondFileData[key]
    ? [...acc, `    ${key}: ${firstFileData[key]}`]
    : [...acc, `  + ${key}: ${secondFileData[key]}`, `  - ${key}: ${firstFileData[key]}`]), []);
  const diffString = _.concat(sameKeysStrings, deletedStrings, addedStrings).join('\n');
  return `{\n${diffString}\n}`;
};
