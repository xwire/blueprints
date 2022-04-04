import { newE2EPage } from '@stencil/core/testing';

describe('xwire-blueprint', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xwire-blueprint></xwire-blueprint>');

    const element = await page.find('xwire-blueprint');
    expect(element).toHaveClass('hydrated');
  });
});