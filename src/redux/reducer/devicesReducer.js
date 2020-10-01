import * as types from '../actions/types';


export const initialState = {
  devices:[],
  devicesid:[],
}

export default function DevicesReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_DEVICES_DETAIL_SUCCESS:
    newState.devices= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_DEVICES_DETAIL_FAILED:
    newState.devices=[]
    return newState;

  case types.GET_DEVICESBYID_DETAIL_SUCCESS:
    newState.devicesid= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_DEVICESBYID_DETAIL_FAILED:
    newState.devicesid=[]
    return newState;

    case types.DELETE_DEVICES_DETAIL_SUCCESS:
      let devicesData = newState.devices.slice()
      devicesData && devicesData.length > 0 && devicesData.forEach((item, index) => {
        if (item.id === action.payload) {
          devicesData.splice(index, 1)
        }
      })
      newState.devices = devicesData || []
      return newState;

    case types.DELETE_DEVICES_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
