import React, {useEffect,useState} from 'react';
import { CCard, CCardBody, CButton, CDataTable, CModal, CModalBody,
    CModalHeader, CModalFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";

//action
import {getServiceRequestData,deleteServiceRequestData,closeServiceRequestData} from '../../../redux/actions/servicerequestsAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }, 'barcode',{ key: 'customer_name', label: 'Customer' }, , 'subject', 'description', { key: 'create_date', label: 'Created On' }, { key: 'status', label: 'Status' },{ key: 'close_date', label: 'Closed On' }, { key: 'notes', label: 'View Notes' }];

const ShowService = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [id, setId] = useState(false);
    const [modal, setModal] = useState(false);
    const servicerequestData = useSelector(state => state.servicerequests.servicerequests);
    
    useEffect(()=>{
        dispatch(getServiceRequestData());
    },[dispatch])
    
    const handleDeleteCustomerCallback = (value, message) => {
        if (value) {
            dispatch(getServiceRequestData());
            alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
        }
        else if(!value){
            alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
    }
    
    const handleCloseCustomerCallback = (value, message) => {
        if (value) {
            alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
            setModal(!modal);
        }
        else if(!value){
            alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
    }
    
    const handleDelete = (e, id) => {
        e.preventDefault()
        if(id){
            dispatch(deleteServiceRequestData(id , handleDeleteCustomerCallback))
        }
    }
    
    const toggle = ()=>{
        setModal(!modal);
      }
    
    return (
    <>
    <p className="h4">Service Requests List</p>
    <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/services/new-request', state: { type:'New' }})}} color="success"> + Add New Service Request</CButton>
    <div className="custom-table-sec">
        <CCard className='customerTable'>
            <CCardBody>
                <CDataTable
                items={servicerequestData}
                fields={fields}
                itemsPerPage={5}
                pagination= {servicerequestData.length>5 ? true : false}
                scopedSlots={{
                    'edit':
                    (item) => {
                        return(
                        <td>
                            <CButton  onClick={()=>{ history.push({pathname: '/services/new-request', search: `${item.id}`, state: { detail: item , type:'Edit' }})}} type="button" ><CIcon name="cil-pencil" /> </CButton>
                        </td>
                    )},
                    'delete':
                    (item) => (
                    <td>
                        <CButton type="button" onClick={(e)=> handleDelete(e, item.id)}><CIcon name="cil-trash" /> </CButton>
                    </td>
                    ),
                    'status':
                    (item) => (
                    <td>
                         <p 
                    onClick={() =>{
                        if(item.status===0){
                        toggle()                     
                        setId(item.id)}}
                    }
                    className="mr-1">{item.status===0 ? <CButton type="button"><u>Open</u></CButton> : 'Closed'}</p>
                    </td>
                    ),
                    'create_date':
                    (item) => (
                    <td>
                         on {((item.create_date).substring(0, (item.create_date).indexOf('T')))} at {((item.create_date).substring((item.create_date).indexOf('T')+1, (item.create_date).indexOf('T')+6 ))}
                    </td>
                    ),
                    'close_date':
                    (item) => (
                    <td>
                         {item.close_date===null ? 'Not Closed yet' :((item.close_date).substring(0, (item.close_date).indexOf('T')))}
                    </td>
                    ),
                    'notes':
                    (item) => (
                    <td>
                        <CButton type="button" onClick={()=> history.push(`/services/notes?${item.id}`)} >View </CButton>
                    </td>
                    ),
                    }} />
            </CCardBody>
    <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Confirmation</CModalHeader>
        <CModalBody>
          Are you sure you want to close this service-request?
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => {
            dispatch(closeServiceRequestData(id , handleCloseCustomerCallback))}} color="primary">yes</CButton>
          <CButton
            color="secondary"
            onClick={toggle}
          >No</CButton>
        </CModalFooter>
      </CModal>
        </CCard>
    </div>
    </>
    )
}

export default ShowService
