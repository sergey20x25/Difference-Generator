const addIndentation = n => '    '.repeat(n);

const stringify = (value, level) => {
  if (value instanceof Object) {
    const stringLines = Object.keys(value)
      .map(key => `${addIndentation(level + 1)}    ${key}: ${value[key]}`);
    return `{\n${stringLines.join('\n')}\n${addIndentation(level + 1)}}`;
  }
  return value;
};

const render = (ast) => {
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
    return `${addIndentation(level)}    ${key}: ${render(children)}\n${addIndentation(level + 1)}}`;
  });
  return `{\n${mapped.join('\n')}`;
};

export default astData => `${render(astData)}\n}`;
