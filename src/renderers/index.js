import renderTree from './rendererTree';
import renderPlain from './rendererPlain';
import renderJson from './rendererJson';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (astData, format) => renderers[format](astData);
