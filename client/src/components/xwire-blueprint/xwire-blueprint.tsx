import {Component, h, Host, Prop, State} from '@stencil/core';
import {Blueprint, DataType} from "../../types/blueprint";

@Component({
  tag: "xwire-blueprint",
  styleUrl: "xwire-blueprint.scss",
  shadow: true
})
export class XwireBlueprint {

  @Prop() spec: Blueprint;

  @State() locked: boolean = true;

  render() {
    return (
      <Host class={this.locked ? 'locked': ''}>
        <BlueprintHeader title={this.spec.title} locked={this.locked}/>
        <hr/>
        <BlueprintContract inputs={this.spec.inputs} outputs={this.spec.outputs} locked={this.locked}/>
      </Host>
    );
  }
}

function BlueprintHeader(props: {title: string, locked: boolean}) {
  return (
    <div class={`blueprint-header ${props.locked ? 'locked' : ''}`}>
      <div class="blueprint-title">
        <input type="text" value={props.title} disabled={props.locked}/>
      </div>
      <LockButton locked={props.locked}/>
    </div>
  );
}

function LockButton(props: {locked: boolean}) {
  return (
    <div class="lock-button">
      <span class={props.locked ? 'closed' : 'open'}>
        {props.locked
          ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z"/>
            </svg>)
          : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 22.78125 0 C 21.605469 -0.00390625 20.40625 0.164063 19.21875 0.53125 C 12.902344 2.492188 9.289063 9.269531 11.25 15.59375 L 11.25 15.65625 C 11.507813 16.367188 12.199219 18.617188 12.625 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 14.75 20 C 14.441406 19.007813 13.511719 16.074219 13.125 15 L 13.15625 15 C 11.519531 9.722656 14.5 4.109375 19.78125 2.46875 C 25.050781 0.832031 30.695313 3.796875 32.34375 9.0625 C 32.34375 9.066406 32.34375 9.089844 32.34375 9.09375 C 32.570313 9.886719 33.65625 13.40625 33.65625 13.40625 C 33.746094 13.765625 34.027344 14.050781 34.386719 14.136719 C 34.75 14.226563 35.128906 14.109375 35.375 13.832031 C 35.621094 13.550781 35.695313 13.160156 35.5625 12.8125 C 35.5625 12.8125 34.433594 9.171875 34.25 8.53125 L 34.25 8.5 C 32.78125 3.761719 28.601563 0.542969 23.9375 0.0625 C 23.550781 0.0234375 23.171875 0 22.78125 0 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z"/>
            </svg>)
        }
      </span>
    </div>
  )
}

function BlueprintContract(props: {inputs: DataType[], outputs: DataType[], locked: boolean}) {
  return (
    <div class="blueprint-contract">
      <BlueprintInputs ports={props.inputs} locked={props.locked}/>
      <BlueprintOutputs ports={props.outputs} locked={props.locked}/>
    </div>
  );
}

function BlueprintInputs(props: {ports: DataType[], locked: boolean}) {
  return (
    <div class="blueprint-inputs">
      <PortListControl ports={props.ports} direction="input" locked={props.locked}/>
    </div>
  );
}

function BlueprintOutputs(props: {ports: DataType[], locked: boolean}) {
  return (
    <div class="blueprint-outputs">
      <PortListControl ports={props.ports} direction="output" locked={props.locked}/>
    </div>
  );
}

function PortListControl(props: {ports: DataType[], direction: 'input' | 'output', locked: boolean}) {
  return (
    <div class={`port-list-control ${props.direction}`}>
      <PortAddButton direction={props.direction} locked={props.locked}/>
      {props.ports.map(datatype =>
        <PortControl direction={props.direction} datatype={datatype} locked={props.locked}/>
      )}
    </div>
  )
}

function PortAddButton(props: {direction: 'input' | 'output', locked: boolean}) {
  return (
    <div class={`port-add-button ${props.direction} ${props.locked ? 'locked' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </div>
  );
}

function PortDeleteButton() {
  return (
    <div class="port-delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"/>
      </svg>
    </div>
  )
}

function PortControl(props: {direction: 'input' | 'output', datatype: DataType, locked: boolean}) {
  return (
    <div class={`port-control ${props.direction}`}>
      {!props.locked && props.direction === 'output' && <PortDeleteButton/>}
      {props.direction === 'input' && <PortCircle direction="input" datatype={props.datatype} locked={props.locked}/>}
      <div class="port-datatype-container">
        <div class={`port-datatype ${props.direction} ${props.datatype} ${props.locked ? 'locked' : ''}`}>{props.datatype}</div>
      </div>
      {props.direction === 'output' && <PortCircle direction="output" datatype={props.datatype} locked={props.locked}/>}
      {!props.locked && props.direction === 'input' && <PortDeleteButton/>}
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