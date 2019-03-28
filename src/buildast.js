import _ from 'lodash';

const isObject = item => item instanceof Object;

const buildAst = (parsedData1, parsedData2) => {
  const iter = (data1, data2, level) => {
    const firstKeys = Object.keys(data1);
    const secondKeys = Object.keys(data2);
    const keys = _.union(firstKeys, secondKeys);
    return keys.map((key) => {
      if (!_.has(data1, key) && _.has(data2, key)) {
        return {
          key,
          value1: '',
          value2: data2[key],
          type: 'added',
          children: [],
          level,
        };
      }
      if (_.has(data1, key) && !_.has(data2, key)) {
        return {
          key,
          value1: data1[key],
          value2: '',
          type: 'deleted',
          children: [],
          level,
        };
      }
      if (data1[key] === data2[key]) {
        return {
          key,
          value1:
          data1[key],
          value2: '',
          type: 'same',
          children: [],
          level,
        };
      }
      if (isObject(data1[key]) && isObject(data2[key])) {
        const children = iter(data1[key], data2[key], level + 1);
        return {
          key,
          value1: '',
          value2: '',
          type: 'parent',
          children,
          level,
        };
      }
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'edited',
        children: [],
        level,
      };
    });
  };
  return iter(parsedData1, parsedData2, 0);
};

export default buildAst;
