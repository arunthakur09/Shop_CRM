import axios from 'axios';
import { getAccessToken, getCSRFTOKEN } from '../helper/sessionFunction';


export const api = {
  axios: axios.create()
}
api.axios.interceptors.request.use(request => {

  const authToken = getAccessToken();
  const cerfToken = getCSRFTOKEN()
  const token = authToken|| '';
  const headersWithToken = `Token${token}`
    ? {
      ...request.headers,
      Authorization: token,
      "X-CSRFTOKEN": cerfToken
    }
    : request.headers
  return {
    ...request,
    headers: headersWithToken
  };
});
api.axios.interceptors.response.use(response => {
    return response;
  }, function (error) {

    // Handle 403 errors
   {/* if (error.response.status === 403) {
      store.dispatch(logout());
      return Promise.reject(error);
    }**/}
    // Handle 401 errors
   throw error;
  });

