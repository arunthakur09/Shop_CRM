import * as types from '../actions/types';


export const initialState = {
  routes:[],
  routesbyid:[]
}

export default function RoutesReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_ROUTES_DETAIL_SUCCESS:
    newState.routes= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_ROUTES_DETAIL_FAILED:
    newState.routes=[]
    return newState;

    case types.GET_ROUTESBYID_DETAIL_SUCCESS:
      newState.routesbyid= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_ROUTESBYID_DETAIL_FAILED:
      newState.routesbyid=[]
      return newState;

    case types.DELETE_ROUTES_DETAIL_SUCCESS:
     let  routesData = newState.routes.slice()
     routesData && routesData.length > 0 && routesData.forEach((item ,index) => {
       if(item.id === action.payload){
        routesData.splice(index, 1)
       }
     })
      
    newState.routes= routesData|| []
    return newState;

  case types.DELETE_ROUTES_DETAIL_FAILED:
    return newState;

 default: { return state }
  }
}
