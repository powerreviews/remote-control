import React, { PropTypes } from 'react';
import Button from './Button';
import Radium from 'radium';

class StartButton extends React.Component {
  style() {
    let pulse = Radium.keyframes({
      '0%': {backgroundColor: '#000'},
      '50%': {backgroundColor: 'green', color: 'white'},
      '100%': {backgroundColor: '#000'},
    }, 'App');
    return {
      color: 'green',
      padding: '10px 40px',
      border: 'solid 1px green',
      marginBottom: '20px',
      // animation: `${pulseKeyframes} 3s ease 0s infinite`
      ':hover': {
        animation: `${pulse} 2s ease 0s infinite`
      },
      ':active': {
        backgroundColor: 'green',
        color: 'white'
      }
    }
  }
  render () {
    return <Button {...this.props} style={this.style()}>Start</Button>
  }
}

export default StartButton;
