'use strict';
import SuperAgent from 'superagent';

let initialTokenState = {
  token: localStorage.getItem('token'),
  device: localStorage.getItem('device')
}

export function tokenReducer(state=initialTokenState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.data.token);
      localStorage.setItem('device', action.data.device);
      return {
        ...state,
        token: action.data.token,
        device: action.data.device
      };
    default:
      return state;
  };
}

export function requestReducer(state={}, action) {
  switch (action.type) {
    case 'SEND_REQUEST':
      let endpoint = `https://api.particle.io/v1/devices/${action.params.device}/${action.requestName}`.toLowerCase();
      SuperAgent
        .post(endpoint)
        .type('form')
        .send({access_token: action.params.token})
        .end((err, res) => {
          alert(JSON.stringify(res.body));
        });
      return {
        ...state,
        requestName: action.requestName.toLowerCase(),
        endpoint
      }
    default:
      return state;
  };
}
