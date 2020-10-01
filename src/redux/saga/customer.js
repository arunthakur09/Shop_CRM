import axios from 'axios';
import { Base64 } from 'js-base64';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUserDetails }  from '../../helper/sessionFunction';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { loginRequestAction } from '../actions/loginAction';
import { GET_CUSTOMER_DETAIL_REQUEST, GET_CUSTOMER_DETAIL_SUCCESS, GET_CUSTOMER_DETAIL_FAILED,
  ADD_NEW_CUSTOMER_DETAIL_REQUEST, UPDATE_CUSTOMER_DETAIL_REQUEST, DELETE_CUSTOMER_DETAIL_REQUEST,
  DELETE_CUSTOMER_DETAIL_FAILED, DELETE_CUSTOMER_DETAIL_SUCCESS, GET_CUSTOMERBYID_DETAIL_FAILED,
  GET_CUSTOMERBYID_DETAIL_REQUEST, GET_CUSTOMERBYID_DETAIL_SUCCESS } from '../actions/types';
import { getAccessToken, getPassword, getUsername }  from '../../helper/sessionFunction';

export function customerGetbyidApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`https://backendcpv.dmlabs.in/api/v1/customers/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetCustomerbyidDetailSaga(action) {
const customerData = yield call(customerGetbyidApi, action.id);
if(customerData && customerData.response &&  customerData.response.status === 200 && customerData.response.data){
yield put({
     type:GET_CUSTOMERBYID_DETAIL_SUCCESS,
     payload:customerData.response.data
   });
}else if(customerData.error.response.status ===401){
 const user= yield call(getUsername);
 let password= yield call(getPassword);
 password = Base64.decode(password.substring(0, password.indexOf('?')));
 loginRequestAction({ username: user, password });
}
else {
yield put({
   type: GET_CUSTOMERBYID_DETAIL_FAILED
 })
 }
}

export function customerGetApi() {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get('https://backendcpv.dmlabs.in/api/v1/customers/', {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
}


 function* workerGetCustomerDetailSaga() {
 const customerData = yield call(customerGetApi);
 if(customerData && customerData.response &&  customerData.response.status === 200 && customerData.response.data && customerData.response.data.length>0 ){
 yield put({
      type:GET_CUSTOMER_DETAIL_SUCCESS,
      payload:customerData.response.data
    });
 }else if(customerData.error.response.status ===401){
  const user= yield call(getUsername);
  let password= yield call(getPassword);
  password = Base64.decode(password.substring(0, password.indexOf('?')));
  loginRequestAction({ username: user, password });
 }
 else {
 yield put({
    type: GET_CUSTOMER_DETAIL_FAILED
  })
  }
}

export function addCustomerApi(customerData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/customers/',customerData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerAddNewCustomerSaga(action) {
const newCustomerData = yield call(addCustomerApi ,action.payload.customerData );
if(newCustomerData && newCustomerData.response && newCustomerData.response.status ===201){
    action.payload.customerCallback(true , "Customer Added Successfully");  
}
else{
    action.payload.customerCallback(false , "Something went wrong");
}
}

export function customerUpdateApi(customerData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}customers/${customerData.id}/`,customerData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdateCustomerSaga(action) {
const newCustomerData = yield call(customerUpdateApi ,action.payload.customerData );
if(newCustomerData && newCustomerData.response && newCustomerData.response.status ===200){
    action.payload.customerCallback(true , "Customer Updated Successfully");  
}
else{
    action.payload.customerCallback(false , "Something went wrong");
}
}

export function customerDeleteApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}customers/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))

}

function* workerDeleteCustomerDetailSaga({payload}) {
  const id = payload.id;
  const collectorData = yield call(customerDeleteApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Customer Deleted Successfully");
  yield put({
       type:DELETE_CUSTOMER_DETAIL_SUCCESS,
       payload:id
     });
  }
  else {
    payload.callback(false , "Something went wrong");
  yield put({
     type: DELETE_CUSTOMER_DETAIL_FAILED
   })
 }
}

export function* watcherCustomerRequestSaga() {
  yield takeLatest(GET_CUSTOMERBYID_DETAIL_REQUEST, workerGetCustomerbyidDetailSaga);
 yield takeLatest(GET_CUSTOMER_DETAIL_REQUEST, workerGetCustomerDetailSaga);
 yield takeLatest(ADD_NEW_CUSTOMER_DETAIL_REQUEST , workerAddNewCustomerSaga);
 yield takeLatest(UPDATE_CUSTOMER_DETAIL_REQUEST, workerUpdateCustomerSaga);
 yield takeLatest(DELETE_CUSTOMER_DETAIL_REQUEST, workerDeleteCustomerDetailSaga);
}