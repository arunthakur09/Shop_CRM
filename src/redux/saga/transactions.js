import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { GET_TRANSACTIONS_DETAIL_REQUEST, GET_TRANSACTIONS_DETAIL_SUCCESS, GET_TRANSACTIONS_DETAIL_FAILED,
  DELETE_TRANSACTIONS_DETAIL_REQUEST, DELETE_TRANSACTIONS_DETAIL_SUCCESS, DELETE_TRANSACTIONS_DETAIL_FAILED,
  ADD_NEW_TRANSACTIONS_DETAIL_REQUEST, UPDATE_TRANSACTIONS_DETAIL_REQUEST, GET_TRANSACTIONSBYID_DETAIL_REQUEST,
  GET_TRANSACTIONS_BYCUSTOMER_DETAIL_REQUEST, GET_TRANSACTIONS_BYCUSTOMER_DETAIL_SUCCESS, GET_TRANSACTIONSBYID_DETAIL_SUCCESS,
  GET_TRANSACTIONS_BYCUSTOMER_DETAIL_FAILED , GET_TRANSACTIONSBYID_DETAIL_FAILED} from '../actions/types';
import { getAccessToken }  from '../../helper/sessionFunction';

//Transactions By Customer
export function transactionsBycustomerGetApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}transactions/customer/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetTransactionsBycustomerGetApiDetailSaga(payload) {
  const id = payload.id;
const transactionData = yield call(transactionsBycustomerGetApi, id);
if(transactionData && transactionData.response &&  transactionData.response.status ===200 && transactionData.response.data && transactionData.response.data.length>0 ){
yield put({
     type:GET_TRANSACTIONS_BYCUSTOMER_DETAIL_SUCCESS,
     payload:transactionData.response.data
   });
}
else {
yield put({
   type: GET_TRANSACTIONS_BYCUSTOMER_DETAIL_FAILED
 })
 }
} 

//Transactions
export function transactionsGetApi() {
   const accessToken= getAccessToken();
  let token= accessToken ? accessToken :'';
   return  axios.get(`${process.env.REACT_APP_API_URL}transactions/`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  }).then(response =>  {
    return{ response }})
  .catch(error => ({ error }))
}

 function* workerGetTransactionsGetApiDetailSaga() {
 const transactionData = yield call(transactionsGetApi);
 if(transactionData && transactionData.response &&  transactionData.response.status ===200 && transactionData.response.data && transactionData.response.data.length>0 ){
 yield put({
      type:GET_TRANSACTIONS_DETAIL_SUCCESS,
      payload:transactionData.response.data
    });
 }
 else {
 yield put({
    type: GET_TRANSACTIONS_DETAIL_FAILED
  })
  }
}

export function transactionsGetbyidApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.get(`${process.env.REACT_APP_API_URL}transactions/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerGetTransactionsGetApibyidDetailSaga(action) {
const transactionData = yield call(transactionsGetbyidApi, action.id);
if(transactionData && transactionData.response &&  transactionData.response.status ===200 && transactionData.response.data){
yield put({
     type:GET_TRANSACTIONSBYID_DETAIL_SUCCESS,
     payload:transactionData.response.data
   });
}
else {
yield put({
   type: GET_TRANSACTIONSBYID_DETAIL_FAILED
 })
 }
}

export function addTransactionApi(transactionData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.post('https://backendcpv.dmlabs.in/api/v1/transactions/',transactionData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerAddTransactionRequestSaga(action) {
const transactionData = yield call(addTransactionApi ,action.payload.transactionData );
if(transactionData && transactionData.response && transactionData.response.status ===201){
    action.payload.transactionCallback(true , "Transaction Added Successfully");  
}
else{
    action.payload.transactionCallback(false , "Something went wrong");
}
}

export function transactionUpdateApi(transactionData) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.put(`${process.env.REACT_APP_API_URL}transactions/${transactionData.id}/`,transactionData, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerUpdateTransactionRequestSaga(action) {
const newtransactionData = yield call(transactionUpdateApi ,action.payload.transactionData );
if(newtransactionData && newtransactionData.response && newtransactionData.response.status ===200){
    action.payload.transactionCallback(true , "Transaction Updated Successfully");  
}
else{
    action.payload.transactionCallback(false , "Something went wrong");
}
}

export function tranactionsDeleteApi(id) {
  const accessToken= getAccessToken();
 let token= accessToken ? accessToken :'';
  return  axios.delete(`${process.env.REACT_APP_API_URL}transactions/${id}/`, {
   headers: {
     'Authorization': `Token ${token}`
   }
 }).then(response =>  {
   return{ response }})
 .catch(error => ({ error }))
}

function* workerDeletetransactionsDetailSaga({payload}) {
  const id = payload.id
  const collectorData = yield call(tranactionsDeleteApi, id);
  if(collectorData && collectorData.response &&  collectorData.response.status ===204){
    payload.callback(true , "Transaction Deleted Successfully");
  yield put({
       type:DELETE_TRANSACTIONS_DETAIL_SUCCESS,
       payload:id
     });
  }
  else {
    payload.callback(false , "Something went wrong");
  yield put({
     type: DELETE_TRANSACTIONS_DETAIL_FAILED
   })
 }
  }

export function* watcherTransactionsRequestSaga() {
  yield takeLatest(GET_TRANSACTIONSBYID_DETAIL_REQUEST, workerGetTransactionsGetApibyidDetailSaga);
 yield takeLatest(GET_TRANSACTIONS_DETAIL_REQUEST, workerGetTransactionsGetApiDetailSaga);
 yield takeLatest(GET_TRANSACTIONS_BYCUSTOMER_DETAIL_REQUEST, workerGetTransactionsBycustomerGetApiDetailSaga);
 yield takeLatest(ADD_NEW_TRANSACTIONS_DETAIL_REQUEST, workerAddTransactionRequestSaga);
 yield takeLatest(UPDATE_TRANSACTIONS_DETAIL_REQUEST, workerUpdateTransactionRequestSaga);
 yield takeLatest(DELETE_TRANSACTIONS_DETAIL_REQUEST, workerDeletetransactionsDetailSaga);
}