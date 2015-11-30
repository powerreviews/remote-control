import React, { PropTypes } from 'react';
import StickyBar from './StickyBar';

class Header extends React.Component {
  render () {
    return <StickyBar
      {...this.props}
      position="top"
      items={['status:', this.props.status]}/>;
  }
}

export default Header;
