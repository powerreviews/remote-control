import React from 'react';
import Header from './Header';
import DirectionalController from './DirectionalController';
import StartButton from './StartButton';
import ButtonPanel from './ButtonPanel';
import Footer from './Footer';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <DirectionalController style={{marginTop: 40, float: 'left', marginRight: 20}} />
        <div style={{marginTop: 40, float: 'rigtht'}}>
          <StartButton />
          <ButtonPanel buttons={'abcdefghijkl'.split('')} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
