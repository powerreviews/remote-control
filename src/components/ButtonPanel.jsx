import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = this::this.buttons;
  }
  styles()  {
    return {
      padding: '8px 16px'
    }
  }
  buttons() {
    if (!this.props.buttons) return '';
    return this.props.buttons.map(button => <Button key={button} style={this.styles()}>{button}</Button>)
  }
  render () {
    return (
      <div>
        {this.buttons()}
      </div>
    )
  }
}

export default Radium(ButtonPanel);
