import React, { useState , useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter,
    CCardHeader, CCol, CForm, CRow
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

import { TextInput ,TextAreaInput, SelectInputObj } from '../../../containers';

//action
import {getCustomerData} from '../../../redux/actions/customerAction';
import {getCustomerBarcodeData} from '../../../redux/actions/customerbarcodeAction';
import {addNewRequestData, updateRequestData, getServiceRequestbyidData} from '../../../redux/actions/servicerequestsAction';

const EditForms = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const [id, setId] = useState('');
    const [customer, setCustomer] = useState('');
    const [barcode, setBarcode] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState([]);

    const customerData = useSelector(state => state.customerData.customer);
    const customers = [{label:'---',value:''}];
    customerData.map(customer => customers.push({label:customer.name, value:customer.id}));

    const barcodeData = useSelector(state => state.customerbarcodes.customerbarcodes);
    const barcodes = [{label:'---',value:''}];
    barcodeData.map(barcode => barcodes.push({label:barcode.barcode, value:barcode.id}));

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getServiceRequestbyidData(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const servicesD = useSelector(state => state.servicerequests.servicerequestsbyid);
    const servicesData = [servicesD];

    useEffect(() => {
        if(editType==="Edit" ){
            if(servicesData && servicesData.length>0){
                servicesData.forEach((item) => {
         setId(item.id ? item.id :'');
         setCustomer(item.request_id ? item.customer_id :'');
         setBarcode(item.barcode_id ? item.barcode_id :'');
         setSubject(item.subject ? item.subject :'');
         setDescription(item.description ? item.description :'');
         dispatch(getCustomerBarcodeData(parseInt(item.customer_id)));
        })
    }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [servicesD]);

    useEffect(() => {
        if(editType==="New" ){
         setId('');
         setCustomer('');
         setBarcode('');
         setSubject('');
         setDescription('');
    }}, [editType])
    
    useEffect(()=>{
        dispatch(getCustomerData())
    },[dispatch])

    const handleRequestCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
          history.push('/services/show-request')
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
      }

    const handleInputChange = (event, type) => {
        if(type==="customer"){
            setCustomer(parseInt(event.target.value));
            dispatch(getCustomerBarcodeData(parseInt(event.target.value)));
        }
        else if(type==="barcode"){
            setBarcode(parseInt(event.target.value));
        }
        else if(type==="subject"){
            setSubject(event.target.value)
        }
        else if(type==="description"){
            setDescription(event.target.value)
        }
    }

    const handleAddRequest = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (customer && barcode && subject && description) {
              if(editType==="New") {
                  const  requestObj={
                    customer: customer,
                    barcode: barcode,
                    subject: subject,
                    description: description
             }
             dispatch(addNewRequestData(requestObj, handleRequestCallback));
            } 
            else {
                const  requestObj={
                  id: id,
                  customer: customer,
                  barcode: barcode,
                  subject: subject,
                  description: description
           }
           dispatch(updateRequestData(requestObj, handleRequestCallback));
          }
            }
        }
    }

    const handleFormValidation = () => {
        const error = [];

        if (!customer) {
            error.push('customer')
        }
        if (!barcode) {
            error.push('barcode')
        }
        if (!subject) {
            error.push('subject')
        }
        if (!description) {
            error.push('description')
        }
        return error;
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            {editType} Service Request
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <SelectInputObj title="Customer*:"  error={error} errorMessage="Please Select Customer from the List" value={customer} data={customers} type="customer"  handleInputChange={handleInputChange} />
                                <SelectInputObj title="Barcode*:"  error={error} errorMessage="Please Select Barcode from the List" value={barcode} data={barcodes} type="barcode" handleInputChange={handleInputChange} />
                                <TextInput errorMessage="Please Enter Subject" value={subject} error={error} type="subject" title="Subject*:" handleInputChange={handleInputChange} />
                                <TextAreaInput errorMessage="Please Enter Description" value={description} error={error} type="description" title="Description*:" handleInputChange ={handleInputChange} rows={2}/>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                        <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/services/show-request'})}} color="success" >Back</CButton>
                            <CButton shape="square" style={{float: 'right'}} color="success" onClick={() => handleAddRequest()}> {editType ==="New" ? 'Add Service Request' : 'Update Service Request'}</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default EditForms
