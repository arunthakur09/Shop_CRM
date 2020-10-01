import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_DEVICES_DETAIL_REQUEST , GET_DEVICES_DETAIL_SUCCESS, GET_DEVICES_DETAIL_FAILED,
  DELETE_DEVICES_DETAIL_REQUEST, DELETE_DEVICES_DETAIL_SUCCESS, DELETE_DEVICES_DETAIL_FAILED,
  ADD_DEVICES_DETAIL_REQUEST, UPDATE_DEVICES_DETAIL_REQUEST, GET_DEVICESBYID_DETAIL_FAILED,
  GET_DEVICESBYID_DETAIL_SUCCESS, GET_DEVICESBYID_DETAIL_REQUEST } from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function devicesGetbyidApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}devices/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetDevicesbyidDetailSaga(action) {
const devicesData = yield call(devicesGetbyidApi, action.id);
if(devicesData && devicesData.response &&  devicesData.response.status ===200 && devicesData.response.data){
yield put({
     type:GET_DEVICESBYID_DETAIL_SUCCESS,
     payload:devicesData.response.data
   });
}
else {
yield put({
   type: GET_DEVICESBYID_DETAIL_FAILED
 })
 }
}

export function devicesGetApi() {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get(`${process.env.REACT_APP_API_URL}devices/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
}

 function* workerGetDevicesDetailSaga() {
 const devicesData = yield call(devicesGetApi);
 if(devicesData && devicesData.response &&  devicesData.response.status ===200 && devicesData.response.data && devicesData.response.data.length>0 ){
 yield put({
      type:GET_DEVICES_DETAIL_SUCCESS,
      payload:devicesData.response.data
    });
 }
 else {
 yield put({
    type: GET_DEVICES_DETAIL_FAILED
  })
  }
}

export function addDeviceApi(devicesData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/devices/',devicesData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerAddNewDeviceSaga(action) {
const newdevicesData = yield call(addDeviceApi ,action.payload.deviceData );
if(newdevicesData && newdevicesData.response && newdevicesData.response.status ===201){
    action.payload.deviceCallback(true , "Device Added Successfully");  
}
else{
    action.payload.deviceCallback(false , "Something went wrong");
}
}

export function deviceUpdateApi(deviceData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}devices/${deviceData.id}/`,deviceData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdateDeviceSaga(action) {
const newdeviceData = yield call(deviceUpdateApi ,action.payload.deviceData );
if(newdeviceData && newdeviceData.response && newdeviceData.response.status ===200){
    action.payload.deviceCallback(true , "device Updated Successfully");  
}
else{
    action.payload.deviceCallback(false , "Something went wrong");
}
}

export function deviceDeleteApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}devices/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerDeleteDeviceDetailSaga({payload}) {
  const id = payload.id
  const devicesData = yield call(deviceDeleteApi, id);
  if(devicesData && devicesData.response &&  devicesData.response.status ===204){
    payload.callback(true , "Device Deleted Successfully");
  yield put({
       type:DELETE_DEVICES_DETAIL_SUCCESS,
       payload:id
     });
  }
  else {
    payload.callback(false , "Something went wrong");
  yield put({
     type: DELETE_DEVICES_DETAIL_FAILED
   })
 }
}

export function* watcherDevicesRequestSaga() {
  yield takeLatest(GET_DEVICESBYID_DETAIL_REQUEST, workerGetDevicesbyidDetailSaga);
 yield takeLatest(GET_DEVICES_DETAIL_REQUEST, workerGetDevicesDetailSaga);
 yield takeLatest(ADD_DEVICES_DETAIL_REQUEST, workerAddNewDeviceSaga);
 yield takeLatest(UPDATE_DEVICES_DETAIL_REQUEST, workerUpdateDeviceSaga);
 yield takeLatest(DELETE_DEVICES_DETAIL_REQUEST, workerDeleteDeviceDetailSaga);
}