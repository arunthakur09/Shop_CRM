import React, { useState , useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardFooter,
    CCardHeader, CCol, CForm, CRow
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

import { TextInput } from '../../../containers';
import { isValidEmail } from '../../../helper';

//action
import { getUserprofileData, updateUserprofilepassData, updateUserProfileData } from '../../../redux/actions/userAction';

const EditForms = (props) => {
    const [username, setUsername] = useState('');
    const [fName, setFname] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState([]);

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    
    useEffect(()=>{
        dispatch(getUserprofileData());
    },[dispatch])

    const userD = useSelector(state => state.users.userprofile);
    const userData = [userD];

    const editType= props.location && props.location.search && props.location.search ==='?Profile' ? "Profile" : "Password";

    useEffect(() => {
       if(userData && userData.length>0){
        userData.forEach((item) => {
         setUsername(item.username ? item.username :'');
         setFname(item.first_name ? item.first_name :'');
         setLname(item.last_name ? item.last_name :'');
         setEmail(item.email ? item.email :'');
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [userD])

    const handleUserCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position:'middle' });
        //   history.push('/user/show-user')
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position:'middle'})
        }
      }

      const handleUserpassCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position:'middle' });
        }
        else if(!value){
          alert.show(message , {timeout:5000 , type:'error', position:'middle' });
        }
      }

    const handleInputChange = (event, type, name) => {
        if (type === "username") {
            if (error.includes('username')) {
                const errorremained = error.filter((value) => { return value !== "username"; })
                setError(errorremained);
            }
            setUsername(event.target.value);
        }
        else if (type === "fname") {
            if (error.includes('fname')) {
                const errorremained = error.filter((value) => { return value !== "fname"; })
                setError(errorremained);
            }
            setFname(event.target.value);
        }
        else if (type === 'email') {
            if (error.includes('email')) {
                const errorremained = error.filter((value) => { return value !== "email"; })
                setError(errorremained);
            }
            setEmail(event.target.value);
        }
        else if (name === 'oldpassword') {
            if (error.includes('oldpassword')) {
                const errorremained = error.filter((value) => { return value !== "oldpassword"; })
                setError(errorremained);
            }
            setOldpassword(event.target.value);
        }
        else if (name === 'newpassword') {
            if (error.includes('newpassword')) {
                const errorremained = error.filter((value) => { return value !== "newpassword"; })
                setError(errorremained);
            }
            setNewpassword(event.target.value);
        }
        else if(type==="lname"){
            setLname(event.target.value)
        }
    }

    const handleAddCustomer = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else if (fName && username) {
                if(editType==='Profile'){
                    const  customerObj= {
                    first_name: fName,
                    last_name: lName,
                    username: username
                    }
                  dispatch(updateUserProfileData(customerObj, handleUserCallback));
                }
                else{
                    // eslint-disable-next-line no-lone-blocks
                    {const  customerObj= {
                        new_password: newpassword,
                        old_password: oldpassword
                }
                  dispatch(updateUserprofilepassData(customerObj, handleUserpassCallback));}
            }}
    }


    const handleFormValidation = () => {
        const error = [];

        if (!username) {
            error.push('username')
        }
        if (!fName) {
            error.push('fname')
        }
        if (!email || !isValidEmail(email)) {
            error.push('email')
        }
        return error;
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            Edit {editType}
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                            {editType==='Password'? <><TextInput errorMessage="Please Enter a Password" value={oldpassword} error={error} type="password" title="Old Password*"  name='oldpassword' handleInputChange={handleInputChange} />
                            <TextInput errorMessage="Please Enter a Password" value={newpassword} error={error} type="password" title="New Password*" name='newpassword' handleInputChange={handleInputChange} /></>:
                                <><TextInput errorMessage="Please Enter a Username" value={username} error={error} type="username" title="Username*:" handleInputChange={handleInputChange} />
                                <TextInput errorMessage="Please Enter First Name" value={fName} error={error} type="fname" title="First Name*:" handleInputChange ={handleInputChange} rows={2}/>
                                <TextInput  value={lName} error={error} type="lname" title="Last Name:" handleInputChange ={handleInputChange} rows={2}/></>}
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton shape="square" color="success" onClick={() => handleAddCustomer()}>Update {editType}</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditForms

