import {Component, Event, EventEmitter, h, Host, Listen, Prop, State} from '@stencil/core';
import {Blueprint, DataType} from "../../types/blueprint";
import {LockIcon, PlusIcon, TrashIcon, UnlockIcon} from "../common/icons";
import {Callback} from "../../types/util";

@Component({
  tag: "xwire-blueprint",
  styleUrl: "xwire-blueprint.scss",
  shadow: true
})
export class XwireBlueprint {

  @Prop({mutable: true}) spec: Blueprint;

  @State() locked: boolean = true;

  @Event() blueprintLocked: EventEmitter<void>;
  @Event() blueprintUnlocked: EventEmitter<void>;

  @Event() inputRemoved: EventEmitter<number>;
  @Event() outputRemoved: EventEmitter<number>;

  @Listen('blueprintLocked')
  lockBlueprint() { this.locked = true; }

  @Listen('blueprintUnlocked')
  unlockBlueprint() { this.locked = false; }

  @Listen('inputRemoved')
  removeInput(event: CustomEvent<number>) {
    this.spec = {
      ...this.spec,
      inputs: [
        ...this.spec.inputs.filter((_, index) => index !== event.detail)
      ]
    };
  }

  @Listen('outputRemoved')
  removeOutput(event: CustomEvent<number>) {
    this.spec = {
      ...this.spec,
      outputs: [
        ...this.spec.outputs.filter((_, index) => index !== event.detail)
      ]
    };
  }

  render() {
    return (
      <Host class={this.locked ? 'locked': ''}>
        <Header
          title={this.spec.title} locked={this.locked}
          onLock={this.blueprintLocked.emit} onUnlock={this.blueprintUnlocked.emit}/>
        <hr/>
        <Contract
          inputs={this.spec.inputs} outputs={this.spec.outputs} locked={this.locked}
          onDeleteInput={this.inputRemoved.emit} onDeleteOutput={this.outputRemoved.emit}/>
      </Host>
    );
  }
}

function Header(props: {title: string, locked: boolean, onLock: Callback<void>, onUnlock: Callback<void>}) {
  return (
    <div class={`blueprint-header ${props.locked ? 'locked' : ''}`}>
      <div class="blueprint-title">
        <input type="text" value={props.title} disabled={props.locked}/>
      </div>
      <div class="lock-button" onClick={() => props.locked ? props.onUnlock() : props.onLock()}>
            <span class={props.locked ? 'closed' : 'open'}>
              {props.locked ? (<LockIcon/>) : (<UnlockIcon/>)}
            </span>
      </div>
    </div>
  );
}

function Contract(props: {inputs: DataType[], outputs: DataType[], locked: boolean, onDeleteInput: Callback<number>, onDeleteOutput: Callback<number>}) {
  return (
    <div class="blueprint-contract">
      <div class="blueprint-inputs">
        <PortListControl
          ports={props.inputs} direction="input" locked={props.locked}
          onDeletePort={(index) => props.onDeleteInput(index)}/>
      </div>
      <div class="blueprint-outputs">
        <PortListControl
          ports={props.outputs} direction="output" locked={props.locked}
          onDeletePort={(index) => props.onDeleteOutput(index)}/>
      </div>
    </div>
  );
}

function PortListControl(props: {ports: DataType[], direction: 'input' | 'output', locked: boolean, onDeletePort: Callback<number>}) {
  return (
    <div class={`port-list-control ${props.direction}`}>
      <div class={`port-add-button ${props.direction} ${props.locked ? 'locked' : ''}`}>
        <PlusIcon/>
      </div>
      {props.ports.map((datatype, index) =>
        <PortControl direction={props.direction} datatype={datatype} locked={props.locked} onDelete={() => props.onDeletePort(index)}/>)}
    </div>
  )
}

function PortControl(props: {direction: 'input' | 'output', datatype: DataType, locked: boolean, onDelete: Callback<void>}) {
  return (
    <div class={`port-control ${props.direction}`}>
      {!props.locked && props.direction === 'output' && <PortDeleteButton onClick={props.onDelete}/>}
      {props.direction === 'input' && <PortCircle direction="input" datatype={props.datatype} locked={props.locked}/>}
      <div class="port-datatype-container">
        <div class={`port-datatype ${props.direction} ${props.datatype} ${props.locked ? 'locked' : ''}`}>{props.datatype}</div>
      </div>
      {props.direction === 'output' && <PortCircle direction="output" datatype={props.datatype} locked={props.locked}/>}
      {!props.locked && props.direction === 'input' && <PortDeleteButton onClick={props.onDelete}/>}
    </div>
  );
}

function PortCircle(props: {direction: 'input' | 'output', datatype: DataType, locked: boolean}) {
  return (
    <div class="port-circle-container">
      <div class={`port-circle ${props.direction} ${props.datatype} ${props.locked ? 'locked' : ''}`}/>
    </div>
  );
}

function PortDeleteButton(props: {onClick: Callback<void>}) {
  return (
    <div class="port-delete-button" onClick={() => props.onClick()}>
      <TrashIcon/>
    </div>
  )
}