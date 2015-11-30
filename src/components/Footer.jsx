import React, { PropTypes } from 'react';
import StickyBar from './StickyBar';

class Footer extends React.Component {
  render () {
    return <StickyBar
      position="bottom"
      items={['device:', this.props.device, 'token:', this.props.token]}/>;
  }
}

export default Footer;
