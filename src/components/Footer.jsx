import React, { PropTypes } from 'react';
import StickyBar from './StickyBar';
import {setToken} from '../redux/actionCreators';
import {connect} from 'react-redux';

class Footer extends React.Component {
  constructor (props) {
    super(props);
    this.toggleEditable = this::this.toggleEditable;
    this._onKeyPress = this::this._onKeyPress;
    this.state = {
      editable: false
    }
  }
  styles() {
    return {
      clickable: {
        cursor: 'pointer',
        padding: '10px',
        color: 'yellow',
        ':hover': {
          backgroundColor: '#AAA'
        }
      }
    };
  }
  toggleEditable() {
    if (this.state.editable) {
      this.props.dispatch(setToken(this.refs.device.value, this.refs.token.value));
    }
    this.setState({editable: !this.state.editable});
  }
  _onKeyPress(e) {
    if (e.keyCode == 13 || e.keyCode == '27') {
      this.toggleEditable();
    }
  }
  render() {
    let items = [
      <span key={'device'} style={this.styles().clickable} onClick={this.toggleEditable}>device:</span>,
      this.props.device,
      <span key={'token'} style={this.styles().clickable} onClick={this.toggleEditable}>token:</span>,
      this.props.token
    ];
    if (this.state.editable) {
      items[1] = <input ref="device" type="text" defaultValue={this.props.device} onKeyDown={this._onKeyPress} />;
      items[3] = <input ref="token" type="text" defaultValue={this.props.token} onKeyDown={this._onKeyPress} />;
      items.push(<button style={this.styles().clickable} onClick={this.toggleEditable}>Save</button>)
    }
    return <StickyBar
        {...this.props}
        position="bottom"
        type="footer"
        items={items} />;
  }
}

function mapStateToProps(state) {
  return {
    token: state.tokenReducer.token,
    device: state.tokenReducer.device
  };
}

export default connect(mapStateToProps)(Footer);
