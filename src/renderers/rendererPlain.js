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
    switch (type) {
      case 'added':
        return `Property '${propertyPath}${key}' was added with value: ${genPlainValue(value2)}`;
      case 'deleted':
        return `Property '${propertyPath}${key}' was removed`;
      case 'edited':
        return `Property '${propertyPath}${key}' was updated. From ${
          genPlainValue(value1)} to ${genPlainValue(value2)}`;
      case 'same':
        return `Property '${propertyPath}${key}' wasn't changed`;
      case 'parent':
        return iter(children, propertyPath.concat(key, '.'));
      default:
        return 'wrong type';
    }
  }).join('\n');
  return iter(ast, '');
};

export default renderPlain;
