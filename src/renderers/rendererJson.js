const renderJson = ast => ast.map((node) => {
  const {
    key, value1, value2, type, children,
  } = node;
  switch (type) {
    case 'added':
      return {
        key, value: value2, type,
      };
    case 'deleted':
      return {
        key, value: value1, type,
      };
    case 'edited':
      return {
        key, oldValue: value1, value: value2, type,
      };
    case 'same':
      return { key, value: value1, type: 'wasn\'t changed' };
    case 'parent':
      return { key, type, value: renderJson(children) };
    default:
      throw new Error('Wrong type');
  }
});

export default astData => JSON.stringify(renderJson(astData), null, 2);
