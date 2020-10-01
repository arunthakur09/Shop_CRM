import { LOGIN_REQUEST } from './types';

export const loginRequestAction = (loginData , loginCallback) => {
    return ({
        type: LOGIN_REQUEST,
        payload:{loginData , loginCallback}
    })
}
