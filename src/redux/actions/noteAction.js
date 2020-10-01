import * as types from '../actions/types';

export const getNoteslistData= (id) => {
    return ({
        type: types.GET_NOTESLIST_DETAIL_REQUEST,
            id: id
    })
}

export const getNotesbyidData= (id, sid) => {
    return ({
        type: types.GET_NOTESLISTBYID_DETAIL_REQUEST,
            id: id,
            sid: sid
    })
}

export const addNoteData = (noteData, noteCallback  ) => {
    return ({
        type: types.ADD_NEW_NOTES_DETAIL_REQUEST ,
        payload:{ noteData, noteCallback}
    })
}

export const updateNoteData = (noteData, noteCallback  ) => {
    return ({
        type: types.UPDATE_NOTES_DETAIL_REQUEST ,
        payload:{ noteData, noteCallback}
    })
}

export const deleteNotesData= (id , handleDeleteCallback) => {
    return ({
        type: types.DELETE_NEW_NOTES_DETAIL_REQUEST,
        payload: {
            id: id.id,
            sid: id.servid,
            callback: handleDeleteCallback
        }
    })
}
