import React from 'react';
import Radium from 'radium';
import Header from './Header';
import DirectionalController from './DirectionalController';
import ButtonPanel from './ButtonPanel';
import Footer from './Footer';

class App extends React.Component {
  render () {
    return (
      <div style={{margin: '10vh 0'}}>
        <Header />
        <DirectionalController style={{float: 'left', marginRight: 20, height: '76vh', padding: '2vh', display: 'table-cell'}} />
        <ButtonPanel buttons={'abcdefghijkl'.split('')} style={{height: '76vh', padding: '2vh'}}/>
        <Footer />
      </div>
    )
  }
}

export default Radium(App);
