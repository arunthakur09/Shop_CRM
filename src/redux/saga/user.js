import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_USERS_DETAIL_REQUEST, GET_USERS_DETAIL_SUCCESS, GET_USERS_DETAIL_FAILED,
  DELETE_USERS_DETAIL_REQUEST, DELETE_USERS_DETAIL_SUCCESS, DELETE_USERS_DETAIL_FAILED,
  ADD_USERS_DETAIL_REQUEST, UPDATE_USERS_DETAIL_REQUEST, GET_USERSBYID_DETAIL_REQUEST,
  GET_USERSBYID_DETAIL_SUCCESS, GET_USERSBYID_DETAIL_FAILED, GET_PERMISSIONS_DETAIL_FAILED,
  GET_PERMISSIONS_DETAIL_SUCCESS, GET_PERMISSIONS_DETAIL_REQUEST, UPDATE_USERSPASS_DETAIL_REQUEST,
  UPDATE_USERPROFILEPASS_DETAIL_REQUEST, UPDATE_USERPROFILEDATA_DETAIL_REQUEST,
  GET_USERSPROFILE_DETAIL_REQUEST, GET_USERSPROFILE_DETAIL_SUCCESS, GET_USERSPROFILE_DETAIL_FAILED} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

//permission
export function userGetPermssionsidApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}permissions/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetPermissionsDetailSaga({id}) {
  const userData = yield call(userGetPermssionsidApi, id);
  if(userData && userData.response &&  userData.response.status ===200 && userData.response.data ){
    yield put({
         type:GET_PERMISSIONS_DETAIL_SUCCESS,
         payload:userData.response.data
       });
    }
    else {
    yield put({
       type: GET_PERMISSIONS_DETAIL_FAILED
     })
     }
   }

//userbyid
export function userGetbyidApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}user/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetuserbyidDetailSaga({id}) {
  const userData = yield call(userGetbyidApi, id);
  if(userData && userData.response &&  userData.response.status ===200 && userData.response.data ){
    yield put({
         type:GET_USERSBYID_DETAIL_SUCCESS,
         payload:userData.response.data
       });
    }
    else {
    yield put({
       type: GET_USERSBYID_DETAIL_FAILED
     })
     }
   }

//user-Profile
export function usersprofileGetApi() {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}user/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetuserprofileGetApiDetailSaga() {
const userData = yield call(usersprofileGetApi);
if(userData && userData.response &&  userData.response.status ===200 && userData.response.data  ){
yield put({
     type:GET_USERSPROFILE_DETAIL_SUCCESS,
     payload:userData.response.data
   });
}
else {
yield put({
   type: GET_USERSPROFILE_DETAIL_FAILED
 })
 }
}

export function userUpdateprofilepassApi(userData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}user/update-password`,userData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdateUserprofilepassRequestSaga(action) {
const newtransactionData = yield call(userUpdateprofilepassApi ,action.payload.userData );
if(newtransactionData && newtransactionData.response && newtransactionData.response.status ===200){
    action.payload.userCallback(true , "User Password Updated Successfully");  
}
else{
    action.payload.userCallback(false , newtransactionData && newtransactionData.error && newtransactionData.error.response && newtransactionData.error.response.data.new_password ? newtransactionData.error.response.data.new_password[0] : newtransactionData.error.response.data.old_password[0]);
}
}

export function userUpdateprofiledataApi(userData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}user/`,userData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdateUserprofiledataRequestSaga(action) {
const newtransactionData = yield call(userUpdateprofiledataApi ,action.payload.userData );
if(newtransactionData && newtransactionData.response && newtransactionData.response.status ===200){
    action.payload.userCallback(true , "User Data Updated Successfully");  
}
else{
    action.payload.userCallback(false , newtransactionData && newtransactionData.error && newtransactionData.error.response && newtransactionData.error.response.data.new_password ? newtransactionData.error.response.data.new_password[0] : newtransactionData.error.response.data.old_password[0]);
}
}

