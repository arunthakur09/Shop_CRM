import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow, CFormGroup,
    CLabel
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//action
import { getBarcodeData } from '../../../redux/actions/barcodeAction';
import { getNoteslistData,deleteNotesData } from '../../../redux/actions/noteAction';

const card={
    width: '200%'
}

const ShowNotes = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const requestId= props.location && props.location.search ? props.location.search : "";
    const [servid, setServid] = useState('');

    const notelistData = useSelector(state => state.noteslist.noteslist);

    useEffect(()=>{
        setServid(requestId.substring(1,requestId.length))
        dispatch(getNoteslistData(requestId.substring(1,requestId.length)));
    },[dispatch, requestId, setServid])
    
    const handleDeleteNoteCallback = (value, message) => {
        if (value) {
            alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
        }
        else if(!value){
            alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
    }
    
    const handleDelete = (e, id) => {
        e.preventDefault()
        if(id){
            dispatch(deleteNotesData({id, servid} , handleDeleteNoteCallback))
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard style={card}>
                        <CCardHeader>
                            Add and View notes here
                            <CButton className="mr-3" color="success" style={{float:"right"}} type="button" 
                            onClick={()=>{ history.push({pathname: `/services/notes-edit/new`, search: `${requestId.substring(1,requestId.length)}`})}}>Add</CButton>
                        </CCardHeader>
                        {notelistData.length>0 ? notelistData && notelistData.map((notes) => {
                            return(
                        <CCardBody key={notes.id} >
                        <CButton className="mr-3" color="success" style={{float:"right"}} type="button" 
                        onClick={(e)=> handleDelete(e, notes.id)}>Delete</CButton>
                            <CButton className="mr-3" color="success" style={{float:"right"}} type="button" 
                            onClick={()=>{ history.push({pathname: `/services/notes-edit/${notes.id}`, search: `${requestId.substring(1,requestId.length)}`, state: { detail: notes , type:'Edit' }})}}>Edit</CButton>
                        <CForm action=""  encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">Subject:</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">{notes.subject}</CCol>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">Description:</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">{notes.description}</CCol>
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                            )
                        }):<p style={{marginLeft:'50%'}}>No Notes Available</p>}
                        <CCardFooter>
                            <CButton className="mr-3" color="success" onClick={()=>history.push(`/services/show-request`)}>Back</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default ShowNotes

