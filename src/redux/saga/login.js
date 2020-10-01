import axios from 'axios';

import { takeLatest, call, put  } from 'redux-saga/effects';
import { LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAILED } from '../actions/types';
import { setAccessToken, setUserDetails }  from '../../helper/sessionFunction';


export function loginApi(loginData) {
return axios.post(`${process.env.REACT_APP_API_URL}user/login/`, loginData, {withCredentials:true })
    .then(response =>  {
      return{ response }})
    .catch(error => ({ error }))
}

 function* workerLoginRequestSaga(action) {
   const loginResult = yield call(loginApi , action.payload.loginData);
  if(loginResult && loginResult.response &&  loginResult.response.status ===200 && loginResult.response.data && loginResult.response.data.user ){
      sessionStorage.setItem('isstaff', loginResult.response.data.user.is_staff===true?'S':'NS');
      yield call(setUserDetails ,action.payload.loginData);
      yield call(setAccessToken ,loginResult.response.data.access_token);
      yield put({
        type:LOGIN_SUCCESS,
        payload:loginResult.response.data.user
      });
      action.payload.loginCallback(true , "You are successfully logged in");

    } else {
      action.payload.loginCallback(false ,'Invalid login details');
     yield put({
      type: LOGIN_FAILED
    })
    }

}


export function* watcherLoginRequestSaga() {
 yield takeLatest(LOGIN_REQUEST, workerLoginRequestSaga);

}