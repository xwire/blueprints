import { newE2EPage } from '@stencil/core/testing';

describe('xwire-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xwire-grid></xwire-grid>');

    const element = await page.find('xwire-grid');
    expect(element).toHaveClass('hydrated');
  });
});
