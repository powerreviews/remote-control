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
