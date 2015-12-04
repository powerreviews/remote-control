'use strict';
import SuperAgent from 'superagent';

export function setToken(device, token) {
  return {
    type: 'SET_TOKEN',
    data: {
      device,
      token
    }
  };
}

export function sendRequest(requestName, params) {
  return {
    type: 'SEND_REQUEST',
    requestName,
    params
  }
}

export function receiveResponse(response) {
  return {
    type: 'RECEIVE_RESPONSE',
    response,
  }
}

export function makeRequest(requestName, params) {
  return function (dispatch) {
    dispatch(sendRequest(requestName, params))
    let endpoint = `https://api.particle.io/v1/devices/${params.device}/${requestName}`.toLowerCase();
    return (
      SuperAgent
        .post(endpoint)
        .type('form')
        .send({access_token: params.token})
        .end((err, res) => {
          dispatch(receiveResponse(res.body));
        })
    );
  }
}
