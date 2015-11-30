import React, { PropTypes } from 'react';
import Button from './Button';

class StartButton extends React.Component {
  render () {
    return <Button {...this.props}>Start</Button>
  }
}

export default StartButton;
