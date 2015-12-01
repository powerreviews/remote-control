import React, { PropTypes } from 'react'
import Radium from 'radium'

class Button extends React.Component {
  styles() {
    return {
      padding: '2px 6px',
      borderRadius: 4,
      fontSize: '220%',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      ':hover': {
        backgroundColor: 'transparent'
      },
      ':active': {
        color: 'green',
        outline: 'none'
      },
      ':focus': {
        outline: 'none'
      },
      '@media (min-width: 769px)': {
        fontSize: '220%'
      },
      ...this.props.style
    }
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
