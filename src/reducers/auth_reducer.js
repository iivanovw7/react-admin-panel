import * as types from '../constants/ActionTypes'

export default function(state={}, action) {
  switch(action.type) {
    case types.AUTHENTICATED:
      return { ...state, authenticated: true };
    case types.UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case types.AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}
