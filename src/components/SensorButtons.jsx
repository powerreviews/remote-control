import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

class SensorButtons extends React.Component {
  styles() {
    let styleObj = {
      button: {
        position: 'absolute',
        padding: '6px 14px',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        fontSize: '14px'
      }
    }
    styleObj.sensor1 = {
      color: 'red',
      left: '-75px',
      top: '50%',
      // border: '1px solid',
      ...styleObj.button
    },
    styleObj.sensor2 = {
      color: 'lightblue',
      // border: '1px solid',
      left: '-30px',
      top: '-20px',
      ...styleObj.button
    },
    styleObj.sensor3 = {
      color: 'green',
      // border: '1px solid',
      right: '-35px',
      top: '-20px',
      ...styleObj.button
    },
    styleObj.sensor4 = {
      color: 'yellow',
      right: '-75px',
      top: '50%',
      // border: '1px solid',
      ...styleObj.button
    }
    return styleObj
  }
  render () {
    // <span style={{zIndex: '-1', position: 'absolute', left: '-22px', fontSize: '200%', top: '-22px'}}>⚫</span>
    return (
      <div>
        <button style={this.styles().sensor1}>One</button>
        <button style={this.styles().sensor2}>Two</button>
        <button style={this.styles().sensor3}>Three</button>
        <button style={this.styles().sensor4}>Four</button>
      </div>
    )
  }
}

export default Radium(SensorButtons);
