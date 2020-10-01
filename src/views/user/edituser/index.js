import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter,
    CCardHeader, CCol, CForm, CRow
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

import { TextInput, SelectInput } from '../../../containers';
import { isValidEmail } from '../../../helper';

//action
import { addNewUserData, getUserDataByid, updateUserData, getPermissionData, updateUserpassData } from '../../../redux/actions/userAction';

const EditForms = (props) => {

    const [p, setP] = useState(false);
    const [next, setNext] = useState(false);
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [fName, setFname] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [cp, setCP] = useState(false);
    const [lName, setLname] = useState('');
    const [superuser, setSuperuser] = useState('');
    const [email, setEmail] = useState('');
    const [staff, setStaff] = useState('');
    const [active, setActive] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [error, setError] = useState([]);
    const collectorData = ['---','No', 'Yes'];

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getUserDataByid(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const userD = useSelector(state => state.users.userbyid);
    const userData = [userD];

    useEffect(() => {
        if(editType==="Edit" ){
            if(userData && userData.length>0){
                userData.forEach((item) => {
                    setId(item.id ? item.id :'');
                    setUsername(item.username ? item.username :'');
                    setFname(item.first_name ? item.first_name :'');
                    setLname(item.last_name ? item.last_name :'');
                    setSuperuser(item.is_superuser===true?'Yes':'No');
                    setEmail(item.email ? item.email :'');
                    setStaff(item.is_staff===true?'Yes':'No' );
                    setActive(item.is_active===true?'Yes':'No' );
                    setPassword(item.password ? item.password :'');
                    setPermissions(item.user_permissions ? item.user_permissions :'');
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userD]);
    
    useEffect(()=>{
        dispatch(getPermissionData());
    },[dispatch]);
    const permission = useSelector(state => state.users.permission);

    useEffect(() => {
        if(editType==="New" ){
            setId('');
            setUsername('');
            setFname('');
            setLname('');
            setSuperuser('');
            setEmail('');
            setStaff('');
            setActive('');
            setCP(false);
            setP(true);
            setNext(false);
            setPermissions([]);
        }
    }, [editType]);

    const handleUserCallback = (value, message) => {
        if (value) {
            alert.show(message, { timeout: 2000, type: 'success', position: 'middle'});
            history.push('/user/show-user');
        }else if(!value){
            message[Object.keys(message)[0]].map((key) => {
                return alert.show(key , {timeout:5000 , type:'error', position: 'middle'});
            })
        }
    }
    
    const handleUserpassCallback = (value, message) => {
        if (value) {
            alert.show(message, { timeout: 2000, type: 'success', position:'middle' });
            setP(false);
        }else if(!value){
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
        }else if (type === "fname") {
            if (error.includes('fname')) {
                const errorremained = error.filter((value) => { return value !== "fname"; })
                setError(errorremained);
            }
            setFname(event.target.value);
        }else if (type === 'email') {
            if (error.includes('email')) {
                const errorremained = error.filter((value) => { return value !== "email"; })
                setError(errorremained);
            }
            setEmail(event.target.value);
        }else if (name === 'opassword') {
            if (error.includes('opassword')) {
                const errorremained = error.filter((value) => { return value !== "opassword"; });
                setError(errorremained);
            }
            setPassword(event.target.value);
        }else if (name === 'cpassword') {
            setCP(true);
            if (error.includes('cpassword')) {
                const errorremained = error.filter((value) => { return value !== "cpassword"; });
                setError(errorremained);
            }
            if(password===event.target.value){setCP(false)}
            setCPassword(event.target.value);
        }else if(type==="superuser"){
            setSuperuser(event.target.value);
        }else if(type==="staff"){
            setStaff(event.target.value);
        }else if(type==="active"){
            setActive(event.target.value);
        }else if(type==="lname"){
            setLname(event.target.value);
        }
    }
    
    const handleInputCheck =(event) => {
        const target = event.target;
        var value = parseInt(target.value);
        let permiss = permissions;
        
        permiss.includes(value) ? permiss.splice(permiss.indexOf(value), 1) : permiss.push(value);
        setPermissions(permiss);
        console.log(permissions);
    }

    const handleAddCustomer = () => {
        // const error = handleFormValidation();
        // if (error && error.length > 0) {
        //     setError(error);
        //     setNext(false);
        //     alert.show("Please enter all the required Details" , {timeout:2000 , type:'error' , position: 'middle'});
        // }
            if (superuser && fName && staff && active  && email && username) {
                if(editType==="New") {
                    const  customerObj= lName===''?{
                        is_superuser: superuser==='Yes'?true:false,
                        is_staff: staff==='Yes'?true:false,
                        is_active: active==='Yes'?true:false,
                        first_name: fName,
                        password: password,
                        email: email,
                        username: username,
                        user_permissions: permissions
                    }
                    :
                    {
                        is_superuser: superuser==='Yes'?true:false,
                        is_staff: staff==='Yes'?true:false,
                        is_active: active==='Yes'?true:false,
                        first_name: fName,
                        last_name: lName,
                        password: password,
                        email: email,
                        username: username,
                        user_permissions: permissions
                    }
                    dispatch(addNewUserData(customerObj, handleUserCallback));
                }else {
                    const  customerObj= lName === '' ? {
                        id: id,
                        is_superuser: superuser==='Yes'?true:false,
                        is_staff: staff==='Yes'?true:false,
                        is_active: active==='Yes'?true:false,
                        first_name: fName,
                        password: password,
                        email: email,
                        username: username,
                        user_permissions: superuser==='Yes'?[]:permissions
                    }
                    :
                    {
                        id: id,
                        is_superuser: superuser==='Yes'?true:false,
                        is_staff: staff==='Yes'?true:false,
                        is_active: active==='Yes'?true:false,
                        first_name: fName,
                        last_name: lName,
                        password: password,
                        email: email,
                        username: username,
                        user_permissions: superuser==='Yes'?[]:permissions
                    }
                    dispatch(updateUserData(customerObj, handleUserCallback));
                }
            }
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
        if (!superuser) {
            error.push('superuser')
        }
        if (!staff) {
            error.push('staff')
        }
        if (!active) {
            error.push('active')
        }
        if(editType==='New'){
            if (!cpassword) {
                error.push('cpassword');
            }
            if (!password) {
                error.push('opassword');
            }
        }
        return error;
    }

    return (
    <><CRow>
        <CCol xs="12" md="6">
            <CCard>
                <CCardHeader>
                    {editType} User
                    {editType==='Edit' && p===false && next===false ? <CButton className="mr-3" color="success" style={{float:"right"}} type="button" onClick={()=> setP(true)}>Update Password</CButton>:null}
                </CCardHeader>
                {next===false ? 
                <><CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        {p===false || editType==='New'?<TextInput errorMessage="Please Enter a Username" value={username} error={error} type="username" title="Username*:" handleInputChange={handleInputChange} />:null}
                        {p===true? <><TextInput errorMessage="Please Enter a Password" value={password} error={error} type="password" name='opassword' title={editType==="New" ? "Password*:" : "Password:"} handleInputChange={handleInputChange} />
                        <TextInput errorMessage="Please Confirm Password" value={cpassword} error={error} type="password" name='cpassword' title={editType==="New" ? "Confirm Password*:" : "Confirm Password:"} handleInputChange={handleInputChange} />
                        <div style={{margin: cpassword !== ''?'-7% 0% 6% 39%':'', color: 'red'}}>{cpassword !== '' ? password === cpassword ? '':'Enter the exact password here' :''}</div></>:null}
                        {editType==='Edit' && p===true ?
                        <>
                        {/* <CButton className="mr-3" color="success" type="button" onClick={()=> {setP(false)}}>Back to form</CButton>
                        <CButton className="mr-3" color="success" style={{float:"right"}} type="button"
                        onClick={()=> { 
                            if(password===cpassword){
                                const error = [];
                                if (!cpassword) {
                                    error.push('cpassword');
                                }
                                if (!password) {
                                    error.push('opassword');
                                }
                                if (error && error.length > 0) {
                                    setError(error);
                                }else{
                                    dispatch(updateUserpassData({id: id, password: password}, handleUserpassCallback));
                                }
                            }
                        }}>Update</CButton><br /><br /> */}
                        </>
                        :
                        <><TextInput errorMessage="Please Enter First Name" value={fName} error={error} type="fname" title="First Name*:" handleInputChange ={handleInputChange} rows={2}/>
                        <TextInput  value={lName} error={error} type="lname" title="Last Name:" handleInputChange ={handleInputChange} rows={2}/>
                        <TextInput errorMessage="Please Enter a valid Email Address" value={email} error={error} type="email" title="Email*:" handleInputChange={handleInputChange} />
                        <SelectInput title="Superuser*:"  error={error} errorMessage="Please Select day from the List" value={superuser} data={collectorData} type="superuser" handleInputChange={handleInputChange} />
                        <SelectInput title="Staff*:"  error={error} errorMessage="Please Select day from the List" value={staff} data={collectorData} type="staff" handleInputChange={handleInputChange} />
                        <SelectInput title="Active*:"  error={error} errorMessage="Please Select day from the List" value={active} data={collectorData} type="active" handleInputChange={handleInputChange} /></>}
                    </CForm>
                </CCardBody>
                <CCardFooter>{editType==='Edit' && p===false ?
                    <><CButton className="mr-3" onClick={()=>{ history.push({pathname: '/user/show-user'})}} color="success" >Back</CButton>
                    <CButton className="mr-3" style={{float: 'right'}} color="success" onClick={() => {
                        const error = handleFormValidation();
                        if (error && error.length > 0) {
                            setError(error);
                            alert.show("Please enter all the required Details" , {timeout:2000 , type:'error' , position: 'middle'});
                        }else{
                            setNext(true);    
                        }}}>Next</CButton></>
                        :
                        <><CButton className="mr-3" color="success" type="button" onClick={()=> {setP(false)}}>Back</CButton>
                        <CButton className="mr-3" color="success" style={{float:"right"}} type="button"
                        onClick={()=> { 
                            if(password===cpassword){
                                const error = [];
                                if (!cpassword) {
                                    error.push('cpassword');
                                }
                                if (!password) {
                                    error.push('opassword');
                                }
                                if (error && error.length > 0) {
                                    setError(error);
                                }else{
                                    dispatch(updateUserpassData({id: id, password: password}, handleUserpassCallback));
                                }
                            }
                        }}>Update</CButton><br /><br /></>}
                </CCardFooter></>
                :
                <><CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">Permissions:<br />
                        <div style={{height: `${(window.innerHeight)/1.8}px`, overflow:'scroll', border: '1px solid black'}}>
                            {permission.map((permission) => {
                                return (
                                    <div style={{marginTop: '3%', marginBottom: '3%'}}>
                                        <input type="checkbox"  key={permission.id} style={{marginLeft: '27%', maxHeight: 'inherit'}} value={permission.id} name='permission' defaultChecked={permissions.includes(permission.id)} onChange={handleInputCheck} disabled={superuser==='Yes'?true:false} />
                                        <span  key={permission.id} style={{marginLeft: '3%', maxHeight: 'inherit'}}>{permission.name}</span><br />
                                    </div>
                                )
                            })}
                        </div>
                    </CForm>
                </CCardBody>
                <CCardFooter>
                    <CButton shape="square" color="success" onClick={() => handleAddCustomer()} style={{float: 'right'}} >{editType ==="New" ? 'Add User' : 'Update User'}</CButton>
                    <CButton className="mr-3" color="success" onClick={() => setNext(false)}>Back</CButton>
                </CCardFooter></>}
            </CCard>
        </CCol>
    </CRow></>)
}

export default EditForms
