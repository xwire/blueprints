import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'xwire',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/_variables.scss'
      ]
    })
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ],
};
