import * as types from '../actions/types';

export const initialState = {
  barcodes:[],
  barcodeid:[],
  barcodebyid:[]
}

export default function BarcodeReducer(state = initialState, action) {
  let newState = { ...state }
  
  switch (action.type) {
    case types.GET_BARCODE_DETAIL_SUCCESS:
      newState.barcodes= action && action.payload ? action.payload :[]
      return newState;
    
    case types.GET_BARCODE_DETAIL_FAILED:
      newState.barcodes=[]
      return newState;

    case types.GET_BARCODEBYID_DETAIL_SUCCESS:
      newState.barcodeid= action && action.payload ? action.payload :[]
      return newState;

    case types.GET_BARCODEBYID_DETAIL_FAILED:
      newState.barcodeid=[]
      return newState;
    
    //barcodeDetailbyid
    case types.GET_BARCODE_BYID_DETAIL_SUCCESS:
      newState.barcodebyid= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_BARCODE_BYID_DETAIL_FAILED:
      newState.barcodebyid=[]
      return newState;

    case types.DELETE_BARCODE_DETAIL_SUCCESS:
      let barcodesData = newState.barcodes.slice()
      barcodesData && barcodesData.length > 0 && barcodesData.forEach((item, index) => {
        if (item.id === action.payload) {
          barcodesData.splice(index, 1)
        }
      })
      newState.barcodes = barcodesData || []
      return newState;
    //

    case types.DELETE_BARCODE_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
