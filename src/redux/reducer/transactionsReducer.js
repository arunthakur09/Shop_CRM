import * as types from '../actions/types';

export const initialState = {
  transactions:[],
  transactionsid:[],
  transactionsbyid:[]
}

export default function TransactionsReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_TRANSACTIONS_DETAIL_SUCCESS:
    newState.transactions= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_TRANSACTIONS_DETAIL_FAILED:
    newState.transactions=[]
    return newState;
    
  case types.GET_TRANSACTIONSBYID_DETAIL_SUCCESS:
    newState.transactionsid= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_TRANSACTIONSBYID_DETAIL_FAILED:
    newState.transactionsid=[]
    return newState;
    
    case types.GET_TRANSACTIONS_BYCUSTOMER_DETAIL_SUCCESS:
      newState.transactionsbyid= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_TRANSACTIONS_BYCUSTOMER_DETAIL_FAILED:
      newState.transactionsbyid=[]
      return newState;

    case types.DELETE_TRANSACTIONS_DETAIL_SUCCESS:
      let transactionsData = newState.transactions.slice()
      transactionsData && transactionsData.length > 0 && transactionsData.forEach((item, index) => {
        if (item.id === action.payload) {
          transactionsData.splice(index, 1)
        }
      })
      newState.transactions = transactionsData || []
      return newState;

    case types.DELETE_TRANSACTIONS_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
