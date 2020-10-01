import * as types from '../actions/types';


export const initialState = {
  notes:[],
}

export default function NoteReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
    case types.GET_NOTESLISTBYID_DETAIL_SUCCESS:
      newState.notes= action && action.payload ? action.payload :[]
      return newState;
  
    case types.GET_NOTESLISTBYID_DETAIL_FAILED:
      newState.notes=[]
      return newState;

  case types.ADD_NEW_NOTES_DETAIL_SUCCESS:
    newState.notes= action && action.payload ? action.payload :[]
    return newState;

  case types.ADD_NEW_NOTES_DETAIL_FAILED:
    newState.notes=[]
    return newState;

 default: { return state }
  }
}
