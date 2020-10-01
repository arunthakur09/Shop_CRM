import React, { useState } from 'react'
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
import { TextInput, SelectInput } from '../../../containers';

import { customers } from '../../../config/mockData';

const EditBarCode = () => {
    const [barcode, setBarcode] = useState('');
    const [customer, setCustomer] = useState('');
    const [error, setError] = useState([])



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


    const handleAddCustomer = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (barcode && customer) {
                alert("Barcode Added Successfully")
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
                            New Device
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <TextInput errorMessage="Please Enter a Barcode" value={barcode} error={error} type="barcode" title="Barcode: *" handleInputChange={handleInputChange} />
                               <SelectInput title="Customer: *" error={error} errorMessage="Please Select Customer from the List" value={customer} data={customers} type="customer" handleInputChange={handleInputChange} />
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton   className="mr-3"  color="success" onClick={() => handleAddCustomer()}> Save</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditBarCode

