import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import * as Tone from 'tone'
import Widget from './Widget'
import Keybed from './subcomponents/Keybed'
import { notePressed } from '../actions/index'


const mapStateToProps = (state, ownProps) => {
  const synth = state.synths.filter(o=>{ return o.id === ownProps.id })[0]
  const activeTrack = synth.buttons.filter(o => { return o.buttonGroup === 'select-track' && o.value === true})[0].name
  const activeStep = synth.buttons.filter(o => { return o.buttonGroup === 'select-step' && o.value === true})[0].name
  console.log('activeTrack',activeTrack,'activeStep',activeStep)
  const activeButton = synth.buttons.filter(o => { return o.name === `track_${activeTrack}_step_${activeStep}`})[0]
  return {
    activeTrack,
    activeStep,
    notes: activeButton.noteData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    notePressed: payload => dispatch(notePressed(payload))
  }
}

export class ConnectedSequencer extends React.Component {
  constructor(props) {
    super(props)
    this.sharpsOrdinals = d3.scaleOrdinal().domain(d3.range(5)).range([0,1,3,4,5])
    this.naturalNoteNames = ['C','D','E','F','G','A','B']
    this.sharpNoteNames = ['C#','D#','F#','G#','A#']
    this.state = {
      currentStep: 0,
      loop: new Tone.Loop(time=>{
        this.playNotes()        
        this.setState({ currentStep: (this.state.currentStep + 1) % this.props.metadata.nSteps })        
      },'16n')
    }
    this.startSequencer = this.startSequencer.bind(this)
    this.playNotes = this.playNotes.bind(this)
  }

  componentDidMount () {
  }
  componentDidUpdate () {
    // console.log(this.props.notes)
  }

  startSequencer () {
    Tone.start()
    this.state.loop.start()
    Tone.Transport.start()
  }

  playNotes () {
    const notes = []
    d3.range(this.props.metadata.nTracks).map(track=>{      
      const noteData = this.props.buttons.filter(o=>{ return o.name === `track_${track}_step_${this.state.currentStep}`})[0].noteData
      Object.keys(noteData).forEach(noteName=>{
        if(noteData[noteName]) {
          notes.push(noteName)
        }        
      })
    })
    if(notes.length > 0) {
      console.log(this.state.currentStep, notes)
    }
  }

  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
        <Widget {...this.props}/>
        {
          d3.range(6).map(octave=>{
            return (
              <Keybed position={{ x: 25 + (octave*140), y: 5}} id={this.props.id} octave={octave+1}/>
            )
          })
        }
        {
          d3.range(this.props.metadata.nTracks).map(n=>{
            return (
              <g>
                <foreignObject x='765' y={70+(n*23)} width='90' height='20'>
                  <select name={`track-${n}`}>
                    <option value='none'>Select</option>
                    <option value='midi-ch3'>Web Synth</option>
                    <option value='midi-ch1'>MIDI Chan</option>
                    <option value='midi-ch2'>MIDI Note</option>              
                  </select>
                </foreignObject>
                <foreignObject x='855' y={70+(n*23)} width='90' height='20'>
                  <select name={`track-${n}`}>
                    <option value=''/>
                    {
                      d3.range(16).map(n=>{
                        return (
                          <option value='midi-ch'>CH {`${n+1}`}</option>
                        )                        
                      })
                    }
                  </select>
                </foreignObject>
              </g>     
            )
          })
        }
        {
          d3.range(this.props.metadata.nSteps).map(n=>{
            return (
              <circle 
                cx={35+(n*23)} cy='188' r='4' 
                stroke='#AAA' strokeWidth='0.5' 
                fill={this.state.currentStep === n ? 'chartreuse' : 'white'}/>
            )
          })
        }
        <g transform='translate(10 300)' onClick={this.startSequencer}>
          <rect x='0' y='0' width='32' height='32'/>
        </g>   
      </g>
    )
  }
}


const Sequencer = connect(mapStateToProps,mapDispatchToProps)(ConnectedSequencer);

export default Sequencer;