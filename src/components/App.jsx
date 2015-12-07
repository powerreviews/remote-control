import React from 'react';
import Radium from 'radium';
import Header from './Header';
import DirectionalController from './DirectionalController';
import ButtonPanel from './ButtonPanel';
import Footer from './Footer';
import Counter from './Counter';

class App extends React.Component {
  styles() {
    return {
      container: {
        margin: '75px auto',
        width: '1000px',
        padding: '20px',
        boxSizing: 'border-box',
        '@media (max-width: 1090px)': {
          width: 'auto'
        }
      },
      directionalController: {
        marginRight: '20px',
      },
      buttonPanel: {
        // height: '76vh',
        // padding: '2vh'
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
          <Counter />
        </main>
        <Footer />
      </div>
    )
  }
}

export default Radium(App);
