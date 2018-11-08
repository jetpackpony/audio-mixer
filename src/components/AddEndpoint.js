import React, { Component, Fragment } from 'react';
import { OkButton } from './buttons';
import ModalBox from './ModalBox';

const getDeviceById = (deviceList, deviceId) => (
  deviceList.find(d => d.deviceId === deviceId)
);

const getTitle = (type) => 
  type === "input"
    ? "Add an input node"
    : "Add an output node";

class AddEndpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      deviceId: ""
    };

    this.onDeviceSelected = this.onDeviceSelected.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDeviceSelected(event) {
    let deviceId = event.target.value;
    let device = getDeviceById(this.props.deviceList, deviceId);
    this.setState({
      deviceId,
      title: device.label
    });
  }

  onTitleChanged(event) {
    this.setState({ title: event.target.value });
  }

  onSubmit() {
    this.props.toggle();
    this.props.onCreate(
      this.state.title,
      getDeviceById(this.props.deviceList, this.state.deviceId)
    );
  }

  render() {
    const { type, deviceList, isOpen, toggle } = this.props;
    let options = deviceList.map(device => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ));
    return (
      <ModalBox
        isOpen={isOpen}
        toggle={toggle}
        header={getTitle(type)}
        body={
          <Fragment>
            <input value={this.state.title} onChange={this.onTitleChanged} />
            <select value={this.state.deviceId} onChange={this.onDeviceSelected}>
              <option disabled value="" key="-1">
                -- select {type === "input" ? "input" : "output"} device --
              </option>
              {options}
            </select>
          </Fragment>
        }
        footer={
          <OkButton onClick={this.onSubmit} />
        }
      />
    );
  }
}

export default AddEndpoint;