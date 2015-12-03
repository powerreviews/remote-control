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
        margin: '13vh 0'
      },
      directionalController: {
        marginRight: 20,
      },
      buttonPanel: {
        height: '76vh',
        padding: '2vh'
      }
    }
  }
  render () {
    return (
      <div>
        <Header />
        <main style={this.styles().container}>
          <DirectionalController style={this.styles().directionalController} />
          <ButtonPanel buttons={'abcdefghijkl'.split('')} style={this.styles().buttonPanel} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default Radium(App);
