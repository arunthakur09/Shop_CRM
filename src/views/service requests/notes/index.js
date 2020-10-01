import React, { useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow, CFormGroup,
    CLabel
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//action
import { getBarcodeData } from '../../../redux/actions/barcodeAction';
import { getNoteslistData } from '../../../redux/actions/noteAction';

const card={
    width: '200%'
}

const EditTransaction = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const requestId= props.location && props.location.search ? props.location.search : "";

    const notelistData = useSelector(state => state.noteslist.noteslist);

    useEffect(()=>{
        dispatch(getBarcodeData());
        dispatch(getNoteslistData(requestId.substring(1,2)));
    },[dispatch, requestId])

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard style={card}>
                        <CCardHeader>
                            Add and View notes here
                        </CCardHeader>
                        {notelistData && notelistData.map((notes) => {
                            return(
                        <CCardBody key={notes.id} >
                            <CButton className="mr-3" color="success" style={{float:"right"}} type="button" 
                            onClick={()=>{ history.push({pathname: `/services/notes-edit`, search: `${requestId.substring(1,2)}`, state: { detail: notes , type:'Edit' }})}}>Edit</CButton>
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
                            
                        })}
                        <CCardFooter>
                            <CButton className="mr-3" color="success" onClick={()=>history.push(`/services/show-request`)}>Save Notes</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditTransaction

