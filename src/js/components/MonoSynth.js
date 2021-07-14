import SvgKnob from './SvgKnob'

const MonoSynthController = (props) => (
  <g transform={`translate(${props.position.x} ${props.position.y})`}>
    <text>Mono Synth</text>
    {props.knobs.map(knob=>{
      return (
        <SvgKnob {...knob} synthID={props.id}/>
      )
    })}
  </g>
);

export default MonoSynthController;