import * as types from '../actions/types';

export const initialState = {
  customer: [],
  customerid: [],
}

export default function CustomerReducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case types.GET_CUSTOMER_DETAIL_SUCCESS:
      newState.customer = action && action.payload ? action.payload : []
      return newState;

    case types.GET_CUSTOMER_DETAIL_FAILED:
      newState.customer = []
      return newState;
      
      case types.GET_CUSTOMERBYID_DETAIL_SUCCESS:
        newState.customerid = action && action.payload ? action.payload : []
        return newState;
  
      case types.GET_CUSTOMERBYID_DETAIL_FAILED:
        newState.customerid = []
        return newState;

    case types.DELETE_CUSTOMER_DETAIL_SUCCESS:
      let customerData = newState.customer.slice()
      customerData && customerData.length > 0 && customerData.forEach((item, index) => {
        if (item.id === action.payload) {
          customerData.splice(index, 1)
        }
      })
      newState.customer = customerData || []
      return newState;

    case types.DELETE_CUSTOMER_DETAIL_FAILED:
      return newState;

    default: { return state }
  }
}
