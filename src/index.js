import fs from 'fs';
import _ from 'lodash';
import { extname } from 'path';
import parse from './parsers';

export default (firstFilePath, secondFilePath) => {
  const firstExt = extname(firstFilePath);
  const secondExt = extname(secondFilePath);
  const firstFileData = parse(firstExt, fs.readFileSync(firstFilePath, 'utf8'));
  const secondFileData = parse(secondExt, fs.readFileSync(secondFilePath, 'utf8'));
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
