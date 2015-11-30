import React, { PropTypes } from 'react';
import Button from './Button';

class DirectionalController extends React.Component {
  render () {
    return (
      <div style={{width: '33%', height: '100%', textAlign: 'center'}}>
        <Button> ▲ </Button>
        <div>
          <Button> ◀︎ </Button>
          <Button color="#DDD"> ✕ </Button>
          <Button> ▶︎ </Button>
        </div>
        <Button> ▼ </Button>
      </div>
    )
  }
}

export default DirectionalController;
