import _ from 'lodash';

const addIndentation = n => '    '.repeat(n);

const stringify = (value, level) => {
  if (!(value instanceof Object)) return value;

  const stringLines = Object.keys(value)
    .map(key => `${addIndentation(level + 1)}    ${key}: ${value[key]}`);
  return `{\n${stringLines.join('\n')}\n${addIndentation(level + 1)}}`;
};

const renderTree = (ast) => {
  const iter = (astData, level) => {
    const mapped = astData.map((node) => {
      const {
        key, value1, value2, type, children,
      } = node;
      switch (type) {
        case 'added':
          return `${addIndentation(level)}  + ${key}: ${stringify(value2, level)}`;
        case 'deleted':
          return `${addIndentation(level)}  - ${key}: ${stringify(value1, level)}`;
        case 'same':
          return `${addIndentation(level)}    ${key}: ${stringify(value1, level)}`;
        case 'edited':
          return [
            `${addIndentation(level)}  - ${key}: ${stringify(value1, level)}`,
            `${addIndentation(level)}  + ${key}: ${stringify(value2, level)}`,
          ];
        case 'parent':
          return `${addIndentation(level)}    ${key}: ${iter(children, level + 1)}\n${
            addIndentation(level + 1)}}`;
        default:
          throw new Error('Wrong type');
      }
    });
    return `{\n${_.flatten(mapped).join('\n')}`;
  };
  return `${iter(ast, 0)}\n}`;
};

export default renderTree;
