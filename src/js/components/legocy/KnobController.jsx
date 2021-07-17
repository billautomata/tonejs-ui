// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeKnob } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    changeKnob: payload => dispatch(changeKnob(payload))
  }
}

class ConnectedKnobController extends Component {
  constructor(props) {
    super(props);
    this.knobNumber = 'A'
    this.setTo = this.setTo.bind(this)
  }

  setTo(value) {
    this.props.changeKnob({ id: this.knobNumber, value })
  }

  render() {
    // const { title } = this.state;
    const buttonStyle = { outline: '1px solid red', padding: 24, width: 140, margin: 10 }
    return (
      <>
        <div style={buttonStyle} onClick={()=>{this.setTo(100)}}>
          Set Value to 100
        </div>
        <div style={buttonStyle} onClick={()=>{this.setTo(-100)}}>
          Set Value to -100
        </div>
      </>
    );
  }
}

const KnobController = connect(
  null,
  mapDispatchToProps
)(ConnectedKnobController);

export default KnobController;