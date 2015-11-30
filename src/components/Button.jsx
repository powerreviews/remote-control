import React, { PropTypes } from 'react'
import Radium from 'radium'

class Button extends React.Component {
  styles() {
    return {
      button: {
        padding: '2px 6px',
        border: 0,
        fontSize: '220%',
        cursor: 'pointer',
        backgroundColor: this.props.color || 'transparent',
        ':hover': {
          backgroundColor: '#CCC'
        }
      },
      link: {

      }
    };
  }
  render () {
    return (
      <a href={this.props.to || '#'} style={this.styles().link}>
        <button style={this.styles().button}>
          {this.props.children}
        </button>
      </a>
    )
  }
}

export default Radium(Button);
