import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'blueprint-stencils',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ],
};
