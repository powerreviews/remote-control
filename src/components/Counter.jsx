import React from 'react';
import Radium from 'radium';
import Button from './Button';
import {connect} from 'react-redux';

class Counter extends React.Component {
  styles() {
    return {
      container: {
        textAlign: 'right',
        color: '#fff'
      }
    }
  }
  render () {
    return (
      <div style={this.styles().container}>
        <h2 dangerouslySetInnerHTML={{__html: this.props.requestCount}}></h2>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requestCount: state.requestCountReducer
  }
}

export default connect(mapStateToProps)(Counter);
