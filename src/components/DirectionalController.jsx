import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

class DirectionalController extends React.Component {
  styles() {
    return {
      buttons: {
        fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
        padding: '2px 6px'
      },
      container: {
        textAlign: 'center',
        ...this.props.style
      }
    }
  }
  render () {
    return (
      <div {...this.props} style={this.styles().container}>
        <Button style={this.styles().buttons}> ▲ </Button>
        <div>
          <Button style={this.styles().buttons}> ◀︎ </Button>
          <Button color="#DDD" style={this.styles().buttons}> ✕ </Button>
          <Button style={this.styles().buttons}> ▶︎ </Button>
        </div>
        <Button style={this.styles().buttons}> ▼ </Button>
      </div>
    )
  }
}

export default Radium(DirectionalController);
