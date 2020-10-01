import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_PAYMENTS_DETAIL_REQUEST, GET_PAYMENTS_DETAIL_SUCCESS, GET_PAYMENTS_DETAIL_FAILED,
  DELETE_PAYMENTS_DETAIL_REQUEST, DELETE_PAYMENTS_DETAIL_SUCCESS, DELETE_PAYMENTS_DETAIL_FAILED,
  UPDATE_PAYMENTS_DETAIL_REQUEST, ADD_PAYMENTS_DETAIL_REQUEST, GET_PAYMENTS_BYID_DETAIL_REQUEST,
  GET_PAYMENTS_BYID_DETAIL_SUCCESS, GET_PAYMENTS_BYID_DETAIL_FAILED } from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function paymentsGetbyidApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}payments/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetPaymentsbyidDetailSaga(action) {
  const paymentsData = yield call(paymentsGetbyidApi, action.id);
  if(paymentsData && paymentsData.response &&  paymentsData.response.status ===200 && paymentsData.response.data){
    yield put({
      type:GET_PAYMENTS_BYID_DETAIL_SUCCESS,
      payload:paymentsData.response.data
    });
  }else {
    yield put({
      type: GET_PAYMENTS_BYID_DETAIL_FAILED
    })
  }
}

export function paymentsGetApi() {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}payments/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetPaymentsDetailSaga() {
  const paymentsData = yield call(paymentsGetApi);
  if(paymentsData && paymentsData.response &&  paymentsData.response.status ===200 && paymentsData.response.data && paymentsData.response.data.length>0 ){
    yield put({
      type:GET_PAYMENTS_DETAIL_SUCCESS,
      payload:paymentsData.response.data
    });
  }else {
    yield put({
      type: GET_PAYMENTS_DETAIL_FAILED
    })
  }
}

export function addPaymentApi(paymentData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/payments/',paymentData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
   return{ response }
  })
  .catch(error => ({ error }))
}

function* workerAddNewPaymentSaga(action) {
  const newCustomerData = yield call(addPaymentApi ,action.payload.paymentData );
  if(newCustomerData && newCustomerData.response && newCustomerData.response.status ===201){
    action.payload.paymentCallback(true , "Payment Added Successfully");  
  }else{
    action.payload.paymentCallback(false , "Something went wrong");
  }
}

export function paymentUpdateApi(paymentData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}payments/${paymentData.id}/`,paymentData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerUpdatePaymentSaga(action) {
  const newCustomerData = yield call(paymentUpdateApi ,action.payload.paymentData );
  if(newCustomerData && newCustomerData.response && newCustomerData.response.status ===200){
    action.payload.paymentCallback(true , "Payment Updated Successfully");  
  }else{
    action.payload.paymentCallback(false , "Something went wrong");
  }
}

export function paymentsDeleteApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}payments/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerDeletepaymentsDetailSaga({payload}) {
  const id = payload.id
  const collectorData = yield call(paymentsDeleteApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Customer Deleted Successfully");
    yield put({
      type:DELETE_PAYMENTS_DETAIL_SUCCESS,
      payload:id
    })
  }else {
    payload.callback(false , "Something went wrong");
    yield put({
      type: DELETE_PAYMENTS_DETAIL_FAILED
    })
  }
}

export function* watcherPaymentsRequestSaga() {
  yield takeLatest(GET_PAYMENTS_BYID_DETAIL_REQUEST, workerGetPaymentsbyidDetailSaga);
  yield takeLatest(GET_PAYMENTS_DETAIL_REQUEST, workerGetPaymentsDetailSaga);
  yield takeLatest(ADD_PAYMENTS_DETAIL_REQUEST, workerAddNewPaymentSaga);
  yield takeLatest(UPDATE_PAYMENTS_DETAIL_REQUEST, workerUpdatePaymentSaga);
  yield takeLatest(DELETE_PAYMENTS_DETAIL_REQUEST, workerDeletepaymentsDetailSaga);
}
