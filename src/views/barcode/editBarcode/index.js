import React, { useState, useEffect } from 'react'
import {
    CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm,
    CRow
} from '@coreui/react';
import { TextInput, SelectInputObj } from '../../../containers';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

//action
import { getCustomerData } from '../../../redux/actions/customerAction';
import { addNewBarcodeData, updateBarcodeData, getBarcodeByid } from '../../../redux/actions/barcodeAction';

const EditBarCode = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const [id, setId] = useState('');
    const [barcode, setBarcode] = useState('');
    const [customer, setCustomer] = useState('');
    const [error, setError] = useState([]);
    const customerData = useSelector(state => state.customerData.customer);
    const customers = [{label:'---',value:''}];
    customerData.map(customer => customers.push({label:customer.name, value:customer.id}));

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    var rString = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    useEffect(()=>{
        dispatch(getCustomerData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getBarcodeByid(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const barcodeD = useSelector(state => state.barcodes.barcodeid);
    const barcodeData = [barcodeD];
    
    useEffect(() => {
        if(editType==="Edit" ){
            if(barcodeData && barcodeData.length>0){
                barcodeData.forEach((item) => {
                    setId(item.id ? item.id :'');
                    setBarcode(item.barcode ? item.barcode :'');
                    setCustomer(item.customer_id ? item.customer_id :'');
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [barcodeD]);

     useEffect(() => {
        if(editType==="New" ){
         setId('');
         setCustomer('');
         setBarcode(rString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [editType])

    const handleInputChange = (event, type) => {
        if (type === "barcode") {
            if (error.includes('barcode')) {
                const errorremained = error.filter((value) => { return value !== "barcode"; })
                setError(errorremained);
            }
            setBarcode(event.target.value);
        }
        else if (type === "customer") {
            if (error.includes('customer')) {
                const errorremained = error.filter((value) => { return value !== "customer"; })
                setError(errorremained);
            }
            setCustomer(event.target.value);
        }
    }

    const handleBarcodeCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
          history.push('/barcodes/show-barcodes')
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
      }

    const handleAddCustomer = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (barcode && customer) {
                if(editType==="New") {
                const  customerObj={
                    barcode: barcode,
                    customer: customer
           }
           dispatch(addNewBarcodeData(customerObj, handleBarcodeCallback));
          } 
          else {
              const  customerObj={
                id: id,
                barcode: barcode,
                customer: customer
         }
         dispatch(updateBarcodeData(customerObj, handleBarcodeCallback));
        }
            }
        }
    }

    const handleFormValidation = () => {
        const error = [];

        if (!barcode) {
            error.push('barcode')
        }
        if( !customer|| customer === '-----' ){
            error.push('customer')
        }
        return error;
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            {editType} Barcode
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <TextInput errorMessage="Please Enter a Barcode" value={barcode} error={error} type="barcode" title="Barcode*: " handleInputChange={handleInputChange} />
                               <SelectInputObj title="Customer*: " error={error} errorMessage="Please Select Customer from the List" value={customer} data={customers} type="customer" handleInputChange={handleInputChange} />
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/barcodes/show-barcodes'})}} color="success" >Back</CButton>
                            <CButton className="mr-3" style={{float: 'right'}} color="success" onClick={() => handleAddCustomer()}>{editType ==="New" ? 'Add Barcode' : 'Update Barcode'}</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditBarCode

