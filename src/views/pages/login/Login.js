import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { loginRequestAction } from '../../../redux/actions/loginAction';
import { useAlert } from "react-alert";
import { getAccessToken }  from '../../../helper/sessionFunction';



const Login = () => {
  const history = useHistory();
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([])
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    const token = getAccessToken()
    if(token && token !== 'null'){
      history.push('/dashboard');
    }

  })

  const handleLoginCallback = (value, message) => {
    if (value) {
      alert.show(message, { timeout: 2000, type: 'success' });
      history.push('/dashboard');
    }
    else if(!value){
      alert.show(message , {timeout:2000 , type:'error'})
    }

  }


  const handleFormValidation = () => {
    const error = [];
    if (!user) {
      error.push('username')
    }
    if (!password) {
      error.push('password')
    }

    return error;
  }

  const handleLoginClick = () => {
    const error = handleFormValidation();
    if (error && error.length > 0) {
      setError(error);
    }
    else {
      if (user && password) {
        dispatch(loginRequestAction({ username: user, password }, handleLoginCallback));
      }
    }
  }

  const hadleInputChange = (event, type) => {
    if (type === 'username') {
      if (error.includes('username')) {
        const errorremained = error.filter((value) => { return value !== "username"; })
        setError(errorremained);
      }
      setUsername(event.target.value);
    }
    else if (type === 'password') {
      if (error.includes('password')) {
        const errorremained = error.filter((value) => { return value !== "password"; })
        setError(errorremained);
      }
      setPassword(event.target.value);
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center ligin-page-sec">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="">
                <CCardBody>
                  <CForm  >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" className={error.includes('username') ? "inputError" : ''} placeholder="Username" onChange={(event) => hadleInputChange(event, "username")} autoComplete="username" />
                      {error && error.length > 0 && error.includes('username') && <div className="error"> Please enter a Username </div>}

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" className={error.includes('password') ? "inputError" : ""} onChange={(event) => hadleInputChange(event, "password")} placeholder="Password" autoComplete="current-password" />
                      {error && error.length > 0 && error.includes('password') && <div className="error"> Please enter a Password </div>}

                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={() => handleLoginClick()} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary signin-card">
                <CCardBody className="text-center">
                  <div className="row align-items-center justify-content-center">
                    {/* <p>New to Site ?</p>
                    <Link to="/register">
                      Create Account!
                   </Link> **/}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

