import renderTree from './rendererTree';
import renderPlain from './rendererPlain';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
};

export default (astData, format) => renderers[format](astData);
