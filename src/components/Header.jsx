import React, { PropTypes } from 'react';
import StickyBar from './StickyBar';
import {connect} from 'react-redux';

class Header extends React.Component {
  styles() {
    return {
      headline:  {
        color: 'yellow'
      }
    }
  }
  render () {
    let items = [
      <span style={this.styles().headline}>request:</span>,
      this.props.requestName,
      <span style={this.styles().headline}>request:</span>,
      this.props.response
    ]
    if (this.props.requestInProgress) {
      items[3] = 'pending...'
    }
    return <StickyBar
      {...this.props}
      position="top"
      type="header"
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
