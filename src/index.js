import { readFileSync } from 'fs';
import { extname } from 'path';
import render from './renderer';
import parse from './parsers';
import buildAst from './buildast';

export default (firstFilePath, secondFilePath) => {
  const firstExt = extname(firstFilePath);
  const secondExt = extname(secondFilePath);
  const firstFileData = parse(firstExt, readFileSync(firstFilePath, 'utf8'));
  const secondFileData = parse(secondExt, readFileSync(secondFilePath, 'utf8'));
  const ast = buildAst(firstFileData, secondFileData);
  return render(ast);
};
