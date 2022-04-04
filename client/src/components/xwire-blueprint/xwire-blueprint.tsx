import { Component, h } from '@stencil/core';

@Component({
  tag: 'xwire-blueprint',
  styleUrl: 'xwire-blueprint.scss',
  shadow: true
})
export class XwireBlueprint {
  render() {
    return (
      <div class="xwire-blueprint">
        <p>Hello World</p>
      </div>
    );
  }
}