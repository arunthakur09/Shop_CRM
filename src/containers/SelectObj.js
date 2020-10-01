import React from 'react'
import { CCol, CFormGroup, CLabel, CSelect } from '@coreui/react'



const SelectInputObj = (props) => {
    const { error, title, value, type, errorMessage, handleInputChange, data , multiple } = props
    return (
        <CFormGroup row>
            <CCol md="3">
                <CLabel htmlFor="select">{title}</CLabel>
            </CCol>
            <CCol xs="12" md="9">
                <CSelect  multiple={multiple} className={error.includes(type) ? "inputError" : ''}  value={value} onChange={(event) => handleInputChange(event, type)} name={type} id="select">
                    {data && data.map((d, index) => {
                        return <option key={index} value={d.value}>{d.label}</option>
                    })}
                </CSelect>
                {error && error.length > 0 && error.includes(type) && <div className="error"> {errorMessage}</div>}
            </CCol>
        </CFormGroup>

    )
}

export default SelectInputObj

SelectInputObj.defaultProps = {
   multiple :false
  };

//history.push({pathname: '/', state:{ id: '1'}}) //push state with id and get state in  other route