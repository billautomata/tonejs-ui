// src/js/components/List.js

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return { knobValue: state.knobValues[ownProps.id] };
};

export class ConnectedKnob extends React.Component {
  constructor(props) {
    super(props)
    console.log('this props', this.props)
    console.log('this state', this.state)
  }
  render () {
    const knobValue = this.props.knobValue
    return (
      <div>Knob Value: {knobValue}</div>
    )
  }
}

const Knob = connect(mapStateToProps)(ConnectedKnob);

export default Knob;