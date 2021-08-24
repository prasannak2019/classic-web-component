import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { env } from 'process';

export const config: Config = {
  namespace: 'ol-dashboard-poc',
  globalStyle: 'src/global/app.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      empty: !!env.storybook,
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      empty: !!env.development,
      baseUrl: '/ol-dashboard-poc/',
    },
  ],
  buildEs5: 'prod',
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
  },
  plugins: [sass()],
};
