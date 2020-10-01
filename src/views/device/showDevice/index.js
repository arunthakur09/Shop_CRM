import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//action
import { getDevicesData, deleteDevicesData } from '../../../redux/actions/devicesAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [ { key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }, 'barcode','device_name', 'model', "serial_number", 'description'];

const ShowDevices = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const devicesData = useSelector(state => {
        return state.devices.devices
    })

    useEffect(()=>{
       dispatch(getDevicesData())
     },[dispatch])
    
     const handleDeleteDeviceCallback = (value, message) => {
         if (value) {
             alert.show(message, { timeout: 2000, type: 'success' , position: 'middle'});
         }
         else if(!value){
             alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
         }
     }
    
    const handleDelete = (e, id) => {
        e.preventDefault()
        if(id){
            dispatch(deleteDevicesData(id, handleDeleteDeviceCallback))
        }
    }
     
    return (
        <>
            <p className="h4">Devices</p>
            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/devices/new-devices', state: { type:'New' }})}} color="success"> + Add New Devices </CButton>
            <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody>
                    <CDataTable
                            items={devicesData && devicesData.length>0 ? devicesData : []}
                            fields={fields}
                        itemsPerPage={5}
                        pagination= {devicesData.length>5 ? true : false}
                        scopedSlots={{
                            'edit':
                            (item) => (
                                <td>
                                      <CButton type="button" onClick={()=>{ history.push({pathname: '/devices/new-devices', search: `${item.id}`})}}><CIcon name="cil-pencil" /> </CButton>
                                </td>
                            ),
                            'delete':
                            (item) => (
                            <td>
                                <CButton type="button"  onClick={(e)=> handleDelete(e, item.id)}><CIcon name="cil-trash" /> </CButton>
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

export default ShowDevices
