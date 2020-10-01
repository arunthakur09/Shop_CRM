import { GET_CUSTOMERBARCODE_DETAIL_REQUEST } from './types';

export const getCustomerBarcodeData= (id) => {
    return ({
        type: GET_CUSTOMERBARCODE_DETAIL_REQUEST,
        payload: {
            id: id,
        }
    })
}