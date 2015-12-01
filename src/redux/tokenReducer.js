'use strict';

function tokenReducer(state={}, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.data.token,
        device: action.data.device
      };
    default:
      return state;
  };
}

export default tokenReducer;
