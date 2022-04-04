import { newSpecPage } from '@stencil/core/testing';
import { XwireGrid } from '../xwire-grid';

describe('xwire-grid', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XwireGrid],
      html: `<xwire-grid></xwire-grid>`,
    });
    expect(page.root).toEqualHtml(`
      <xwire-grid>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xwire-grid>
    `);
  });
});
