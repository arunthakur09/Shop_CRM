import {
    GET_BARCODE_DETAIL_REQUEST, DELETE_BARCODE_DETAIL_REQUEST, GET_BARCODEBYID_DETAIL_REQUEST,
    ADD_BARCODE_DETAIL_REQUEST, UPDATE_BARCODE_DETAIL_REQUEST, GET_BARCODE_BYID_DETAIL_REQUEST
} from './types';

export const getBarcodeByidData= (id) => {
    return ({
        type: GET_BARCODE_BYID_DETAIL_REQUEST,
        id: id
    })
}

export const getBarcodeByid= (id) => {
    return ({
        type: GET_BARCODEBYID_DETAIL_REQUEST,
        id: id
    })
}

export const getBarcodeData= () => {
    return ({
        type: GET_BARCODE_DETAIL_REQUEST,
    })
}

export const addNewBarcodeData = (barcodeData, barcodeCallback  ) => {
    return ({
        type: ADD_BARCODE_DETAIL_REQUEST ,
        payload:{ barcodeData, barcodeCallback}
    })
}

export const updateBarcodeData = (barcodeData, barcodeCallback  ) => {
    return ({
        type: UPDATE_BARCODE_DETAIL_REQUEST ,
        payload:{ barcodeData , barcodeCallback}
    })
}

export const deleteBarcodeData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_BARCODE_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}



