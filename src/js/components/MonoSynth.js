import Button from './Button'
import SvgKnob from './SvgKnob'
import SynthLabel from './SynthLabel'

const MonoSynthController = (props) => (
  <g transform={`translate(${props.position.x} ${props.position.y})`}>
    {props.labels.map((label,idx)=>{
      return (
        <SynthLabel {...label} key={`synth_${props.id}_label_${idx}`}/>
      )
    })}
    {props.knobs.map((knob,idx)=>{
      return (
        <SvgKnob {...knob} synthID={props.id} key={`synth_${props.id}_knob_${idx}`}/>
      )
    })}
    {props.buttons.map((button,idx)=>{
      return (
        <Button {...button} synthID={props.id} key={`synth_${props.id}_button_${idx}`}/>
      )
    })}
  </g>
);

export default MonoSynthController;