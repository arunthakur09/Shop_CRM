import * as types from '../actions/types';

export const initialState = {
  payments:[],
  paymentsbyid:[]
}

export default function PaymentsReducer(state = initialState, action) {
  let newState = { ...state }
  
  switch (action.type) {
    case types.GET_PAYMENTS_DETAIL_SUCCESS:
      newState.payments= action && action.payload ? action.payload :[]
      return newState;
      
    case types.GET_PAYMENTS_DETAIL_FAILED:
      newState.payments=[]
      return newState;
        
    case types.GET_PAYMENTS_BYID_DETAIL_SUCCESS:
      newState.paymentsbyid= action && action.payload ? action.payload :[]
      return newState;
          
    case types.GET_PAYMENTS_BYID_DETAIL_FAILED:
      newState.paymentsbyid=[]
      return newState;
            
    case types.DELETE_PAYMENTS_DETAIL_SUCCESS:
      let paymentsData = newState.payments.slice();
      paymentsData && paymentsData.length > 0 && paymentsData.forEach((item, index) => {
        if (item.id === action.payload) {
          paymentsData.splice(index, 1)
        }
      })
      newState.payments = paymentsData || []
      return newState;
              
    case types.DELETE_PAYMENTS_DETAIL_FAILED:
      return newState;
                
    default: { return state }
  }
}
