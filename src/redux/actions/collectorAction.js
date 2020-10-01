import { GET_COLLECTOR_DETAIL_REQUEST, ADD_NEW_COLLECTOR_DETAIL_REQUEST, DELETE_COLLECTOR_DETAIL_REQUEST,
    UPDATE_COLLECTOR_DETAIL_REQUEST, GET_COLLECTORBYID_DETAIL_REQUEST } from './types';

export const getCollectorData= () => {
    return ({
        type: GET_COLLECTOR_DETAIL_REQUEST,
    })
}

export const getCollectorbyidData= (id) => {
    return ({
        type: GET_COLLECTORBYID_DETAIL_REQUEST,
        id: id
    })
}

export const addNewCollectorData = (collectorData ,collectorCallback  ) => {
    return ({
        type: ADD_NEW_COLLECTOR_DETAIL_REQUEST,
        payload:{ collectorData , collectorCallback}
    })
}

export const updateCollectorData = (collectorData ,collectorCallback  ) => {
    return ({
        type: UPDATE_COLLECTOR_DETAIL_REQUEST ,
        payload:{ collectorData , collectorCallback}
    })
}

export const deleteCollectorData= (id, handleDeleteCollectorCallback) => {
    return ({
        type: DELETE_COLLECTOR_DETAIL_REQUEST,
        payload: {
            id: id,
            callback: handleDeleteCollectorCallback
        }
    })
}
