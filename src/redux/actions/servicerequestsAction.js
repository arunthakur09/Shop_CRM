import {
    GET_SERVICEREQUESTS_DETAIL_REQUEST, ADD_NEW_SERVICEREQUESTS_DETAIL_REQUEST,
    UPDATE_SERVICEREQUESTS_DETAIL_REQUEST, DELETE_SERVICEREQUESTS_DETAIL_REQUEST,
    CLOSE_SERVICEREQUESTS_DETAIL_REQUEST, GET_SERVICEREQUESTSBYID_DETAIL_REQUEST
} from './types';

export const getServiceRequestData= () => {
    return ({
        type: GET_SERVICEREQUESTS_DETAIL_REQUEST,
    })
}

export const getServiceRequestbyidData= (id) => {
    return ({
        type: GET_SERVICEREQUESTSBYID_DETAIL_REQUEST,
        id: id
    })
}

export const addNewRequestData = (requestData ,requestCallback  ) => {
    return ({
        type: ADD_NEW_SERVICEREQUESTS_DETAIL_REQUEST ,
        payload:{ requestData , requestCallback}
    })
}

export const updateRequestData = (requestData ,requestCallback  ) => {
    return ({
        type: UPDATE_SERVICEREQUESTS_DETAIL_REQUEST ,
        payload:{ requestData , requestCallback}
    })
}

export const deleteServiceRequestData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_SERVICEREQUESTS_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}

export const closeServiceRequestData= (id , handleCloseCallback) => {
    return ({
        type: CLOSE_SERVICEREQUESTS_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleCloseCallback
        }
    })
}