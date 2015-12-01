import React, { PropTypes } from 'react';
import StickyBar from './StickyBar';
import {setToken} from '../redux/actionCreators';
import {connect} from 'react-redux';

class Footer extends React.Component {
  constructor (props) {
    super(props);
    this._onDoubleClick = this::this._onDoubleClick;
    this.state = {
      editable: false
    }
  }
  _onDoubleClick() {
    if (this.state.editable) {
      this.props.dispatch(setToken(this.refs.device.value, this.refs.token.value));
    }
    this.setState({editable: !this.state.editable});
  }
  render () {
    let items = ['device:', this.props.device, 'token:', this.props.token];
    if (this.state.editable) {
      items[1] = <input ref="device" type="text" defaultValue={this.props.device} />;
      items[3] = <input ref="token" type="text" defaultValue={this.props.token} />;
    }
    return <StickyBar
      {...this.props}
      onDoubleClick={this._onDoubleClick}
      position="bottom"
      items={items}/>;
  }
}

function mapStateToProps(state) {
  return {
    token: state.tokenReducer.token,
    device: state.tokenReducer.device
  };
}

export default connect(mapStateToProps)(Footer);
