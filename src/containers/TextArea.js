import React from 'react'
import {
    CCol,
    CFormGroup,
    CTextarea,
    CLabel,
} from '@coreui/react'
const TextArea = (props) => {
    const { error, title, value, type, errorMessage, handleInputChange, rows } = props
    return (
        <CFormGroup row>
            <CCol md="3">
                <CLabel htmlFor='textarea-input'>{title}</CLabel>
            </CCol>
            <CCol xs="12" md="9">
                <CTextarea
                 className={error.includes(type) ? "inputError" : ''} 
                   value={value}
                    name={type}
                    id="textarea-input"
                    rows={rows}
                    onChange={(event) => handleInputChange(event, type)}
                />

                {error && error.length > 0 && error.includes(type) && <div className="error"> {errorMessage}</div>}
            </CCol>
        </CFormGroup>

    )
}

export default TextArea

//history.push({pathname: '/', state:{ id: '1'}}) //push state with id and get state in  other route