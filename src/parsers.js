import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': parse,
};

export default (fileExt, fileData) => parsers[fileExt](fileData);
