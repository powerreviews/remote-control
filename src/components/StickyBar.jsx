import React, { PropTypes } from 'react';
import Radium from 'radium';

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
        backgroundColor: '#DDD',
        display: 'inline-block',
        height: '10vh',
        maxHeight: 40,
        margin: 0,
        left: 0,
        ...this.props.style
      },
      items: {
        display: 'inline-block',
        marginRight: 20
      }
    }
    // make the bar a top or bottom sticky bar, default to top
    styleObj.container[this.props.position.toLowerCase() || 'top'] = 0;
    return styleObj;
  }
  items() {
    if (!this.props.items) return '';
    return this.props.items.map(item => <li key={item} style={this.styles().items}>{item}</li>);
  }
  render () {
    return (
      <ul {...this.props} style={this.styles().container}>
        {this.items()}
      </ul>
    )
  }
}

export default Radium(StickyBar);
