import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function routehistoryGetApi() {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}pickup-routes/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetRoutehistoryDetailSaga(payload) {
const notelistData = yield call(routehistoryGetApi, payload);
if(notelistData && notelistData.response &&  notelistData.response.status ===200 && notelistData.response.data && notelistData.response.data.length>0 ){
yield put({
     type:types.GET_ROUTEHISTORY_DETAIL_SUCCESS,
     payload:notelistData.response.data
   });
}
else {
yield put({
   type: types.GET_ROUTEHISTORY_DETAIL_FAILED
 })
 }
}

export function pickuproutesGetApi(req) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}pickup-routes/routes/${req.id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetPickuproutesDetailSaga(payload) {
const notelistData = yield call(pickuproutesGetApi, payload);
if(notelistData && notelistData.response &&  notelistData.response.status ===200 && notelistData.response.data && notelistData.response.data.length>0 ){
yield put({
     type:types.GET_PICKROUTES_DETAIL_SUCCESS,
     payload:notelistData.response.data
   });
}
else {
yield put({
   type: types.GET_PICKROUTES_DETAIL_FAILED
 })
 }
}

  export function addPickuproutesApi(noteData,id) {
    const accessToken= getAccessToken();
   let token= accessToken ? accessToken :'';
    return  axios.post(`${process.env.REACT_APP_API_URL}pickup-routes/routes/${id}/`,noteData, {
     headers: {
       'Authorization': `Token ${token}`
     }
   }).then(response =>  {
     return{ response }})
   .catch(error => ({ error }))
 }


function* workerAddNewPickuprouteSaga(action) {
const id = action.id 
  const newCollectorData = yield call(addPickuproutesApi ,action.payload.noteData,id );
  if(newCollectorData && newCollectorData.response && newCollectorData.response.status ===201){
      action.payload.noteCallback(true , "Pickup Route Added Successfully");  
  }
  else{
      action.payload.noteCallback(false , newCollectorData && newCollectorData.error && newCollectorData.error.response && newCollectorData.error.response.data[0].non_field_errors[0]);
  }
}

export function pickuprouteUpdateApi(noteData,id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}pickup-routes/routes/${id}/acknowledge/`,noteData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdatePickuprouteSaga(action) {
    const id = action.id;
const newrequestData = yield call(pickuprouteUpdateApi ,action.payload.noteData,id );
if(newrequestData && newrequestData.response && newrequestData.response.status ===200){
    action.payload.noteCallback(true , "Pickup Route Acknowledged Successfully");  
}
else{
    action.payload.noteCallback(false , "Something went wrong");
}
}

export function pickuprouteDeleteApi(noteData,id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
 console.log(noteData.customers)
 var datacus = JSON.stringify({"customers":noteData.customers});
 var config = {
  method: 'delete',
  url: `${process.env.REACT_APP_API_URL}pickup-routes/routes/${id}/remove/`,
  headers: { 
    'Authorization': `Token ${token}`, 
    'Content-Type': 'application/json'
  },
  data : datacus
};
  return  axios(config).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerDeletePickuprouteSaga({payload}) {
    const id = payload.id;
  const collectorData = yield call(pickuprouteDeleteApi, payload.payload.noteData,id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Pickup route Deleted Successfully");
  yield put({
       type: types.DELETE_PICKROUTES_DETAIL_SUCCESS,
       payload:id
     });
  }
  else {
    payload.callback(false , "Something went wrong");
  yield put({
     type: types.DELETE_PICKROUTES_DETAIL_FAILED
   })
 }
}

export function* watcherPickuprouteRequestSaga() {
  yield takeLatest(types.GET_ROUTEHISTORY_DETAIL_REQUEST , workerGetRoutehistoryDetailSaga);
 yield takeLatest(types.GET_PICKROUTES_DETAIL_REQUEST , workerGetPickuproutesDetailSaga);
 yield takeLatest(types.ADD_PICKROUTES_DETAIL_REQUEST , workerAddNewPickuprouteSaga);
 yield takeLatest(types.UPDATE_PICKROUTES_DETAIL_REQUEST , workerUpdatePickuprouteSaga);
 yield takeLatest(types.DELETE_PICKROUTES_DETAIL_REQUEST , workerDeletePickuprouteSaga);
}