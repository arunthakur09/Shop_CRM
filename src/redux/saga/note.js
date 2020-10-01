import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

export function notelistGetApi(req) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}service-requests/${req.id}/notes/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetNotelistDetailSaga(payload) {
  const notelistData = yield call(notelistGetApi, payload);
  if(notelistData && notelistData.response &&  notelistData.response.status ===200 && notelistData.response.data && notelistData.response.data.length>0 ){
    yield put({
      type:types.GET_NOTESLIST_DETAIL_SUCCESS,
      payload:notelistData.response.data
    });
  }else {
    yield put({
      type: types.GET_NOTESLIST_DETAIL_FAILED
    })
  }
}

export function notelistGetbyidApi(req) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}service-requests/${req.id}/notes/${req.sid}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerGetNotelistbyidDetailSaga(payload) {
  const notelistData = yield call(notelistGetbyidApi, payload);
  if(notelistData && notelistData.response &&  notelistData.response.status ===200 && notelistData.response.data ){
    yield put({
      type:types.GET_NOTESLISTBYID_DETAIL_SUCCESS,
      payload:notelistData.response.data
    });
  }else {
    yield put({
      type: types.GET_NOTESLISTBYID_DETAIL_FAILED
    })
  }
}

export function addNoteApi(noteData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.post(`${process.env.REACT_APP_API_URL}service-requests/${noteData.id}/notes/`,noteData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerAddNewNoteSaga(action) {
  const newCollectorData = yield call(addNoteApi ,action.payload.noteData );
  if(newCollectorData && newCollectorData.response && newCollectorData.response.status ===201){
    action.payload.noteCallback(true , "Note Added Successfully");  
  }else{
    action.payload.noteCallback(false , "Something went wrong");
  }
}

export function noteUpdateApi(noteData) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}service-requests/${noteData.sid}/notes/${noteData.id}/`,noteData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerUpdateNoteSaga(action) {
  const newrequestData = yield call(noteUpdateApi ,action.payload.noteData );
  if(newrequestData && newrequestData.response && newrequestData.response.status ===200){
    action.payload.noteCallback(true , "Note Updated Successfully");  
  }else{
    action.payload.noteCallback(false , "Something went wrong");
  }
}

export function notesDeleteApi(data) {
  const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}service-requests/${data.sid}/notes/${data.id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }
  }).catch(error => ({ error }))
}

function* workerDeleteNoteSaga({payload}) {
  const id = payload.id;
  const collectorData = yield call(notesDeleteApi, payload);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Note Deleted Successfully");
    yield put({
      type: types.DELETE_NEW_NOTES_DETAIL_SUCCESS,
      payload:id
    });
  }else {
    payload.callback(false , "Something went wrong");
    yield put({
      type: types.DELETE_NEW_NOTES_DETAIL_FAILED
    })
  }
}

export function* watcherNoteRequestSaga() {
  yield takeLatest(types.GET_NOTESLISTBYID_DETAIL_REQUEST, workerGetNotelistbyidDetailSaga);
  yield takeLatest(types.GET_NOTESLIST_DETAIL_REQUEST, workerGetNotelistDetailSaga);
  yield takeLatest(types.ADD_NEW_NOTES_DETAIL_REQUEST, workerAddNewNoteSaga);
  yield takeLatest(types.UPDATE_NOTES_DETAIL_REQUEST, workerUpdateNoteSaga);
  yield takeLatest(types.DELETE_NEW_NOTES_DETAIL_REQUEST, workerDeleteNoteSaga);
}
