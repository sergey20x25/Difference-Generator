import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parseIni = (iniData) => {
  const rawParsed = parse(iniData);
  const stringifyKeysAndValues = (object) => {
    return Object.keys(object).reduce((acc, key) => {
      const strKey = String(key);
      const newValue = object[key] instanceof Object
        ? stringifyKeysAndValues(object[key]) : String(object[key]);
      return { ...acc, [strKey]: newValue };
    }, {});
  };
  return stringifyKeysAndValues(rawParsed);
};

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': parseIni,
};

export default (fileExt, data) => parsers[fileExt](data);
