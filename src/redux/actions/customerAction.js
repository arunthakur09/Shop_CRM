import { GET_CUSTOMER_DETAIL_REQUEST, ADD_NEW_CUSTOMER_DETAIL_REQUEST,
    UPDATE_CUSTOMER_DETAIL_REQUEST ,DELETE_CUSTOMER_DETAIL_REQUEST, GET_CUSTOMERBYID_DETAIL_REQUEST} from './types';

export const getCustomerData = () => {
    return ({
        type: GET_CUSTOMER_DETAIL_REQUEST,
    })
}

export const getCustomerbyidData = (id) => {
    return ({
        type: GET_CUSTOMERBYID_DETAIL_REQUEST,
        id: id
    })
}

export const addNewCustomerData = (customerData ,customerCallback  ) => {
    return ({
        type: ADD_NEW_CUSTOMER_DETAIL_REQUEST ,
        payload:{ customerData , customerCallback}
    })
}

export const updateCustomerData = (customerData ,customerCallback  ) => {
    return ({
        type: UPDATE_CUSTOMER_DETAIL_REQUEST ,
        payload:{ customerData , customerCallback}
    })
}

export const deleteCustomerData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_CUSTOMER_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}
