import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';
import SensorButtons from './SensorButtons';

class DirectionalController extends React.Component {
  styles() {
    return {
      buttons: {
        fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
        padding: '10px 14px'
      },
      closeButtonContainer: {
        display: 'inline-block',
        background: 'black',
        borderRadius: '40px',
        padding: '10px'
      },
      container: {
        textAlign: 'center',
        width: '203px',
        margin: 'auto',
        float: 'left',
        backgroundColor: 'white',
        borderRadius: '100px',
        position: 'relative',
        '@media (max-width: 768px)': {
          width: '203px',
          float: 'none',
          margin: 'auto'
        }
      }
    }
  }
  render () {
    // <span style={{zIndex: '-1', position: 'absolute', left: '-22px', fontSize: '200%', top: '-22px'}}>⚫</span>
    return (
      <div {...this.props} style={{width: 'auto', marginBottom: '15px', position: 'relative'}}>
        <div style={this.styles().container}>
          <SensorButtons />
          <Button style={this.styles().buttons}><span>▲</span></Button>
          <div>
            <Button style={this.styles().buttons}> ◀︎ </Button>
            <div style={this.styles().closeButtonContainer}>
              <Button style={this.styles().buttons}><span style={{fontSize: '80%',position: 'relative', zIndex: '1', color: 'white', ':active': {color: 'red'} }}>╳</span></Button>
            </div>
            <Button style={this.styles().buttons}> ▶︎ </Button>
          </div>
          <Button style={this.styles().buttons}> ▼ </Button>
        </div>
      </div>
    )
  }
}

export default Radium(DirectionalController);
