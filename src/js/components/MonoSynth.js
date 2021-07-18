import Widget from './Widget'

const MonoSynthController = (props) => (
  <g transform={`translate(${props.position.x} ${props.position.y})`}>
    <Widget {...props}/>
  </g>
);

export default MonoSynthController;