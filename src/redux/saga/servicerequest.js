import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import {
  GET_SERVICEREQUESTS_DETAIL_REQUEST ,GET_SERVICEREQUESTS_DETAIL_SUCCESS ,
  GET_SERVICEREQUESTS_DETAIL_FAILED,ADD_NEW_SERVICEREQUESTS_DETAIL_REQUEST,
  UPDATE_SERVICEREQUESTS_DETAIL_REQUEST, DELETE_SERVICEREQUESTS_DETAIL_REQUEST,
  DELETE_SERVICEREQUESTS_DETAIL_SUCCESS, DELETE_SERVICEREQUESTS_DETAIL_FAILED,
  CLOSE_SERVICEREQUESTS_DETAIL_REQUEST, CLOSE_SERVICEREQUESTS_DETAIL_SUCCESS,
  CLOSE_SERVICEREQUESTS_DETAIL_FAILED, GET_SERVICEREQUESTSBYID_DETAIL_REQUEST,
  GET_SERVICEREQUESTSBYID_DETAIL_SUCCESS,GET_SERVICEREQUESTSBYID_DETAIL_FAILED
} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function servicerequestsGetApi() {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}service-requests/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetServiceRequestsDetailSaga() {
  const devicesData = yield call(servicerequestsGetApi);
  if(devicesData && devicesData.response &&  devicesData.response.status ===200 && devicesData.response.data && devicesData.response.data.length>0 ){
    yield put({
      type:GET_SERVICEREQUESTS_DETAIL_SUCCESS,
      payload:devicesData.response.data
    });
  }else {
    yield put({
      type: GET_SERVICEREQUESTS_DETAIL_FAILED
    })
  }
}

export function servicerequestsGetbyidApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}service-requests/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetServiceRequestsbyidDetailSaga(action) {
  const devicesData = yield call(servicerequestsGetbyidApi, action.id);
  if(devicesData && devicesData.response &&  devicesData.response.status ===200 && devicesData.response.data){
    yield put({
      type:GET_SERVICEREQUESTSBYID_DETAIL_SUCCESS,
      payload:devicesData.response.data
    });
  }else {
    yield put({
      type: GET_SERVICEREQUESTSBYID_DETAIL_FAILED
    })
  }
}

export function addServiceRequestApi(requestData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/service-requests/',requestData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerAddServiceRequestSaga(action) {
const newRequestData = yield call(addServiceRequestApi ,action.payload.requestData );
if(newRequestData && newRequestData.response && newRequestData.response.status ===201){
  action.payload.requestCallback(true , "Service Added Successfully");  
}else{
  action.payload.requestCallback(false , "Something went wrong");
}}

export function servicerequestUpdateApi(requestData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}service-requests/${requestData.id}/`,requestData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerUpdateServiceRequestSaga(action) {
const newrequestData = yield call(servicerequestUpdateApi ,action.payload.requestData );
if(newrequestData && newrequestData.response && newrequestData.response.status ===200){
  action.payload.requestCallback(true , "Customer Updated Successfully");  
}else{
  action.payload.requestCallback(false , "Something went wrong");
}}

export function servicerequestDeleteApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}service-requests/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerDeleteServiceRequestDetailSaga({payload}) {
  const id = payload.id
  const collectorData = yield call(servicerequestDeleteApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Service Request Deleted Successfully");
    yield put({
      type:DELETE_SERVICEREQUESTS_DETAIL_SUCCESS,
      payload:id
    });
  }else {
    payload.callback(false , "Something went wrong");
    yield put({
      type: DELETE_SERVICEREQUESTS_DETAIL_FAILED
    })
  }
}

export function servicerequestCloseApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}service-requests/${id}/close/`,'', {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerCloseServiceRequestDetailSaga({payload}) {
  const id = payload.id
  const collectorData = yield call(servicerequestCloseApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===200){
    payload.callback(true , "Service Request Closed Successfully");
    yield put({
      type:CLOSE_SERVICEREQUESTS_DETAIL_SUCCESS,
      payload:id
    });
  }else {
    payload.callback(false , "Something went wrong");
    yield put({
      type: CLOSE_SERVICEREQUESTS_DETAIL_FAILED
    })
  }
}

export function* watcherServiceRequestsRequestSaga() {
  yield takeLatest(GET_SERVICEREQUESTSBYID_DETAIL_REQUEST, workerGetServiceRequestsbyidDetailSaga);
  yield takeLatest(GET_SERVICEREQUESTS_DETAIL_REQUEST, workerGetServiceRequestsDetailSaga);
  yield takeLatest(ADD_NEW_SERVICEREQUESTS_DETAIL_REQUEST, workerAddServiceRequestSaga);
  yield takeLatest(UPDATE_SERVICEREQUESTS_DETAIL_REQUEST, workerUpdateServiceRequestSaga);
  yield takeLatest(DELETE_SERVICEREQUESTS_DETAIL_REQUEST, workerDeleteServiceRequestDetailSaga);
  yield takeLatest(CLOSE_SERVICEREQUESTS_DETAIL_REQUEST, workerCloseServiceRequestDetailSaga);
}
