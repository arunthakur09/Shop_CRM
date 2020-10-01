import * as types from '../actions/types';

export const initialState = {
  servicerequests:[],
  servicerequestsbyid:[],
}

export default function ServiceRequestReducer(state = initialState, action) {
  let newState = { ...state }
  
  switch (action.type) {
    case types.GET_SERVICEREQUESTS_DETAIL_SUCCESS:
      newState.servicerequests= action && action.payload ? action.payload :[]
      return newState;

    case types.GET_SERVICEREQUESTS_DETAIL_FAILED:
      newState.servicerequests=[]
      return newState;

    case types.GET_SERVICEREQUESTSBYID_DETAIL_SUCCESS:
      newState.servicerequestsbyid= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_SERVICEREQUESTSBYID_DETAIL_FAILED:
      newState.servicerequestsbyid=[]
      return newState;

    case types.CLOSE_SERVICEREQUESTS_DETAIL_SUCCESS:
      let servicerequestData = newState.servicerequests.slice()
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      date=[year, month, day].join('-')
      
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2) 
        day = '0' + day;
      servicerequestData && servicerequestData.length > 0 && servicerequestData.forEach((item) => {
        if (item.id === action.payload) {
          item.status = 1;
          item.close_date = date+'T';
        }
      })
      newState.servicerequests = servicerequestData || []
      return newState;

    case types.CLOSE_SERVICEREQUESTS_DETAIL_FAILED:
      return newState;

    case types.DELETE_SERVICEREQUESTS_DETAIL_SUCCESS:
      let servicerequestsData = newState.servicerequests.slice()
      servicerequestsData && servicerequestsData.length > 0 && servicerequestsData.forEach((item, index) => {
        if (item.id === action.payload) {
          servicerequestsData.splice(index, 1)
        }
      })
      newState.servicerequests = servicerequestsData || []
      return newState;

    case types.DELETE_SERVICEREQUESTS_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
