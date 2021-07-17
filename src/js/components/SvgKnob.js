import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import { changeKnob } from "../actions/index";

const mapStateToProps = (state, ownProps) => {
  return { 
    knobValue: state.synths.filter(o=>{return o.id === ownProps.synthID})[0].knobs.filter(o=>{ return o.id === ownProps.id })[0].value,
    knobId: ownProps.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeKnob: payload => dispatch(changeKnob(payload))
  }
}

const sliderSettings = {
  track: {
    width: 5,
    height: 100,
    fill: '#DDD',
    stroke: '#AAA'
  },
  handle: {
    width: 20,
    height: 10,
    fill: '#666',
    rx: 3
  },
  textValue: {
    width: 30,
    height: 20,
    heightOffset: 6,
    fill: 'none',
    stroke: '#AAA',
    rx: 2,
    fontSize: 12,
    fontFill: '#333',
    fontWeight: 100
  },
  textLabel: {
    fontSize: 14,
    fontFill: '#333',
    fontWeight: 700,
    heightOffset: -8
  }
}


export class ConnectedKnob extends React.Component {
  
  constructor(props) {
    super(props)
    this.circleRef = React.createRef()
    this.textRef = React.createRef()
    this.scaleIndicatorCircle = d3.scaleLinear().domain([0,100]).range([-130,130])
    this.scaleIndicatorSlider = d3.scaleLinear().domain([0,100]).range([100,0])
    this.scaleDisplayValue = d3.scaleLinear().domain([0,100]).range(this.props.outputRange)
  }

  componentDidMount () {    
    const self = this
    function dragged (event) {
      window.document.body.style.cursor = 'pointer'
      self.props.changeKnob({ 
        synthID: self.props.synthID, 
        id: self.props.id, 
        value: self.props.knobValue - event.dy,
        scaleAttribute: self.scaleDisplayValue,
        attribute: self.props.attribute
      })
    }
    const dragHandler = d3.drag()
      .on('drag', dragged)
      .on('end', ()=>{ window.document.body.style.cursor = 'auto' })    
    dragHandler(d3.select(this.circleRef.current))
  }

  componentDidUpdate () {
    console.log('update')
  }

  render () {
    return (      
      <>
        <g transform={`translate(${this.props.position.x} ${this.props.position.y})`} 
          onDoubleClick={
            ()=>{
              this.props.changeKnob({ 
                synthID: this.props.synthID, 
                id: this.props.id, 
                value: this.props.defaultValue,
                scaleAttribute: this.scaleDisplayValue,
                attribute: this.props.attribute
              })              
            }
          }>
          {
            (()=>{
              if (this.props.knobType === 'slider') {
                return (
                  <Slider 
                    label={this.props.name} 
                    knobValue={this.props.knobValue} 
                    scaleFn={this.scaleIndicatorSlider} 
                    scaleOutput={this.scaleDisplayValue} 
                    reference={this.circleRef} 
                    textReference={this.textRef}
                  />
                )
              } else if (this.props.knobType === 'circle') {
                return (
                  <Knob 
                    label={this.props.name}
                    knobValue={this.props.knobValue} 
                    scaleFn={this.scaleIndicatorCircle} 
                    scaleOutput={this.scaleDisplayValue}
                    reference={this.circleRef} 
                    textReference={this.textRef}
                  />
                )
              }  
            })()
          }
        </g>
      </>
    )
  }
}

const Slider = ({ knobValue, scaleFn, reference, textReference, label, scaleOutput }) => (
  <g transform={`translate(${0} ${-sliderSettings.track.height*0.5})`}>
    <text x='0' y={sliderSettings.textLabel.heightOffset} fontSize={sliderSettings.textLabel.fontSize} fill={sliderSettings.textLabel.fontFill} fontWeight={sliderSettings.textLabel.fontWeight} textAnchor='middle' style={{userSelect: 'none', pointerEvents: 'none'}}>{label}</text>
    <rect x={-sliderSettings.track.width*0.5} y='0' width={sliderSettings.track.width} height={sliderSettings.track.height} fill={sliderSettings.track.fill} stroke={sliderSettings.track.stroke}/>
    <rect ref={reference} x={-sliderSettings.handle.width*0.5} y={scaleFn(knobValue)-(sliderSettings.handle.height*0.5)} width={sliderSettings.handle.width} height={sliderSettings.handle.height} fill={sliderSettings.handle.fill} rx={sliderSettings.handle.rx} ry={sliderSettings.handle.rx} style={{cursor: 'pointer'}}/>
    <g transform={`translate(${-sliderSettings.textValue.width*0.5} ${sliderSettings.track.height + sliderSettings.textValue.heightOffset})`}>
      <rect x='0' y='0' width={sliderSettings.textValue.width} height={sliderSettings.textValue.height} fill={sliderSettings.textValue.fill} stroke={sliderSettings.textValue.stroke} rx={sliderSettings.textValue.rx}/>
      <text ref={textReference} x={sliderSettings.textValue.width*0.5} y={sliderSettings.textValue.height*0.5} dy='0.33em' 
        fill={sliderSettings.textValue.fontFill} textAnchor='middle' fontSize={sliderSettings.textValue.fontSize}
        fontWeight={sliderSettings.textValue.fontWeight}
        style={{userSelect: 'none', pointerEvents: 'none'}}>{scaleOutput(knobValue).toFixed(1)}</text>
    </g>
  </g>
)

const Knob = ({ knobValue, scaleFn, reference, textReference, label, scaleOutput }) => (
  <g>
    <text x='0' y={sliderSettings.textLabel.heightOffset-25} fontSize={sliderSettings.textLabel.fontSize} fill={sliderSettings.textLabel.fontFill} fontWeight={sliderSettings.textLabel.fontWeight} textAnchor='middle' style={{userSelect: 'none', pointerEvents: 'none'}}>{label}</text>
    <circle ref={reference} cx='0' cy='0' r='20' fill='#777' stroke='#333'/>
    <circle ref={reference} cx='0' cy='0' r='14' fill='#DDD'/>
    <line x1='0' y1='-15' x2='0' y2='-18' strokeWidth='5' strokeLinecap='round' transform={`rotate(${scaleFn(knobValue)})`} stroke='#DDD'/>
    {d3.range(0,100.01,10).map(n=>{
      const length = n === 0 || n === 100 || n === 50 ? -29 : -25
      return (
        <line key={n} x1='0' y1='-20' x2='0' y2={length} strokeWidth='1' transform={`rotate(${scaleFn(n)})`} stroke='#333'/>
      )      
    })}
    <g transform={`translate(${-sliderSettings.textValue.width*0.5} ${sliderSettings.textValue.heightOffset+20})`}>
      <rect x='0' y='0' width={sliderSettings.textValue.width} height={sliderSettings.textValue.height} fill={sliderSettings.textValue.fill} stroke={sliderSettings.textValue.stroke} rx={sliderSettings.textValue.rx}/>
      <text ref={textReference} x={sliderSettings.textValue.width*0.5} y={sliderSettings.textValue.height*0.5} dy='0.33em' 
        fill={sliderSettings.textValue.fontFill} textAnchor='middle' fontSize={sliderSettings.textValue.fontSize}
        fontWeight={sliderSettings.textValue.fontWeight}
        style={{userSelect: 'none', pointerEvents: 'none'}}>{scaleOutput(knobValue).toFixed(1)}</text>
    </g>    
  </g>
)

const SvgKnob = connect(mapStateToProps, mapDispatchToProps)(ConnectedKnob);

export default SvgKnob;