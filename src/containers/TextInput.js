import React  from 'react'
import {
    CCol,
     CFormGroup,
    CInput,
    CLabel,
 } from '@coreui/react'
const TextInput = (props) => {
    const {error, title, name, value, type, errorMessage, handleInputChange} = props
    return(
        <CFormGroup row>
        <CCol md="3">
            <CLabel htmlFor="text-input">{ title}</CLabel>
        </CCol>
        <CCol xs="12" md="9">
            <CInput type={type} value={value} id="text-input" className={(name===undefined?error.includes(type || name):error.includes(name)) ? "inputError" : ''} name={name} onChange={(event) => handleInputChange(event, type, name)} />
    {error && error.length > 0 && (name===undefined?error.includes(type || name):error.includes(name)) && <div className="error"> { errorMessage }</div>}
        </CCol>
    </CFormGroup>

    )
}

export default TextInput

//history.push({pathname: '/', state:{ id: '1'}}) //push state with id and get state in  other route