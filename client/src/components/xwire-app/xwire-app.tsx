import {Component, h, Host, State} from '@stencil/core';
import {BlueprintService} from "../../services/blueprint.service";
import {Blueprint} from "../../types/blueprint";

@Component({
  tag: 'xwire-app',
  styleUrl: 'xwire-app.scss',
  shadow: true,
})
export class XwireApp {

  @State() blueprints: Blueprint[];

  async componentWillLoad() {
    this.blueprints = await BlueprintService.fetchBlueprints();
  }

  render() {
    return (
      <Host>
        <xwire-grid>
          {this.blueprints.map(blueprint => (
            <xwire-blueprint spec={blueprint}/>
          ))}
        </xwire-grid>
      </Host>
    );
  }
}
