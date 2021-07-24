import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import * as Tone from 'tone'
import WebMidi from "webmidi"
import Widget from './Widget'

const mapStateToProps = (state, ownProps) => {
  const synth = state.synths.filter(o=>{ return o.id === ownProps.id })[0]
  return {    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // notePressed: payload => dispatch(notePressed(payload))
  }
}

export class ConnectedMidiConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputs: [],
      outputs: []
    }
    this.scaleTrackNames = d3.scaleOrdinal(['A','B'])
  }

  componentDidMount () {
    console.log('midi config mounted', this.props)
    WebMidi.enable((err)=>{
      if(err) {
        return console.log('midi enable failed')
      }
      console.log(WebMidi.inputs)
      console.log(WebMidi.outputs)
      this.setState({
        inputs: WebMidi.inputs.map((input,idx)=>{ return { index: idx, name: `${input.manufacturer} ${input.name}` } }),
        outputs: WebMidi.outputs.map((output,idx)=>{ return { index: idx, name: `${output.manufacturer} ${output.name}` } })
      })
    })
  }
  componentDidUpdate () {
  }

  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
        <Widget {...this.props}/>
        {
          d3.range(2).map(n=>{
            return (
              <g transform={`translate(28 ${28+(n*24)})`}>
                <text x='-5' y='10' dy='.33em' fontSize='12' textAnchor='end'>{this.scaleTrackNames(n)}</text>
                <foreignObject x='0' y='0' width='200' height='20'>
                  <select name={`midi-inputs`} style={{ width: 196 }} onChange={(event)=>{ console.log(event.nativeEvent.target.value) }}>
                    <option value='none'>Select</option>
                    {
                      this.state.inputs.map(input=>{
                        return (
                          <option value={`index_${input.index}`}>{input.name}</option>
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
          d3.range(2).map(n=>{
            return (
              <g transform={`translate(28 ${112+(n*24)})`}>
                <text x='-5' y='10' dy='.33em' fontSize='12' textAnchor='end'>{this.scaleTrackNames(n)}</text>
                <foreignObject x='0' y='0' width='200' height='20'>
                  <select name={`midi-inputs`} style={{ width: 196 }}>
                    <option value='none'>Select</option>
                    {
                      this.state.inputs.map(input=>{
                        return (
                          <option value={`index_${input.index}`}>{input.name}</option>
                        )
                      })
                    }                            
                  </select>
                </foreignObject>
              </g>
            )
          })          
        }        
      </g>
    )
  }
}


const MidiConfig = connect(mapStateToProps,mapDispatchToProps)(ConnectedMidiConfig);

export default MidiConfig;