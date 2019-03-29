import renderTree from './rendererTree';
import renderPlain from './rendererPlain';

export default (astData, format) => {
  if (format === 'tree') return `${renderTree(astData)}\n}`;
  if (format === 'plain') return renderPlain(astData);
  return 'wrong format';
};
