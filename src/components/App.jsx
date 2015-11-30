import React from 'react';
import Radium from 'radium';
import Header from './Header';
import DirectionalController from './DirectionalController';
import ButtonPanel from './ButtonPanel';
import Footer from './Footer';

class App extends React.Component {
  styles() {
    return {
      container: {
        margin: '10vh 0'
      },
      directionalController: {
        float: 'left',
        marginRight: 20,
        height: '76vh',
        padding: '2vh',
      },
      buttonPanel: {
        height: '76vh',
        padding: '2vh'
      }
    }
  }
  render () {
    return (
      <div style={this.styles().container} >
        <Header />
        <DirectionalController style={this.styles().directionalController} />
        <ButtonPanel buttons={'abcdefghijkl'.split('')} style={this.styles().buttonPanel} />
        <Footer />
      </div>
    )
  }
}

export default Radium(App);
