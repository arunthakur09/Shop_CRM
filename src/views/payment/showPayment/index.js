import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//action
import {getPaymentsData,deletePaymentsData} from '../../../redux/actions/paymentsAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }, 'id', { key: 'collected_amount', label: 'Amount' }, { key: 'commission_rate', label: 'Comm. Rate' }, 'commission', { key: 'sales_tax', label: 'Sales Tax' }, { key: 'commission_after_tax', label: 'Comm. After Tax' }, { key: 'net_collected_amount', label: 'Net Collected' }];

const ShowPayment = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const devicesData = useSelector(state => {
        return state.payments.payments
    })

    useEffect(()=>{
       dispatch(getPaymentsData())
     },[dispatch])

     const handleDeletePaymentsCallback = (value, message) => {
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
           dispatch(deletePaymentsData(id , handleDeletePaymentsCallback))
        }
    }

    return (
        <>
            <p className="h4">Payments</p>
            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/payments/new-payment', state: { type:'New' }})}} color="success">+ Add New Payment</CButton>
            <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody>
                    <CDataTable
                        items={devicesData}
                        fields={fields}
                        itemsPerPage={5}
                        pagination= {devicesData.length>5 ? true : false}
                        scopedSlots={{
                            'edit':
                            (item) => (
                                <td>
                                      <CButton type="button" ><CIcon name="cil-pencil" onClick={()=>{ history.push({pathname: '/payments/new-payment', search: `${item.id}`, state: { detail: item , type:'Edit' }})}}/> </CButton>
                                </td>
                            ),
                            'delete':
                            (item) => (
                                <td>
                                      <CButton type="button" onClick={(e)=> handleDelete(e, item.id)} ><CIcon name="cil-trash" /> </CButton>
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

export default ShowPayment
