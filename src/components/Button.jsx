import React, { PropTypes } from 'react'
import Radium from 'radium'

class Button extends React.Component {
  styles() {
    return {
      padding: '2px 6px',
      border: 'solid 1px #AAA',
      borderRadius: 4,
      fontSize: '220%',
      cursor: 'pointer',
      backgroundColor: this.props.color || 'transparent',
      ':hover': {
        backgroundColor: '#CCC'
      },
      ...this.props.style
    };
  }
  render () {
    return (
      <button {...this.props} style={this.styles()}>
        {this.props.children}
      </button>
    )
  }
}

export default Radium(Button);
