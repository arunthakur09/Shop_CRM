import * as types from '../actions/types';


export const initialState = {
  pickups:[],
}

export default function PickupHistoryReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_PICKUPHISTORY_DETAIL_SUCCESS:
    newState.pickups= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_PICKUPHISTORY_DETAIL_FAILED:
    newState.pickups=[]
    return newState;

 default: { return state }
  }
}
