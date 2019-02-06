import * as types from '../constants/ActionTypes'

export default function(state={}, action) {
  switch(action.type) {
    case types.REGISTRATION_SUCCESS:
      return { ...state, success: action.payload };
    case types.REGISTRATION_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}