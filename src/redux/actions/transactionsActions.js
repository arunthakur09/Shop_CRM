import { GET_TRANSACTIONS_DETAIL_REQUEST, ADD_NEW_TRANSACTIONS_DETAIL_REQUEST,
    DELETE_TRANSACTIONS_DETAIL_REQUEST,UPDATE_TRANSACTIONS_DETAIL_REQUEST,
    GET_TRANSACTIONS_BYCUSTOMER_DETAIL_REQUEST, GET_TRANSACTIONSBYID_DETAIL_REQUEST } from './types';

export const getTransactionData= () => {
    return ({
        type: GET_TRANSACTIONS_DETAIL_REQUEST,
    })
}

export const getTransactionDataByid= (id) => {
    return ({
        type: GET_TRANSACTIONSBYID_DETAIL_REQUEST,
        id: id
    })
}

export const getTransactionDataByCustomer= (id) => {
    return ({
        type: GET_TRANSACTIONS_BYCUSTOMER_DETAIL_REQUEST,
        id: id
    })
}

export const addNewTransactionData = (transactionData ,transactionCallback  ) => {
    return ({
        type: ADD_NEW_TRANSACTIONS_DETAIL_REQUEST ,
        payload:{ transactionData , transactionCallback}
    })
}

export const updateTransactionData = (transactionData ,transactionCallback  ) => {
    return ({
        type: UPDATE_TRANSACTIONS_DETAIL_REQUEST ,
        payload:{ transactionData , transactionCallback}
    })
}

export const deleteTransactionData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_TRANSACTIONS_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}