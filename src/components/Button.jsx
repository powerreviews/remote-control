import React, { PropTypes } from 'react'
import Radium from 'radium'
// flux
import {sendRequest} from '../redux/actionCreators'
import { connect } from 'react-redux'

class Button extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this::this._onClick
  }
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
  _onClick() {
    let requestName = this.props.requestName || this.props.children;
    this.props.dispatch(sendRequest(requestName))
  }
  render () {
    return (
      <button onClick={this._onClick} {...this.props} style={this.styles()}>
        {this.props.children}
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Button);
