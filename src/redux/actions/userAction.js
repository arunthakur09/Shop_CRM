import { GET_USERS_DETAIL_REQUEST, UPDATE_USERPROFILEDATA_DETAIL_REQUEST,
    DELETE_USERS_DETAIL_REQUEST, ADD_USERS_DETAIL_REQUEST,
    UPDATE_USERS_DETAIL_REQUEST, UPDATE_USERSPASS_DETAIL_REQUEST,
    GET_USERSBYID_DETAIL_REQUEST, GET_PERMISSIONS_DETAIL_REQUEST,
    GET_USERSPROFILE_DETAIL_REQUEST, UPDATE_USERPROFILEPASS_DETAIL_REQUEST
 } from './types';

 //permissions
 export const getPermissionData= () => {
    return ({
        type: GET_PERMISSIONS_DETAIL_REQUEST,
    })
}

//user-profile
export const getUserprofileData= () => {
    return ({
        type: GET_USERSPROFILE_DETAIL_REQUEST,
    })
}

export const updateUserprofilepassData = (userData ,userCallback  ) => {
    return ({
        type: UPDATE_USERPROFILEPASS_DETAIL_REQUEST ,
        payload:{ userData , userCallback}
    })
}

export const updateUserProfileData = (userData ,userCallback  ) => {
    return ({
        type: UPDATE_USERPROFILEDATA_DETAIL_REQUEST ,
        payload:{ userData , userCallback}
    })
}

//user by id
export const getUserDataByid= (id) => {
    return ({
        type: GET_USERSBYID_DETAIL_REQUEST,
        id: id
    })
}

export const updateUserpassData = (userData ,userCallback  ) => {
    return ({
        type: UPDATE_USERSPASS_DETAIL_REQUEST ,
        payload:{ userData , userCallback}
    })
}

//user
export const getUserData= () => {
    return ({
        type: GET_USERS_DETAIL_REQUEST,
    })
}

export const addNewUserData = (userData ,userCallback  ) => {
    return ({
        type: ADD_USERS_DETAIL_REQUEST ,
        payload:{ userData , userCallback}
    })
}

export const updateUserData = (userData ,userCallback  ) => {
    return ({
        type: UPDATE_USERS_DETAIL_REQUEST ,
        payload:{ userData , userCallback}
    })
}

export const deleteUserData= (id , handleDeleteCallback) => {
    return ({
        type: DELETE_USERS_DETAIL_REQUEST,
        payload: {
            id: id,
            callback:handleDeleteCallback
        }
    })
}