import { newSpecPage } from '@stencil/core/testing';
import { XwireBlueprint } from '../xwire-blueprint';

describe('xwire-blueprint', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XwireBlueprint],
      html: `<xwire-blueprint></xwire-blueprint>`,
    });
    expect(page.root).toEqualHtml(`
      <xwire-blueprint>
        <mock:shadow-root>
          <div class="xwire-blueprint">
            <p>
              Hello World
            </p>
          </div>
        </mock:shadow-root>
      </xwire-blueprint>
    `);
  });
});