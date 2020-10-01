import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//action
import { getTransactionData, deleteTransactionData } from '../../../redux/actions/transactionsActions';
// eslint-disable-next-line no-sparse-arrays
const fields = [ { key: 'edit', label: 'Edit' },{ key: 'delete', label: 'Delete' }, { key: 'customer_name', label: 'Customer' }, { key: 'collection_date', label: 'Collection Date' } , { key: 'barcode', label: 'Barcode Value' }, { key: 'amount_collected', label: 'Amount' }, 'comments'];

const ShowTransaction = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const transactionData = useSelector(state => state.transactions.transactions);

    useEffect(()=>{
   dispatch(getTransactionData());
 },[dispatch])

 const handleDeleteTransactionCallback = (value, message) => {
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
       dispatch(deleteTransactionData(id , handleDeleteTransactionCallback))
    }
}
 
    return (
        <>
            <p className="h4">Transactions</p>
            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/transaction/new-transaction', state: { type:'New' }})}} color="success">+ Add New Transaction</CButton>
            <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody>
                    <CDataTable
                        items={transactionData}
                        fields={fields}
                        itemsPerPage={5}
                        pagination= {transactionData.length>5 ? true : false}
                        scopedSlots={{
                            'edit':
                            (item) => (
                                <td>
                                      <CButton type="button" onClick={()=>{ history.push({pathname: '/transaction/new-transaction', search: `${item.id}`})}}><CIcon name="cil-pencil" /> </CButton>
                                </td>
                            ),
                            'delete':
                            (item) => (
                                <td>
                                      <CButton type="button"   onClick={(e)=> handleDelete(e, item.id)} ><CIcon name="cil-trash" /> </CButton>
                                </td>
                            ),
                            'collection_date':
                            (item) => (
                            <td>
                                 on {((item.collection_date).substring(0, (item.collection_date).indexOf('T')))} at {((item.collection_date).substring((item.collection_date).indexOf('T')+1, (item.collection_date).indexOf('T')+6 ))}
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

export default ShowTransaction
