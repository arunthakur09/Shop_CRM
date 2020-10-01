import * as types from '../actions/types';

export const initialState = {
  users:[],
  userbyid:[],
  permission: [],
  userprofile: []
}

export default function UserReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_USERS_DETAIL_SUCCESS:
    newState.users= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_USERS_DETAIL_FAILED:
    newState.users=[]
    return newState;

    //Permissions
    case types.GET_PERMISSIONS_DETAIL_SUCCESS:
      newState.permission= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_PERMISSIONS_DETAIL_FAILED:
      newState.permission=[]
      return newState;

    //User-Profile 
    case types.GET_USERSPROFILE_DETAIL_SUCCESS:
      newState.userprofile= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_USERSPROFILE_DETAIL_FAILED:
      newState.userprofile=[]
      return newState;
    
  //User by id
  case types.GET_USERSBYID_DETAIL_SUCCESS:
    newState.userbyid= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_USERSBYID_DETAIL_FAILED:
    newState.userbyid=[]
    return newState;

    case types.DELETE_USERS_DETAIL_SUCCESS:
      let usersData = newState.users.slice()
      usersData && usersData.length > 0 && usersData.forEach((item, index) => {
        if (item.id === action.payload) {
          usersData.splice(index, 1)
        }
      })
      newState.users = usersData || []
      return newState;

    case types.DELETE_USERS_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
