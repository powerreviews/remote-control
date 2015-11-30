import React from 'react';
import Header from './Header';
import DirectionalController from './DirectionalController';
import Footer from './Footer';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div>
          <DirectionalController />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
