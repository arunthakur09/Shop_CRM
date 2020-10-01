import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow, CFormGroup,
    CLabel, CInput
} from '@coreui/react';
import { TextAreaInput } from '../../../containers';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//action
import { addNoteData, updateNoteData, getNotesbyidData } from '../../../redux/actions/noteAction';

const EditNotes = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();

    const requestId= props.location && props.location.search ? props.location.search : "";
    const [subject , setSubject]=useState('');
    const [id , setId]=useState('');
    const [description, setDescription] = useState('');
    const [serviceid, setServid] = useState('');
    const [error, setError] = useState([]);

    let noteId= props.location && props.location.pathname && props.location.pathname;
    noteId = noteId.substring(noteId.lastIndexOf('/')+1, noteId.length);

    const editType= noteId ==='new' ? "New" : "Edit";

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getNotesbyidData(requestId.substring(1,requestId.length), noteId));
        }
    },[dispatch, editType, noteId, requestId]);

    const servicesD = useSelector(state => state.notes.notes);
    console.log()
    const servicesData = [servicesD];

    useEffect(() => {
        if(editType==="Edit" ){
            if(servicesData && servicesData.length>0){
                servicesData.forEach((item) => {  
          setId(item.id ? item.id :'');
          setSubject(item.subject ? item.subject :'');
          setDescription(item.description ? item.description :'');
        })
    }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [servicesD]);

    useEffect(()=>{
        const requestId= props.location && props.location.search ? props.location.search : "";
        setServid(requestId ? requestId.substring(1,requestId.length) :'');
    },[dispatch, props.location, requestId])

    const handleRequestCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
          history.push(`/services/notes?${serviceid}`)
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
      }

      const handleFormValidation = () => {
          const error = [];
  
          if (!subject || subject === '-----') {
              error.push('subject')
          }
  
          if (!description) {
              error.push('description')
          }
          return error;
      }

    const handleAddTransaction = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (subject && description  ) {
              if(editType==="New") {
                  const  requestObj={
                    id: serviceid,
                    subject: subject,
                    description: description,
             }
             dispatch(addNoteData(requestObj, handleRequestCallback));
            } 
            else {
                const  requestObj={
                    id: parseInt(id),
                    sid: parseInt(serviceid),
                    subject: subject,
                    description: description,
           }
           dispatch(updateNoteData(requestObj, handleRequestCallback));
          }
            }
        }
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard >
                        <CCardHeader>
                            {editType} note
                        </CCardHeader>
                        <CCardBody key={id} >
                        <CForm action=""  encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                                <CCol md="3">
                                    <CLabel htmlFor="text-input">Subject:</CLabel>
                                </CCol>
                                    <CCol md="9" >
                                        <CInput type="subject" id="subject-input" name="subject-input" placeholder="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
                                    </CCol><br /></CFormGroup>

                            <TextAreaInput value={description} error={error} type="description" title="Description: " handleInputChange={(event) => setDescription(event.target.value)} rows={2} />
                        </CForm>
                    </CCardBody>
                        <CCardFooter>
                            <CButton className="mr-3" color="success" onClick={()=>history.push(`/services/notes?${serviceid}`)}>Back</CButton>
                            <CButton className="mr-3" style={{float: "right"}} color="success" onClick={() => handleAddTransaction()}>{editType ==="New" ? 'Add Note' : 'Update Note'}</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditNotes

