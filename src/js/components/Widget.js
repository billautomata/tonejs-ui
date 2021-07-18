import SvgKnob from './subcomponents/SvgKnob'
import SynthLabel from './subcomponents/SynthLabel'
import Button from './subcomponents/Button'

const WidgetController = (props) => (
  <>
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
  </>
);

export default WidgetController;