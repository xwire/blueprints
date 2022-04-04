import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'xwire',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ],
};
