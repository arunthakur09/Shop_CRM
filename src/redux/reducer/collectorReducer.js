import * as types from '../actions/types';


export const initialState = {
  collector:[],
  collectorid:[],
}

export default function CollectorReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_COLLECTOR_DETAIL_SUCCESS:
    newState.collector= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_COLLECTOR_DETAIL_FAILED:
    newState.collector=[]
    return newState;
    
  case types.GET_COLLECTORBYID_DETAIL_SUCCESS:
    newState.collectorid= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_COLLECTORBYID_DETAIL_FAILED:
    newState.collectorid=[]
    return newState;

    case types.DELETE_COLLECTOR_DETAIL_SUCCESS:
     let  collectorData = newState.collector.slice()
     collectorData && collectorData.length > 0 && collectorData.forEach((item ,index) => {
       if(item.id === action.payload){
        collectorData.splice(index, 1)
       }
     })
      
    newState.collector= collectorData|| []
    return newState;

  case types.DELETE_COLLECTOR_DETAIL_FAILED:
    return newState;

 default: { return state }
  }
}
