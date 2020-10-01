import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//Actions
import {getCollectorData, deleteCollectorData} from '../../../redux/actions/collectorAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }, 'first_name', 'last_name', { key: 'employee_id', label: 'Employee ID' },, 'email', 'mobile'];

const CoreUIIcons = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const collectorData = useSelector(state => {
        return state.collector.collector
    })

    useEffect(()=>{
        dispatch(getCollectorData())
      },[dispatch])

    const handleDeleteCollectorCallback = (value, message) => {
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
            dispatch(deleteCollectorData(id , handleDeleteCollectorCallback))
         }
     }

    return (
        <>
            <p className="h4">Collectors</p>
            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/collectors/new-collector', state: { type:'New' }})}} color="success">+ Add New Collector</CButton>
            <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody>
                    <CDataTable
                        items={collectorData&& collectorData.length>0 ? collectorData : []}
                        fields={fields}
                        itemsPerPage={5}
                        pagination= {collectorData.length>5 ? true : false}
                        scopedSlots={{
                            'edit':
                            (item) => (
                                <td>
                                      <CButton type="button" onClick={()=>{ history.push({pathname: '/collectors/new-collector', search: `${item.id}`})}} ><CIcon name="cil-pencil" /> </CButton>
                                </td>
                            ),
                            'delete':
                            (item) => (
                                <td>
                                <CButton type="button" onClick={(e)=> handleDelete(e, item.id)}><CIcon name="cil-trash" /> </CButton>
                              </td>
                            ),
                            'employee_id':
                            (item) => (
                            <td style={{textAlign: 'center'}}>{item.employee_id}</td>
                            ),
                        }}

                    />
                </CCardBody>
            </CCard>
           </div>
        </>
    )
}

export default CoreUIIcons
