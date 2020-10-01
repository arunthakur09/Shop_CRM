import * as types from '../actions/types';


export const initialState = {
  user:{},
}

export default function LoginReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.LOGIN_SUCCESS:
    newState.user= action && action.payload ? action.payload :{}
    return newState;

  case types.LOGIN_FAILED:
    newState.user={}
    return newState;

 default: { return state }
  }
}
