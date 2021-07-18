import Widget from './Widget'

const inputStyle = {
  width: '40px',
  height: '1.5em',
  fontSize: '14px',
  textAlign: 'center',
  borderRadius: 4,
  border: '0.5px solid #AAA',
  outline: 'none'
}

const LFOController = (props) => (
  <g transform={`translate(${props.position.x} ${props.position.y})`}>
    <Widget {...props}/>
    <g transform='translate(0 130)'>
      <foreignObject x='0' y='0' width='50' height='30'>
        <div style={{padding: 1}}>
          <input style={inputStyle}/>
        </div>
      </foreignObject>
      <text x='23' y='-7.5' textAnchor='middle' fontSize='12' fontWeight='100' dy='0.33em'>MIN</text>
    </g>
    <g transform='translate(50 130)'>
      <foreignObject x='0' y='0' width='50' height='30'>
        <div style={{padding: 1}}>
          <input style={inputStyle}/>
        </div>
      </foreignObject>
      <text x='23' y='-7.5' textAnchor='middle' fontSize='12' fontWeight='100' dy='0.33em'>MAX</text>
    </g>
  </g> 
);

export default LFOController;