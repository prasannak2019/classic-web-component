import { p as promiseResolve, b as bootstrapLazy } from './index-27b3cc8a.js';

/*
 Stencil Client Patch Esm v2.7.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["my-component_2",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}],[1,"sample-component",{"text":[1]}]]]], options);
  });
};

export { defineCustomElements };
