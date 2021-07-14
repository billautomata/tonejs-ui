import SvgKnob from './SvgKnob'
import SynthLabel from './SynthLabel'

const MonoSynthController = (props) => (
  <g transform={`translate(${props.position.x} ${props.position.y})`}>
    {props.labels.map(label=>{
      return (
        <SynthLabel {...label}/>
      )
    })}
    {props.knobs.map(knob=>{
      return (
        <SvgKnob {...knob} synthID={props.id}/>
      )
    })}
  </g>
);

export default MonoSynthController;