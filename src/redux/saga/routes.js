import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import {
  ADD_ROUTES_DETAIL_REQUEST, UPDATE_ROUTES_DETAIL_REQUEST, DELETE_ROUTES_DETAIL_FAILED,
  DELETE_ROUTES_DETAIL_SUCCESS, DELETE_ROUTES_DETAIL_REQUEST, GET_ROUTES_DETAIL_REQUEST,
  GET_ROUTES_DETAIL_SUCCESS ,GET_ROUTES_DETAIL_FAILED, GET_ROUTESBYID_DETAIL_REQUEST,
  GET_ROUTESBYID_DETAIL_SUCCESS, GET_ROUTESBYID_DETAIL_FAILED
} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function routesGetApi() {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}routes/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetRoutesDetailSaga() {
  const routesData = yield call(routesGetApi);
  if(routesData && routesData.response &&  routesData.response.status ===200 && routesData.response.data && routesData.response.data.length>0 ){
    yield put({
      type:GET_ROUTES_DETAIL_SUCCESS,
      payload:routesData.response.data
    });
  }else {
    yield put({
      type: GET_ROUTES_DETAIL_FAILED
    })
  }
}

export function routesGetbyidApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}routes/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetRoutesbyidDetailSaga(action) {
  const routesData = yield call(routesGetbyidApi, action.id);
  if(routesData && routesData.response &&  routesData.response.status ===200 && routesData.response.data){
    yield put({
      type:GET_ROUTESBYID_DETAIL_SUCCESS,
      payload:routesData.response.data
    });
  }else {
    yield put({
      type: GET_ROUTESBYID_DETAIL_FAILED
    })
  }
}

export function addRouteApi(routesData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/routes/',routesData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerAddRouteSaga(action) {
  const newRequestData = yield call(addRouteApi ,action.payload.routesData );
  if(newRequestData && newRequestData.response && newRequestData.response.status ===201){
    action.payload.routesCallback(true , "Service Added Successfully");  
  }else{
    action.payload.routesCallback(false , "Something went wrong");
  }
}

export function routeUpdateApi(routesData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}routes/${routesData.id}/`,routesData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerUpdateRouteSaga(action) {
  const newrequestData = yield call(routeUpdateApi ,action.payload.routesData );
  if(newrequestData && newrequestData.response && newrequestData.response.status ===200){
    action.payload.routesCallback(true , "Customer Updated Successfully");  
  }else{
    action.payload.routesCallback(false , "Something went wrong");
  }
}

export function routesDeleteApi(id) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}routes/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerDeleteRoutesDetailSaga({payload}) {
  const id = payload.id
  const routesData = yield call(routesDeleteApi, id);
  if(routesData && routesData.response &&  routesData.response.status ===204){
    payload.callback(true , "Route Deleted Successfully")
    yield put({
      type:DELETE_ROUTES_DETAIL_SUCCESS,
      payload:id
    });
  }else {
    payload.callback(false , "Something Went Wrong");
    yield put({
      type: DELETE_ROUTES_DETAIL_FAILED
    })
  }
}

export function* watcherRoutesRequestSaga() {
  yield takeLatest(GET_ROUTES_DETAIL_REQUEST, workerGetRoutesDetailSaga);
  yield takeLatest(GET_ROUTESBYID_DETAIL_REQUEST, workerGetRoutesbyidDetailSaga);
  yield takeLatest(ADD_ROUTES_DETAIL_REQUEST, workerAddRouteSaga);
  yield takeLatest(UPDATE_ROUTES_DETAIL_REQUEST, workerUpdateRouteSaga);
  yield takeLatest(DELETE_ROUTES_DETAIL_REQUEST, workerDeleteRoutesDetailSaga);
}
