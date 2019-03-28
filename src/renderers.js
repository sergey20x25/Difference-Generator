const addIndentation = n => '    '.repeat(n);

const stringify = (value, level) => {
  if (value instanceof Object) {
    const stringLines = Object.keys(value)
      .map(key => `${addIndentation(level + 1)}    ${key}: ${value[key]}`);
    return `{\n${stringLines.join('\n')}\n${addIndentation(level + 1)}}`;
  }
  return value;
};

const renderTree = (ast) => {
  const mapped = ast.map((node) => {
    const {
      key, value1, value2, type, level, children,
    } = node;
    if (type === 'added') {
      return `${addIndentation(level)}  + ${key}: ${stringify(value2, level)}`;
    }
    if (type === 'deleted') {
      return `${addIndentation(level)}  - ${key}: ${stringify(value1, level)}`;
    }
    if (type === 'same') {
      return `${addIndentation(level)}    ${key}: ${stringify(value1, level)}`;
    }
    if (type === 'edited') {
      return `${addIndentation(level)}  - ${key}: ${stringify(value1, level)}\n${
        addIndentation(level)}  + ${key}: ${stringify(value2, level)}`;
    }
    return `${addIndentation(level)}    ${key}: ${renderTree(children)}\n${addIndentation(level + 1)}}`;
  });
  return `{\n${mapped.join('\n')}`;
};

const genPlainValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return value;
};

const renderPlain = (ast) => {
  const iter = (astData, propertyPath) => astData.map((node) => {
    const {
      key, value1, value2, type, children,
    } = node;
    if (type === 'added') {
      return `Property '${propertyPath}${key}' was added with value: ${genPlainValue(value2)}`;
    }
    if (type === 'deleted') {
      return `Property '${propertyPath}${key}' was removed`;
    }
    if (type === 'edited') {
      return `Property '${propertyPath}${key}' was updated. From ${
        genPlainValue(value1)} to ${genPlainValue(value2)}`;
    }
    if (type === 'same') {
      return `Property '${propertyPath}${key}' wasn't changed`;
    }
    return iter(children, propertyPath.concat(key, '.'));
  }).join('\n');
  return iter(ast, '');
};

export default (astData, format) => {
  if (format === 'tree') return `${renderTree(astData)}\n}`;
  if (format === 'plain') return renderPlain(astData);
  return 'wrong format';
};
