import * as types from '../actions/types';

export const initialState = {
  customerbarcodes:[],
}

export default function CustomerBarcodeReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_CUSTOMERBARCODE_DETAIL_SUCCESS:
    newState.customerbarcodes= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_CUSTOMERBARCODE_DETAIL_FAILED:
    newState.customerbarcodes=[]
    return newState;

 default: { return state }
  }
}
