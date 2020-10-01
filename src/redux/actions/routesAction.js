import {
    GET_ROUTES_DETAIL_REQUEST, UPDATE_ROUTES_DETAIL_REQUEST,
    DELETE_ROUTES_DETAIL_REQUEST, ADD_ROUTES_DETAIL_REQUEST,
    GET_ROUTESBYID_DETAIL_REQUEST
} from './types';

export const getRoutesData= () => {
    return ({
        type: GET_ROUTES_DETAIL_REQUEST,
    })
}

export const getRoutesbyidData= (id) => {
    return ({
        type: GET_ROUTESBYID_DETAIL_REQUEST,
        id: id
    })
}

export const addNewRoutesData = (routesData ,routesCallback  ) => {
    return ({
        type: ADD_ROUTES_DETAIL_REQUEST ,
        payload:{ routesData , routesCallback}
    })
}

export const updateRoutesData = (routesData ,routesCallback  ) => {
    return ({
        type: UPDATE_ROUTES_DETAIL_REQUEST ,
        payload:{ routesData, routesCallback}
    })
}

export const deleteRoutesData= (id, handleDeleteRouteCallback) => {
    return ({
        type: DELETE_ROUTES_DETAIL_REQUEST,
        payload: {
            id: id,
            callback: handleDeleteRouteCallback
        }
    })
}

