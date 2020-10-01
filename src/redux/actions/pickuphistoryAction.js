import { GET_PICKUPHISTORY_DETAIL_REQUEST } from './types';

export const getPickupHistoryData= () => {
    return ({
        type: GET_PICKUPHISTORY_DETAIL_REQUEST,
    })
}