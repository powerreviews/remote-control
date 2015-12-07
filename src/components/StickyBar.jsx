import React, { PropTypes } from 'react';
import Radium from 'radium';
import Counter from './Counter';

class StickyBar extends React.Component {
  constructor(props){
    super(props);
    this.items = this::this.items;
  }
  styles() {
    let styleObj =  {
      container: {
        position: 'fixed',
        width: '100%',
        backgroundColor: '#222',
        color: '#fff',
        margin: 0,
        left: 0,
        zIndex: '1000',
        ...this.props.style
      },
      list: {
        padding: '0 15px 0'
      },
      items: {
        display: 'inline-block',
        marginRight: 20,
        // '@media (max-width: 500px)': {
        //   display: 'block',
        //   marginBottom: '10px',
        //   textAlign: 'left'
        // }
      }
    }
    // make the bar a top or bottom sticky bar, default to top
    styleObj.container[this.props.position.toLowerCase() || 'top'] = 0;
    return styleObj;
  }
  items() {
    if (!this.props.items) return '';
    return this.props.items.map((item, i) => <li key={i} style={this.styles().items}>{item}</li>);
  }
  render () {
    let counter = '';
    if (this.props.type === 'footer') {
      counter = <Counter />
    }
    return (
      <div style={this.styles().container}>
        {counter}
        <ul style={this.styles().list} {...this.props}>
          {this.items()}
        </ul>
      </div>
    )
  }
}

export default Radium(StickyBar);
