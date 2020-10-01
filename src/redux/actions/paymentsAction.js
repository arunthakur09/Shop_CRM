import {
    GET_PAYMENTS_DETAIL_REQUEST, ADD_PAYMENTS_DETAIL_REQUEST,
    DELETE_PAYMENTS_DETAIL_REQUEST, UPDATE_PAYMENTS_DETAIL_REQUEST,
    GET_PAYMENTS_BYID_DETAIL_REQUEST
} from './types';

export const getPaymentsData= () => {
    return ({
        type: GET_PAYMENTS_DETAIL_REQUEST,
    })
}

export const getPaymentsbyidData= (id) => {
    return ({
        type: GET_PAYMENTS_BYID_DETAIL_REQUEST,
        id: id
    })
}

export const addNewPaymentsData = (paymentData, paymentCallback  ) => {
    return ({
        type: ADD_PAYMENTS_DETAIL_REQUEST ,
        payload:{ paymentData, paymentCallback}
    })
}

export const updatePaymentsData = (paymentData, paymentCallback  ) => {
    return ({
        type: UPDATE_PAYMENTS_DETAIL_REQUEST ,
        payload:{ paymentData , paymentCallback}
    })
}

export const deletePaymentsData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_PAYMENTS_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}
