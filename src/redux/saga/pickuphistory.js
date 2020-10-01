import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_PICKUPHISTORY_DETAIL_REQUEST, GET_PICKUPHISTORY_DETAIL_SUCCESS,
    GET_PICKUPHISTORY_DETAIL_FAILED
} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';


export function pickuphistoryGetApi() {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get(`${process.env.REACT_APP_API_URL}pickup-routes/customers/8/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
}

 function* workerGetPickupHistoryDetailSaga() {
 const pickuphistoryData = yield call(pickuphistoryGetApi);
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

export function* watcherPickupHistoryRequestSaga() {
 yield takeLatest(GET_PICKUPHISTORY_DETAIL_REQUEST, workerGetPickupHistoryDetailSaga);
}