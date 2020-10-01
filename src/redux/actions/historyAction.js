import { GET_PICKUPHISTORY_DETAIL_REQUEST, GET_COLLECTORHISTORY_DETAIL_REQUEST } from './types';

export const getPickupHistoryData= (id) => {
    return ({
        type: GET_PICKUPHISTORY_DETAIL_REQUEST,
        id: id
    })
}

export const getCollectorHistoryData= (id) => {
    return ({
        type: GET_COLLECTORHISTORY_DETAIL_REQUEST,
        id: id
    })
}