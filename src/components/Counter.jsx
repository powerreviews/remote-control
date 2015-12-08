import React from 'react';
import Radium from 'radium';
import Button from './Button';
import {connect} from 'react-redux';

class Counter extends React.Component {
  styles() {
    return {
      container: {
        textAlign: 'left',
        color: '#fff',
        width: '100%',
        padding: '0 25px 0'
      }
    }
  }
  render () {
    return (
      <div style={this.styles().container}>
        <h2 dangerouslySetInnerHTML={{__html: `Requests made: ${this.props.requestCount}`}}></h2>
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
