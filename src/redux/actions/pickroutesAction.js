import * as types from '../actions/types';

export const getPickuproutesData= (id) => {
    return ({
        type: types.GET_PICKROUTES_DETAIL_REQUEST,
            id: id
    })
}

export const getRoutehistoryData= () => {
    return ({
        type: types.GET_ROUTEHISTORY_DETAIL_REQUEST,
    })
}

export const addPickuproutesData = (noteData,routeid, noteCallback  ) => {
    return ({
        type: types.ADD_PICKROUTES_DETAIL_REQUEST ,
        id: routeid,
        payload:{ noteData, noteCallback}
    })
}

export const updatePickuproutesData = (noteData,routeid, noteCallback  ) => {
    return ({
        type: types.UPDATE_PICKROUTES_DETAIL_REQUEST ,
        id: routeid,
        payload:{ noteData, noteCallback}
    })
}

export const deletePickuproutesData= (noteData,routeid, handleDeleteCallback) => {
    return ({
        type: types.DELETE_PICKROUTES_DETAIL_REQUEST,
        payload: {
            id: routeid,
            payload:{ noteData},
            callback: handleDeleteCallback
        }
    })
}