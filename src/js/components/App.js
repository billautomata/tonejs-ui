import React from "react"
import { connect } from "react-redux"
import { moveWire } from "../actions/index"
import MonoSynth from './MonoSynth'
import LFO from './LFO'
import Widget from './Widget'
import Wire from './Wire'
import Sequencer from './Sequencer'

const mapStateToProps = (state, ownProps) => {
  return { 
    synths: state.synths,
    wires: state.wires
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveWire: payload => dispatch(moveWire(payload))
  }
}

const ConnectedApp = ({ synths, wires, moveWire }) => (
  <div style={{padding: '10px', fontFamily: 'Roboto'}}>
    <svg width={1200} height={768} style={{outline: '1px solid #DDD', fontFamily: 'Roboto'}}
    onMouseMove={(event)=>{
      // console.log(event.nativeEvent)
      // moveWire({ id: 'A', position: { x: event.nativeEvent.layerX, y: event.nativeEvent.layerY } })
    }}>
      <defs>
        <filter id='synth-shadow'>
          <feDropShadow dx='3' dy='5' stdDeviation='2' floodColor='#333'/>
        </filter>
        <filter id='button-shadow'>
          <feDropShadow dx='1' dy='1' stdDeviation='1' floodColor='#AAA'/>
        </filter>
      </defs>
      { 
        synths.map(synth=>{
          switch (synth.type) {
            case 'monosynth': return (
              <MonoSynth {...synth} key={`synth_${synth.id}`}/>
            )
            case 'lfo': return (
              <LFO {...synth} key={`synth_${synth.id}`}/>
            )
            case 'sequencer': return (
              <Sequencer {...synth} key={`synth_${synth.id}`}/>
            )
            default: return (
              <></>
            )
          }
        })
      }
      {
        wires.map(wire=>{
          return (
            <Wire {...wire} key={`wire_${wire.id}`}/>
          )          
        })
      }
    </svg>
  </div>
);

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;