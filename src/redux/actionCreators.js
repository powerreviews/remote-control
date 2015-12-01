'use strict';

export function setToken(device, token) {
  return {
    type: 'SET_TOKEN',
    data: {
      device: device,
      token: token
    }
  };
}