//user
export function usersGetApi() {
    const accessToken= getAccessToken();
   let token= accessToken ? accessToken :'';
    return  axios.get(`${process.env.REACT_APP_API_URL}user/list/`, {
     headers: {
       'Authorization': `Token ${token}`
     }
   }).then(response =>  {
     return{ response }})
   .catch(error => ({ error }))
 }
 
  function* workerGetusersGetApiDetailSaga() {
  const userData = yield call(usersGetApi);
  if(userData && userData.response &&  userData.response.status ===200 && userData.response.data && userData.response.data.length>0 ){
  yield put({
       type:GET_USERS_DETAIL_SUCCESS,
       payload:userData.response.data
     });
  }
  else {
  yield put({
     type: GET_USERS_DETAIL_FAILED
   })
   }
 }
 
 export function addUserApi(userData) {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.post('https://backendcpv.dmlabs.in/api/v1/user/list/',userData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
 }
 
 function* workerAddUserRequestSaga(action) {
 const transactionData = yield call(addUserApi ,action.payload.userData );
 if(transactionData && transactionData.response && transactionData.response.status ===201){
     action.payload.userCallback(true , "User Added Successfully");  
 }
 else{
     action.payload.userCallback(false , transactionData && transactionData.error && transactionData.error.response && transactionData.error.response.data);
 }
 }
 
 export function userUpdateApi(userData) {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.put(`${process.env.REACT_APP_API_URL}user/${userData.id}/`,userData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
 }
 
 function* workerUpdateUserRequestSaga(action) {
 const newtransactionData = yield call(userUpdateApi ,action.payload.userData );
 if(newtransactionData && newtransactionData.response && newtransactionData.response.status ===200){
     action.payload.userCallback(true , "User Updated Successfully");  
 }
 else{
     action.payload.userCallback(false , "Something went wrong");
 }
 }
 
 export function userDeleteApi(id) {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.delete(`${process.env.REACT_APP_API_URL}user/${id}/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
 }
 
 function* workerDeleteusersDetailSaga({payload}) {
   const id = payload.id
   const collectorData = yield call(userDeleteApi, id);
   if(collectorData && collectorData.response &&  collectorData.response.status ===204){
     payload.callback(true , "User Deleted Successfully");
   yield put({
        type:DELETE_USERS_DETAIL_SUCCESS,
        payload:id
      });
   }
   else {
     payload.callback(false , "Something went wrong");
   yield put({
      type: DELETE_USERS_DETAIL_FAILED
    })
  }
   }

// update password
export function userUpdatepassApi(userData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}user/${userData.id}/update-password`,userData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdateUserpassRequestSaga(action) {
const newtransactionData = yield call(userUpdatepassApi ,action.payload.userData );
if(newtransactionData && newtransactionData.response && newtransactionData.response.status ===200){
    action.payload.userCallback(true , "User Password Updated Successfully");  
}
else{
    action.payload.userCallback(false , newtransactionData && newtransactionData.error && newtransactionData.error.response && newtransactionData.error.response.data.password[0]);
}
}

export function* watcherusersRequestSaga() {
  yield takeLatest(GET_USERSPROFILE_DETAIL_REQUEST, workerGetuserprofileGetApiDetailSaga);
  yield takeLatest(GET_PERMISSIONS_DETAIL_REQUEST, workerGetPermissionsDetailSaga);
  yield takeLatest(GET_USERSBYID_DETAIL_REQUEST, workerGetuserbyidDetailSaga);
    yield takeLatest(GET_USERS_DETAIL_REQUEST, workerGetusersGetApiDetailSaga);
    yield takeLatest(ADD_USERS_DETAIL_REQUEST, workerAddUserRequestSaga);
    yield takeLatest(UPDATE_USERPROFILEDATA_DETAIL_REQUEST, workerUpdateUserprofiledataRequestSaga);
    yield takeLatest(UPDATE_USERS_DETAIL_REQUEST, workerUpdateUserRequestSaga);
    yield takeLatest(UPDATE_USERPROFILEPASS_DETAIL_REQUEST, workerUpdateUserprofilepassRequestSaga);
    yield takeLatest(UPDATE_USERSPASS_DETAIL_REQUEST, workerUpdateUserpassRequestSaga);
    yield takeLatest(DELETE_USERS_DETAIL_REQUEST, workerDeleteusersDetailSaga);
   }