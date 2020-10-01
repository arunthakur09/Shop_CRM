import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import {
  GET_BARCODE_DETAIL_REQUEST, GET_BARCODE_DETAIL_SUCCESS, GET_BARCODE_DETAIL_FAILED,
  DELETE_BARCODE_DETAIL_REQUEST, DELETE_BARCODE_DETAIL_SUCCESS, DELETE_BARCODE_DETAIL_FAILED,
  UPDATE_BARCODE_DETAIL_REQUEST, ADD_BARCODE_DETAIL_REQUEST, GET_BARCODE_BYID_DETAIL_REQUEST,
  GET_BARCODE_BYID_DETAIL_SUCCESS, GET_BARCODE_BYID_DETAIL_FAILED, GET_BARCODEBYID_DETAIL_REQUEST,
  GET_BARCODEBYID_DETAIL_SUCCESS, GET_BARCODEBYID_DETAIL_FAILED
} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

//Barcode Detail
export function barcodeGetByidApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}barcodes/${id}/detail/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
   return{ response }
  }).catch(error => ({ error }))
}

function* workerGetbarcodesByidDetailSaga(payload) {
  const id = payload.id
  const barcodeData = yield call(barcodeGetByidApi, id);
  if(barcodeData && barcodeData.response &&  barcodeData.response.status ===200 && barcodeData.response.data ){
    yield put({
      type:GET_BARCODE_BYID_DETAIL_SUCCESS,
      payload:barcodeData.response.data
    });
  }else {
    yield put({
      type: GET_BARCODE_BYID_DETAIL_FAILED
    })
  }
}

export function barcodeGetApi() {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}barcodes/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetbarcodesDetailSaga() {
  const barcodeData = yield call(barcodeGetApi);
  if(barcodeData && barcodeData.response &&  barcodeData.response.status ===200 && barcodeData.response.data && barcodeData.response.data.length>0 ){
    yield put({
      type:GET_BARCODE_DETAIL_SUCCESS,
      payload:barcodeData.response.data
    });
  }else {
    yield put({
      type: GET_BARCODE_DETAIL_FAILED
    })
  }
}

export function barcodeidGetApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}barcodes/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetidbarcodesDetailSaga(action) {
  const barcodeData = yield call(barcodeidGetApi, action.id);
  if(barcodeData && barcodeData.response && barcodeData.response.status ===200 && barcodeData.response.data){
    yield put({
      type:GET_BARCODEBYID_DETAIL_SUCCESS,
      payload:barcodeData.response.data
    });
  }else {
    yield put({
      type: GET_BARCODEBYID_DETAIL_FAILED
    })
  }
}

export function addBarcodeApi(barcodeData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/barcodes/',barcodeData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}
  
function* workerAddBarcodeSaga(action) {
  const newbarcodeData = yield call(addBarcodeApi ,action.payload.barcodeData );
  if(newbarcodeData && newbarcodeData.response && newbarcodeData.response.status ===201){
    action.payload.barcodeCallback(true , "Barcode Added Successfully");
  }else{
    action.payload.barcodeCallback(false , "Something went wrong");
  }
}

export function barcodeUpdateApi(barcodesData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}barcodes/${barcodesData.id}/`,barcodesData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerUpdatebarcodesDetailSaga(action) {
  const newbarcodeData = yield call(barcodeUpdateApi ,action.payload.barcodeData );
  if(newbarcodeData && newbarcodeData.response && newbarcodeData.response.status ===200){
    action.payload.barcodeCallback(true , "barcode Updated Successfully");  
  }else{
    action.payload.barcodeCallback(false , "Something went wrong");
  }
}

export function barcodesDeleteApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}barcodes/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}
  
function* workerDeletebarcodesDetailSaga({payload}) {
  const id = payload.id
  const collectorData = yield call(barcodesDeleteApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Barcode Deleted Successfully");
    yield put({
      type:DELETE_BARCODE_DETAIL_SUCCESS,
      payload:id
    });
  }else {
    payload.callback(false , "Something went wrong");
    yield put({
      type: DELETE_BARCODE_DETAIL_FAILED
    })
  }
}

export function* watcherBarcodeRequestSaga() {
  yield takeLatest(GET_BARCODE_BYID_DETAIL_REQUEST, workerGetbarcodesByidDetailSaga);
  yield takeLatest(GET_BARCODE_DETAIL_REQUEST, workerGetbarcodesDetailSaga);
  yield takeLatest(GET_BARCODEBYID_DETAIL_REQUEST, workerGetidbarcodesDetailSaga);
  yield takeLatest(ADD_BARCODE_DETAIL_REQUEST, workerAddBarcodeSaga);
  yield takeLatest(UPDATE_BARCODE_DETAIL_REQUEST, workerUpdatebarcodesDetailSaga);
  yield takeLatest(DELETE_BARCODE_DETAIL_REQUEST, workerDeletebarcodesDetailSaga);
}