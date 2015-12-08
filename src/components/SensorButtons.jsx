import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

class SensorButtons extends React.Component {
  styles() {
    let styleObj = {
      button: {
        position: 'absolute',
        padding: '8px 8px',
        cursor: 'pointer',
        background: 'transparent',
        border: 'solid 1px white',
        fontSize: '14px',
        ':hover': {
          backgroundColor: 'white'
        }
      }
    }
    styleObj.sensor1 = {
      color: '#E61C05',
      left: '-75px',
      top: '25%',
      // border: '1px solid',
      ...styleObj.button
    },
    styleObj.sensor2 = {
      color: '#0A6EF0',
      // border: '1px solid',
      left: '-30px',
      top: '-20px',
      ...styleObj.button
    },
    styleObj.sensor3 = {
      color: '#0F8755',
      // border: '1px solid',
      right: '-35px',
      top: '-20px',
      ...styleObj.button
    },
    styleObj.sensor4 = {
      color: '#91720A',
      right: '-75px',
      top: '25%',
      // border: '1px solid',
      ...styleObj.button
    }
    styleObj.sensor5 = {
      color: 'pink',
      left: 65,
      top: '-50px',
      // border: '1px solid',
      ...styleObj.button
    }
    return styleObj
  }
  render () {
    // <span style={{zIndex: '-1', position: 'absolute', left: '-22px', fontSize: '200%', top: '-22px'}}>⚫</span>
    return (
      <div>
        <Button requestName="read1" style={this.styles().sensor1}>read 1</Button>
        <Button requestName="echo1" style={this.styles().sensor2}>echo 1</Button>
        <Button style={this.styles().sensor5}>heading</Button>
        <Button requestName="echo2" style={this.styles().sensor3}>echo 2</Button>
        <Button requestName="read2" style={this.styles().sensor4}>read 2</Button>
      </div>
    )
  }
}

export default Radium(SensorButtons);
