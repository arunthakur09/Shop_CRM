import * as types from '../actions/types';

export const initialState = {
  pickroutes: [],
  routehistory: []
}

export default function PickuprouteReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_PICKROUTES_DETAIL_SUCCESS:
    newState.pickroutes= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_PICKROUTES_DETAIL_FAILED:
    newState.pickroutes=[]
    return newState;

    case types.GET_ROUTEHISTORY_DETAIL_SUCCESS:
      newState.routehistory= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_ROUTEHISTORY_DETAIL_FAILED:
      newState.routehistory=[]
      return newState;

    case types.DELETE_PICKROUTES_DETAIL_SUCCESS:
      let paymentsData = newState.pickroutes.slice()
      paymentsData && paymentsData.length > 0 && paymentsData.forEach((item, index) => {
        if (item.id === action.payload) {
          paymentsData.splice(index, 1)
        }
      })
      newState.pickroutes = paymentsData || []
      return newState;

    case types.DELETE_PICKROUTES_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
