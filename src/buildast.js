import _ from 'lodash';

const buildAst = (parsedData1, parsedData2) => {
  const firstKeys = Object.keys(parsedData1);
  const secondKeys = Object.keys(parsedData2);
  const keys = _.union(firstKeys, secondKeys);
  return keys.map((key) => {
    if (!_.has(parsedData1, key) && _.has(parsedData2, key)) {
      return {
        key,
        value2: parsedData2[key],
        type: 'added',
      };
    }
    if (_.has(parsedData1, key) && !_.has(parsedData2, key)) {
      return {
        key,
        value1: parsedData1[key],
        type: 'deleted',
      };
    }
    if (parsedData1[key] === parsedData2[key]) {
      return {
        key,
        value1: parsedData1[key],
        type: 'same',
      };
    }
    if (_.isPlainObject(parsedData1[key]) && _.isPlainObject(parsedData2[key])) {
      const children = buildAst(parsedData1[key], parsedData2[key]);
      return {
        key,
        type: 'parent',
        children,
      };
    }
    return {
      key,
      value1: parsedData1[key],
      value2: parsedData2[key],
      type: 'edited',
    };
  });
};

export default buildAst;
