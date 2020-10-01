import { GET_DEVICES_DETAIL_REQUEST, ADD_DEVICES_DETAIL_REQUEST, UPDATE_DEVICES_DETAIL_REQUEST,
    DELETE_DEVICES_DETAIL_REQUEST, GET_DEVICESBYID_DETAIL_REQUEST } from './types';

export const getDevicesData= () => {
    return ({
        type: GET_DEVICES_DETAIL_REQUEST,
    })
}

export const getDevicesbyidData= (id) => {
    return ({
        type: GET_DEVICESBYID_DETAIL_REQUEST,
        id: id
    })
}

export const addNewDevicesData = (deviceData, deviceCallback  ) => {
    return ({
        type: ADD_DEVICES_DETAIL_REQUEST ,
        payload:{ deviceData, deviceCallback}
    })
}

export const updateDevicesData = (deviceData, deviceCallback  ) => {
    return ({
        type: UPDATE_DEVICES_DETAIL_REQUEST ,
        payload:{ deviceData , deviceCallback}
    })
}

export const deleteDevicesData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_DEVICES_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}
