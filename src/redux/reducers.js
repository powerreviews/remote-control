'use strict';

let initialTokenState = {
  token: localStorage.getItem('token'),
  device: localStorage.getItem('device')
}

export function tokenReducer(state=initialTokenState, action) {
  switch (action.type) {
    case "SET_TOKEN":
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
    case 'MAKE_REQUEST':
      return {
        ...state,
        requestName: action.requestName.toLowerCase()
      }
    default:
      return state;
  };
}
