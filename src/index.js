import { readFileSync } from 'fs';
import { extname } from 'path';
import render from './renderers';
import parse from './parsers';
import buildAst from './buildast';

export default (firstFilePath, secondFilePath, format = 'tree') => {
  const firstExt = extname(firstFilePath);
  const secondExt = extname(secondFilePath);
  const firstFileData = parse(firstExt, readFileSync(firstFilePath, 'utf8'));
  const secondFileData = parse(secondExt, readFileSync(secondFilePath, 'utf8'));
  const ast = buildAst(firstFileData, secondFileData);
  return render(ast, format);
};
