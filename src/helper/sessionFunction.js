import { Base64 } from 'js-base64';
import { sessionKeys } from './sessionKeysEnum';

export const getAccessToken = () => {
  return sessionStorage.getItem(sessionKeys.accessToken);
};

export const setAccessToken = (value) => {
  sessionStorage.setItem(sessionKeys.accessToken, value);
}

export const getUserDetails = () => {
  return [sessionStorage.getItem(sessionKeys.username),sessionStorage.getItem(sessionKeys.password)];
};

export const getUsername = () => {
  return sessionStorage.getItem(sessionKeys.username);
};

export const getPassword = () => {
  return sessionStorage.getItem(sessionKeys.password);
};

export const setUserDetails = (value) => {
  let password = Base64.encode(value.password);
  sessionStorage.setItem(sessionKeys.username, value.username);
  sessionStorage.setItem(sessionKeys.password, password+'?qwaszx');
  let pass = sessionStorage.getItem(sessionKeys.password);
  // console.log(Base64.decode(pass.substring(0, pass.indexOf('?'))));
}

 export const getCSRFTOKEN =()=> {
  return sessionStorage.getItem(sessionKeys.csrfToken);
 }

 export const setCSRFTOKEN =(value)=> {
  return sessionStorage.setItem(sessionKeys.csrfToken ,value);
 }




