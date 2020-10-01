import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_CUSTOMERBARCODE_DETAIL_REQUEST , 
    GET_CUSTOMERBARCODE_DETAIL_SUCCESS ,GET_CUSTOMERBARCODE_DETAIL_FAILED} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';


export function customerbarcodeGetApi(id) {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get(`${process.env.REACT_APP_API_URL}barcodes/customer/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))

}


 function* workerGetcustomerbarcodesDetailSaga(payload) {
  const id = payload.payload.id
 const customerbarcodeData = yield call(customerbarcodeGetApi, id);
 if(customerbarcodeData && customerbarcodeData.response &&  customerbarcodeData.response.status ===200 && customerbarcodeData.response.data && customerbarcodeData.response.data.length>0 ){
 yield put({
      type:GET_CUSTOMERBARCODE_DETAIL_SUCCESS,
      payload:customerbarcodeData.response.data
    });
 }
 else {
 yield put({
    type: GET_CUSTOMERBARCODE_DETAIL_FAILED
  })
  }}

export function* watcherCustomerBarcodeRequestSaga() {
 yield takeLatest(GET_CUSTOMERBARCODE_DETAIL_REQUEST, workerGetcustomerbarcodesDetailSaga);
}