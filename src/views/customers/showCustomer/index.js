import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";

//action
import {getCustomerData ,deleteCustomerData} from '../../../redux/actions/customerAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }, 'name',{ key: 'address1', label: 'Address' }, { key: 'address2', label: 'Address 2' }, 'city', { key: 'zip', label: 'ZipCode' }, 'mobile', { key: 'phone', label: 'Phone Number' },];

const ShowCustomer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const customerData = useSelector(state => state.customerData.customer);
    
    useEffect(()=>{
        dispatch(getCustomerData());
    },[dispatch])
    
    const handleDeleteCustomerCallback = (value, message) => {
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
            dispatch(deleteCustomerData(id , handleDeleteCustomerCallback))
        }
    }
    
    return (
    <>
    <p className="h4">Customers List</p>
    <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/customer/new-customer', state: { type:'New' }})}} color="success"> + Add a New Customer</CButton>
    <div className="custom-table-sec">
        <CCard className='customerTable'>
            <CCardBody>
                <CDataTable
                items={customerData}
                fields={fields}
                itemsPerPage={5}
                pagination= {customerData.length>5 ? true : false}
                scopedSlots={{
                    'search':
                    (item) => (
                    <td>
                        <CButton type="button" ><CIcon name="cil-magnifying-glass" /> </CButton>
                    </td>
                    ),
                    'edit':
                    (item) => {
                        return(
                        <td>
                            <CButton onClick={()=>{ history.push({pathname: '/customer/new-customer', search: `${item.id}`})}} type="button" ><CIcon name="cil-pencil" /> </CButton>
                        </td>
                    )},
                    'delete':
                    (item) => (
                    <td>
                        <CButton type="button"  onClick={(e)=> handleDelete(e, item.id)}><CIcon name="cil-trash" /> </CButton>
                    </td>
                    ),
                    'phone':
                    (item) => (
                    <td>
                        <span >{item.phone ? item.phone :'' } </span>
                    </td>
                    ),
                    }} />
            </CCardBody>
        </CCard>
    </div>
    </>
    )
}

export default ShowCustomer
