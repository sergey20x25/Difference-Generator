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

export default renderPlain;
