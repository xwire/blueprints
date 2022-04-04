import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xwire-grid',
  styleUrl: 'xwire-grid.css',
  shadow: true,
})
export class XwireGrid {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}