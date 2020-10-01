import React, { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CRow
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { useAlert } from "react-alert";
import { isValidEmail } from '../../../helper'
import { TextInput } from '../../../containers';
//action
import { addNewCollectorData, updateCollectorData, getCollectorbyidData } from '../../../redux/actions/collectorAction';


const EditForms = (props) => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState([]);
  
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getCollectorbyidData(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const collectorD = useSelector(state => state.collector.collectorid);
    const collectorData = [collectorD];

  useEffect(() => {
    if(editType==="Edit" ){
        if(collectorData && collectorData.length>0){
            collectorData.forEach((item) => {
      setId(item.id ? item.id :'');
      setFirstName(item.first_name ? item.first_name :'');
      setLastName(item.last_name ? item.last_name :'');
      setEmail(item.email ? item.email :'');
      setEmployeeId(item.employee_id ? item.employee_id :'');
      setMobile(item.mobile ? item.mobile :'');
    })
  }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [collectorD]);

 useEffect(() => {
  if(editType==="New" ){
   setId('');
   setFirstName('');
   setLastName('');
   setEmployeeId('');
   setMobile('');
   setEmail('');
}}, [editType])

  const handleInputChange = (event, type) => {
    const re = /^[0-9\b]+$/;
    if (type === 'firstName') {
      if (error.includes('firstName')) {
        const errorremained = error.filter((value) => { return value !== "firstName"; })
        setError(errorremained);
      }
      setFirstName(event.target.value);
    }
    else if (type === 'lastName') {
      if (error.includes('lastName')) {
        const errorremained = error.filter((value) => { return value !== "lastName"; })
        setError(errorremained);
      }
      setLastName(event.target.value);
    }

    else if (type === 'employeeId') {
      if (event.target.value === '' || re.test(event.target.value)) {
        if (error.includes('employeeId')) {
          const errorremained = error.filter((value) => { return value !== "employeeId"; })
          setError(errorremained);
        }
        setEmployeeId(event.target.value);
      }
    }

    else if (type === 'email') {
      if (error.includes('email')) {
        const errorremained = error.filter((value) => { return value !== "email"; })
        setError(errorremained);
      }
      setEmail(event.target.value);
    }

    else if (type === 'mobile') {
      if (event.target.value === '' || re.test(event.target.value)) {
        if (error.includes('mobile')) {
          const errorremained = error.filter((value) => { return value !== "mobile"; })
          setError(errorremained);
        }
        setMobile(event.target.value);
      }
    }
  }

  const handleCollectorCallback = (value, message) => {
    if (value) {
      alert.show(message, { timeout: 2000, type: 'success' , position: 'middle'});
      history.push('/collectors/show-collector')
    }
    else if(!value){
      alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
    }
  }

  const handleAddColector = () => {
    const error = handleFormValidation();
    if (error && error.length > 0) {
      setError(error);
    }
    else {
      if (firstName && lastName && email && employeeId && mobile) {
        if(editType ==="New" ){
        const  collectorObj={first_name:firstName ,last_name:lastName, employee_id:employeeId,
          email :email ,mobile :mobile  }
        dispatch(addNewCollectorData(collectorObj, handleCollectorCallback));
        } 
        else {
            const  customerObj={id:id,first_name:firstName ,last_name:lastName, employee_id:employeeId,
              email :email ,mobile :mobile  }
       dispatch(updateCollectorData(customerObj, handleCollectorCallback));
      }
      }
    }
  }


  const handleFormValidation = () => {
    const error = [];

    if (!firstName) {
      error.push('firstName')
    }
    if (!lastName) {
      error.push('lastName')
    }
    if (!email || !isValidEmail(email)) {
      error.push('email')
    }
    if (!employeeId) {
      error.push('employeeId')
    }
    if (!mobile) {
      error.push('mobile')
    }
    return error;
  }

  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              {editType} Collector
                        </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <TextInput errorMessage="Please enter a First Name" value={firstName} error={error} type="firstName" title="First Name*: " handleInputChange={handleInputChange} />
                <TextInput errorMessage="Please enter a Last Name" value={lastName} error={error} type="lastName" title="Last Name*: " handleInputChange={handleInputChange} />
                <TextInput errorMessage="Please enter a ID" value={employeeId} error={error} type="employeeId" title="Employee ID*: " handleInputChange={handleInputChange} />
                <TextInput errorMessage="Please enter a  valid Email Address" value={email} error={error} type="email" title="Email ID*: " handleInputChange={handleInputChange} />
                <TextInput errorMessage="Please enter a Mobile Number" value={mobile} error={error} type="mobile" title="Mobile*: " handleInputChange={handleInputChange} />

              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/collectors/show-collector'})}} color="success" >Back</CButton>
              <CButton shape="square" style={{float: 'right'}} color="success" onClick={() => handleAddColector()}> {editType ==="New" ? 'Add Collector' : 'Update Collector'}</CButton>
            </CCardFooter>
          </CCard>

        </CCol>

      </CRow>

    </>
  )
}

export default EditForms

