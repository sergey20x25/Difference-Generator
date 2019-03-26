import fs from 'fs';
import _ from 'lodash';

export default (firstFilePath, secondFilePath) => {
  const firstFileData = JSON.parse(fs.readFileSync(firstFilePath, 'utf8'));
  const secondFileData = JSON.parse(fs.readFileSync(secondFilePath, 'utf8'));
  const firstKeys = Object.keys(firstFileData);
  const secondKeys = Object.keys(secondFileData);

  const keys = _.union(firstKeys, secondKeys);
  const mapped = keys.map((key) => {
    if (firstFileData[key] === secondFileData[key]) {
      return `    ${key}: ${firstFileData[key]}`;
    }
    if (firstKeys.includes(key)) {
      return secondKeys.includes(key)
        ? `  + ${key}: ${secondFileData[key]}\n  - ${key}: ${firstFileData[key]}`
        : `  - ${key}: ${firstFileData[key]}`;
    }
    return `  + ${key}: ${secondFileData[key]}`;
  });
  return `{\n${mapped.join('\n')}\n}`;
};
