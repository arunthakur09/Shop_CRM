import * as types from '../actions/types';

export const initialState = {
  noteslist:[],
}

export default function NoteListReducer(state = initialState, action) {
  let newState = { ...state }

  switch (action.type) {
  case types.GET_NOTESLIST_DETAIL_SUCCESS:
    newState.noteslist= action && action.payload ? action.payload :[]
    return newState;

  case types.GET_NOTESLIST_DETAIL_FAILED:
    newState.noteslist=[]
    return newState;

    case types.DELETE_NEW_NOTES_DETAIL_SUCCESS:
      let noteslistData = newState.noteslist.slice()
      noteslistData && noteslistData.length > 0 && noteslistData.forEach((item, index) => {
        if (item.id === action.payload) {
          noteslistData.splice(index, 1)
        }
      })
      newState.noteslist = noteslistData || []
      return newState;

    case types.DELETE_NEW_NOTES_DETAIL_FAILED:
      return newState;

 default: { return state }
  }
}
