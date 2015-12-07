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
        backgroundColor: 'white',
        borderRadius: '100px',
        position: 'relative',
        // '@media (min-width: 1090px)': {
        //   fontSize: '290%',
        //   width: '400px',
        //   borderRadius: '230px'
        // }
      }
    }
  }
  render () {
    // <span style={{zIndex: '-1', position: 'absolute', left: '-22px', fontSize: '200%', top: '-22px'}}>⚫</span>
    return (
      <div {...this.props} style={{width: 'auto', marginBottom: '15px', position: 'relative'}}>
        <div style={this.styles().container}>
          <SensorButtons />
          <Button requestName="up" style={this.styles().buttons}><span>▲</span></Button>
          <div>
            <Button requestName="left" style={this.styles().buttons}> ◀︎ </Button>
            <div style={this.styles().closeButtonContainer}>
              <Button requestName="x" style={this.styles().buttons}><span style={{fontSize: '80%',position: 'relative', zIndex: '1', color: 'white', ':active': {color: 'red'} }}>╳</span></Button>
            </div>
            <Button requestName="right" style={this.styles().buttons}> ▶︎ </Button>
          </div>
          <Button requestName="down" style={this.styles().buttons}> ▼ </Button>
        </div>
      </div>
    )
  }
}

export default Radium(DirectionalController);
