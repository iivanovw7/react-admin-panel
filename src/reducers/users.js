import * as types from '../constants/ActionTypes';



export default function (state = [], action) {


  switch (action.type) {

    case types.FETCH_USERS:

      return [ action.payload.data, ...state ];
  }

  return state;
}