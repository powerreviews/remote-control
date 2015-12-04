import React, { PropTypes } from 'react';
import StickyBar from './StickyBar';
import {connect} from 'react-redux';

class Header extends React.Component {
  render () {
    let items = [
      'request:',
      this.props.requestName,
      'response:',
      this.props.response
    ]
    if (this.props.requestInProgress) {
      items[3] = 'pending...'
    }
    return <StickyBar
      {...this.props}
      position="top"
      items={items} />;
  }
}

function mapStateToProps(state) {
  return {
    requestName: state.requestReducer.requestName,
    requestInProgress: state.requestReducer.inProgress,
    response: state.responseReducer.response,
  }
}

export default connect(mapStateToProps)(Header);
