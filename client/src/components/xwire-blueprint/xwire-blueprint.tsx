import {Component, h, State} from '@stencil/core';
import {BlueprintService} from "../../services/blueprint.service";
import {Blueprint} from "../../types/blueprint";

@Component({
  tag: 'xwire-blueprint',
  styleUrl: 'xwire-blueprint.scss',
  shadow: true
})
export class XwireBlueprint {

  @State() blueprint: Blueprint;

  async componentWillLoad() {
    this.blueprint = (await BlueprintService.fetchBlueprints())[0];
  }

  render() {
    return (
      <div class="xwire-blueprint">
        <p>{this.blueprint.title}</p>
      </div>
    );
  }
}