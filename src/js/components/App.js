import React from "react"
import { connect } from "react-redux"
// import List from "./List"
// import Form from "./Form"
// import KnobViewer from './KnobViewer'
// import KnobController from './KnobController'
// import SvgKnob from './SvgKnob'
import MonoSynth from './MonoSynth'

const mapStateToProps = (state, ownProps) => {
  return { 
    synths: state.synths
  }
}

const ConnectedApp = ({ synths }) => (
  <div style={{padding: '10px', fontFamily: 'Roboto'}}>
    <svg width={1024} height={512} style={{outline: '1px solid #DDD'}}>
      {synths.map(synth=>{
        if(synth.type === 'monosynth') {
          return (
            <MonoSynth {...synth}/>
          )
        }
      })}      
    </svg>
  </div>
);

const App = connect(mapStateToProps)(ConnectedApp);

export default App;