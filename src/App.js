import React, { Component, Fragment } from 'react';
import './App.css';
import NodeList from './components/NodeList';
import AddEndpoint from './components/AddEndpoint';
import EditGain from './components/EditGain';
import AddConnection from './components/AddConnection';
import { CardDeck } from 'reactstrap';
import WebAudioEngine from './components/WebAudioEngine';
import { DEVICE_TYPES } from './components/WebAudioEngine/constants';

let state = {
  webAudioDevices: [],
  audioGraph: {},
  ui: {
    addInputOpen: false,
    addOutputOpen: false,
    addConnectionOpen: false,
    editGainOpen: false,
    editGainId: null
  }
};

const getMicId = (devices) => devices.filter(d => d.label === "Internal Microphone (Built-in)" && d.kind === "audioinput")[0].deviceId;
const getHeadphonesId = (devices) => devices.filter(d => d.label === "Headphones (Built-in)" && d.kind === "audiooutput")[0].deviceId;
const getHDMIId = (devices) => devices.filter(d => d.label === "DELL S2415H (HDMI)" && d.kind === "audiooutput")[0].deviceId;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.onDevicesLoaded = this.onDevicesLoaded.bind(this);
  }

  onDevicesLoaded(devices) {
    console.log("devices loaded: ", devices);
    const audioGraph = {
      "0": {
        type: DEVICE_TYPES.SOURCE,
        output: ["1"],
        deviceId: getMicId(devices)
      },
      "1": {
        type: DEVICE_TYPES.DESTINATION,
        deviceId: getHeadphonesId(devices)
      },
      "2": {
        type: DEVICE_TYPES.DESTINATION,
        deviceId: getHDMIId(devices)
      }
    };
    this.setState({
      webAudioDevices: devices,
      audioGraph: audioGraph
    });
  }

  render() {
    let nodes = [
      { title: "First", nodeId: "I1"},
      { title: "Second", nodeId: "O1"},
      { title: "Third", nodeId: "C2"},
      { title: "Fourth", nodeId: "O2"},
    ];
    let devices = [
      { deviceId: "1", label: "Microphone (built-in)"},
      { deviceId: "2", label: "Microphone (external)"},
      { deviceId: "3", label: "Soundflower (2ch)"},
    ];
    let onDelete = (nodeId) => console.log("deleting node " + nodeId);
    let onEdit = (nodeId) => console.log("editing node " + nodeId);
    const onCreateEndpoint = (device) => console.log("creating device: ", device);
    const addGainNode = () => console.log('adding a gain node');
    const openAddEndpoint = (type) => console.log("opening add endpoint menu for ", type);
    const openAddConnection = () => console.log("opening add connection menu");
    const onGainChange = (nodeId, value) => {
      console.log("setting gain for " + nodeId + " to " + value);
      this.setState({
        editingGainId: nodeId,
        editingGainValue: value
      });
    }
    const onAddConnection = ({ from, to }) => console.log("creating connection from " + from.title + " to " + to.title);
    const toggleAddInput = () => this.setState({
      addInputOpen: !this.state.addInputOpen
    });
    const toggleAddOutput = () => this.setState({
      addOutputOpen: !this.state.addOutputOpen
    });
    const toggleAddConnection = () => this.setState({
      addConnectionOpen: !this.state.addConnectionOpen
    });
    const toggleEditGain = () => this.setState({
      editGainOpen: !this.state.editGainOpen
    });
    const editGainNode = (nodeId) => {
      toggleEditGain();
      this.setState({
        editingGainId: nodeId,
        editingGainValue: 0
      });
    };
    return (
      <Fragment>
        <WebAudioEngine
          onDevicesLoaded={this.onDevicesLoaded}
          devices={this.state.webAudioDevices}
          audioGraph={this.state.audioGraph}
        />
        <CardDeck>
          <NodeList
            title="Inputs"
            nodes={nodes}
            onDelete={onDelete}
            onAdd={toggleAddInput}
          />
          <NodeList
            title="Audio Nodes"
            nodes={nodes}
            onDelete={onDelete}
            onEdit={editGainNode}
            onAdd={addGainNode}
          />
          <NodeList
            title="Outputs"
            nodes={nodes}
            onDelete={onDelete}
            onAdd={toggleAddOutput}
          />
          <NodeList
            title="Connections"
            nodes={nodes}
            onDelete={onDelete}
            onAdd={toggleAddConnection}
          />
        </CardDeck>
        <AddEndpoint
          type="input"
          deviceList={devices}
          onCreate={onCreateEndpoint}
          toggle={toggleAddInput}
          isOpen={this.state.addInputOpen}
        />
        <AddEndpoint
          type="output"
          deviceList={devices}
          onCreate={onCreateEndpoint}
          toggle={toggleAddOutput}
          isOpen={this.state.addOutputOpen}
        />
        <AddConnection
          nodesList={nodes}
          onAddConnection={onAddConnection}
          toggle={toggleAddConnection}
          isOpen={this.state.addConnectionOpen}
        />
        <EditGain
          nodeId={this.state.editingGainId}
          value={this.state.editingGainValue}
          onGainChange={onGainChange}
          isOpen={this.state.editGainOpen}
          toggle={toggleEditGain}
        />
      </Fragment>
    );
  }
}

export default App;
