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
      return {
        ...state,
        requestName: action.requestName.toLowerCase(),
        inProgress: true
      }
    case 'RECEIVE_RESPONSE':
      return {
        ...state,
        inProgress: false
      }
    default:
      return state;
  };
}

export function responseReducer(state={}, action) {
  switch (action.type) {
    case 'RECEIVE_RESPONSE':
      return {
        ...state,
        response: JSON.stringify(action.response)
      }
    default:
      return state;
  }
}

export function requestCountReducer(state = 0, action) {
  switch (action.type) {
    case 'SEND_REQUEST':
      if (action.requestName.toString() === 'Start') return state
  		return state + 1;
  	default:
  		return state;
  }
}
