import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { DELETE_COLLECTOR_DETAIL_FAILED, DELETE_COLLECTOR_DETAIL_SUCCESS, DELETE_COLLECTOR_DETAIL_REQUEST,
   GET_COLLECTOR_DETAIL_REQUEST , GET_COLLECTOR_DETAIL_SUCCESS ,GET_COLLECTOR_DETAIL_FAILED,
   ADD_NEW_COLLECTOR_DETAIL_REQUEST, UPDATE_COLLECTOR_DETAIL_REQUEST, GET_COLLECTORBYID_DETAIL_SUCCESS,
   GET_COLLECTORBYID_DETAIL_FAILED, GET_COLLECTORBYID_DETAIL_REQUEST} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function collectorGetbyidApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}collectors/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetCollectorbyidDetailSaga(action) {
const collectorData = yield call(collectorGetbyidApi, action.id);
if(collectorData && collectorData.response &&  collectorData.response.status ===200 && collectorData.response.data){
yield put({
     type:GET_COLLECTORBYID_DETAIL_SUCCESS,
     payload:collectorData.response.data
   });
}
else {
yield put({
   type: GET_COLLECTORBYID_DETAIL_FAILED
 })
 }
}

export function collectorGetApi() {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get(`${process.env.REACT_APP_API_URL}collectors/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
}

 function* workerGetCollectorDetailSaga() {
 const collectorData = yield call(collectorGetApi);
 if(collectorData && collectorData.response &&  collectorData.response.status ===200 && collectorData.response.data && collectorData.response.data.length>0 ){
 yield put({
      type:GET_COLLECTOR_DETAIL_SUCCESS,
      payload:collectorData.response.data
    });
 }
 else {
 yield put({
    type: GET_COLLECTOR_DETAIL_FAILED
  })
  }
}

export function collectorDeleteApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}collectors/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

export function addCollectorApi(collectorData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.post(`${process.env.REACT_APP_API_URL}collectors/`,collectorData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}


function* workerAddNewCollectorSaga(action) {
const newCollectorData = yield call(addCollectorApi ,action.payload.collectorData );
if(newCollectorData && newCollectorData.response && newCollectorData.response.status ===201){
    action.payload.collectorCallback(true , "Collector Added Successfully");  
}
else{
    action.payload.collectorCallback(false , "Something went wrong");
}
}

export function collectorUpdateApi(collectorData) {
const accessToken= getAccessToken();
let token= accessToken ? accessToken :'';
return  axios.put(`${process.env.REACT_APP_API_URL}collectors/${collectorData.id}/`,collectorData, {
 headers: {
   'Authorization': `Token ${token}`
 }
}).then(response =>  {
 return{ response }})
.catch(error => ({ error }))
}

function* workerUpdatecollectorSaga(action) {
const newcollectorData = yield call(collectorUpdateApi ,action.payload.collectorData );
if(newcollectorData && newcollectorData.response && newcollectorData.response.status ===200){
  action.payload.collectorCallback(true , "collector Updated Successfully");  
}
else{
  action.payload.collectorCallback(false , "Something went wrong");
}
}

function* workerDeleteCollectorDetailSaga({payload}) {
  const id = payload.id
  const collectorData = yield call(collectorDeleteApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Collector Deleted Successfully")
  yield put({
       type:DELETE_COLLECTOR_DETAIL_SUCCESS,
       payload:id
     });
  }
  else {
    payload.callback(false , "Something Went Wrong");
  yield put({
     type: DELETE_COLLECTOR_DETAIL_FAILED
   })
 }
  }

export function* watcherCollectorRequestSaga() {
  yield takeLatest(GET_COLLECTORBYID_DETAIL_REQUEST, workerGetCollectorbyidDetailSaga);
 yield takeLatest(DELETE_COLLECTOR_DETAIL_REQUEST, workerDeleteCollectorDetailSaga);
 yield takeLatest(GET_COLLECTOR_DETAIL_REQUEST, workerGetCollectorDetailSaga);
 yield takeLatest(UPDATE_COLLECTOR_DETAIL_REQUEST, workerUpdatecollectorSaga);
 yield takeLatest(ADD_NEW_COLLECTOR_DETAIL_REQUEST , workerAddNewCollectorSaga);
}