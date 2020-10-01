import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_PICKUPHISTORY_DETAIL_REQUEST, GET_PICKUPHISTORY_DETAIL_SUCCESS,
    GET_PICKUPHISTORY_DETAIL_FAILED, GET_COLLECTORHISTORY_DETAIL_REQUEST,
    GET_COLLECTORHISTORY_DETAIL_SUCCESS, GET_COLLECTORHISTORY_DETAIL_FAILED
} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

//CustomerPickup History
export function pickuphistoryGetApi(id) {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get(`${process.env.REACT_APP_API_URL}pickup-routes/customers/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
}

 function* workerGetPickupHistoryDetailSaga(payload) {
 const pickuphistoryData = yield call(pickuphistoryGetApi, payload.id);
 if(pickuphistoryData && pickuphistoryData.response &&  pickuphistoryData.response.status ===200 && pickuphistoryData.response.data && pickuphistoryData.response.data.length>0 ){
 yield put({
      type:GET_PICKUPHISTORY_DETAIL_SUCCESS,
      payload:pickuphistoryData.response.data
    });
 }
 else {
 yield put({
    type: GET_PICKUPHISTORY_DETAIL_FAILED
  })
  }
}

//Collector History
export function collectorhistoryGetApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}pickup-routes/collectors/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetCollectorHistoryDetailSaga(payload) {
const collectorhistoryData = yield call(collectorhistoryGetApi, payload.id);
if(collectorhistoryData && collectorhistoryData.response &&  collectorhistoryData.response.status ===200 && collectorhistoryData.response.data && collectorhistoryData.response.data.length>0 ){
yield put({
     type:GET_COLLECTORHISTORY_DETAIL_SUCCESS,
     payload:collectorhistoryData.response.data
   });
}
else {
yield put({
   type: GET_COLLECTORHISTORY_DETAIL_FAILED
 })
 }
}

export function* watcherPickupHistoryRequestSaga() {
 yield takeLatest(GET_PICKUPHISTORY_DETAIL_REQUEST, workerGetPickupHistoryDetailSaga);
 yield takeLatest(GET_COLLECTORHISTORY_DETAIL_REQUEST, workerGetCollectorHistoryDetailSaga);
}