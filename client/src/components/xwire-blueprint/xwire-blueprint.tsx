import {Component, h, Host, Prop} from '@stencil/core';
import {Blueprint} from "../../types/blueprint";

@Component({
  tag: 'xwire-blueprint',
  styleUrl: 'xwire-blueprint.scss',
  shadow: true
})
export class XwireBlueprint {

  @Prop() spec: Blueprint;

  render() {
    return (
      <Host>
        <p>{this.spec.title}</p>
      </Host>
    );
  }
}