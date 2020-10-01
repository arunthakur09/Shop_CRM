import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//action
import { getUserData, deleteUserData } from '../../../redux/actions/userAction';
// eslint-disable-next-line no-sparse-arrays
const fields = [ { key: 'edit', label: 'Edit' },{ key: 'delete', label: 'Delete' }, { key: 'username', label: 'Username' }, { key: 'email', label: 'Email' } , { key: 'first_name', label: 'Full Name' }];

const Showuser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const userData = useSelector(state => state.users.users);

    useEffect(()=>{
   dispatch(getUserData());
 },[dispatch])

 const handleDeleteUserCallback = (value, message) => {
    if (value) {
      alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
    }
    else if(!value){
      alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
    }
  }

 const handleDelete = (e, id) => {
    e.preventDefault()
    if(id){
       dispatch(deleteUserData(id , handleDeleteUserCallback))
    }
}
 
    return (
        <>
            <p className="h4">Users</p>
            <CButton className="mr-3" 
            onClick={()=>{ history.push({pathname: '/user/new-user', state: { type:'New' }})}}
             color="success">+ Add New User</CButton>
            <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody>
                    <CDataTable
                        items={userData}
                        fields={fields}
                        itemsPerPage={5}
                        pagination= {userData.length>5 ? true : false}
                        scopedSlots={{
                            'edit':
                            (item) => (
                                <td>
                                      <CButton type="button" 
                                      onClick={()=>{ history.push({pathname: '/user/new-user', search: `${item.id}`})}}
                                      ><CIcon name="cil-pencil" /> </CButton>
                                </td>
                            ),
                            'delete':
                            (item) => (
                                <td>
                                      <CButton type="button" 
                                       onClick={(e)=> handleDelete(e, item.id)}
                                       ><CIcon name="cil-trash" /> </CButton>
                                </td>
                            ),
                            'first_name':
                            (item) => (
                            <td>
                                {item.first_name+" "+item.last_name}
                            </td>
                            ),
                        }}
                    />
                </CCardBody>
            </CCard>
            </div>
        </>
    )
}

export default Showuser
