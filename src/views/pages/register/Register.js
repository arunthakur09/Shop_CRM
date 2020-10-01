import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { isValidEmail } from '../../../helper';

const Register = () => {
  const history = useHistory();
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);


  const hadleInputChange = (event, type) => {
    if (type === 'username') {
      if (error.includes('username')) {
        const errorremained = error.filter((value) => { return value !== "username"; })
        setError(errorremained);
      }
      setUsername(event.target.value);
    }

    else if (type === 'email') {
      if (error.includes('email')) {
        const errorremained = error.filter((value) => { return value !== "email"; })
        setError(errorremained);
      }
      setEmail(event.target.value);
    }


    else if (type === 'password') {
      if (error.includes('password')) {
        const errorremained = error.filter((value) => { return value !== "password"; })
        setError(errorremained);
      }
      setPassword(event.target.value);
    }
  }


  const handleFormValidation = () => {
    const error = [];

    if (!userName) {
      error.push('username')
    }
    if (!password) {
      error.push('password')
    }
    if (!email || !isValidEmail(email)) {
      error.push('email')
    }
    return error;
  }

  const handleCreateNewAccount = () => {
    const error = handleFormValidation();
    if (error && error.length > 0) {
      setError(error);
    }
    else {
      if (userName && email && password) {
        history.push('/dashboard');
      }
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h2>Create Account</h2>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" className={error.includes('username') ? "inputError" : ''} onChange={(event) => hadleInputChange(event, 'username')} placeholder="Username" autoComplete="username" />
                    {error && error.length > 0 && error.includes('username') && <div className="error"> Please enter a Username </div>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" className={error.includes('email') ? "inputError" : ''} onChange={(event) => hadleInputChange(event, 'email')} placeholder="Email" autoComplete="email" />
                    {error && error.length > 0 && error.includes('email') && <div className="error"> Please enter a valid email address </div>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" className={error.includes('password') ? "inputError" : ''} onChange={(event) => hadleInputChange(event, 'password')} placeholder="Password" autoComplete="new-password" />
                    {error && error.length > 0 && error.includes('password') && <div className="error">Please enter a password </div>}
                  </CInputGroup>
                  <CButton color="success" onClick={() => handleCreateNewAccount()} block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="register-footer">
                <p>Already a member ?
                  <a href="/#/login"> Log in </a>
                </p>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
