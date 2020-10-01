import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable  } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";

//action
import { getBarcodeData, deleteBarcodeData } from '../../../redux/actions/barcodeAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [ { key: 'edit', label: 'Edit' }, {key: 'delete', label: 'Delete'}, { key: 'view', label: 'View Barcode' }, 'barcode', { key: 'customer_name', label:'Customer'}];

const ShowBarcode = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const barcodesData = useSelector(state => state.barcodes.barcodes);

    useEffect(()=>{
        dispatch(getBarcodeData())
    },[dispatch])
    
    const handleDeleteBarcodeCallback = (value, message) => {
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
            dispatch(deleteBarcodeData(id , handleDeleteBarcodeCallback))
        }
    }
    
    return (
    <>
    <p className="h4">Barcodes</p>
    <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/barcodes/new-barcodes', state: { type:'New' }})}} color="success">+ New Barcode</CButton>
    <div className="custom-table-sec">
        <CCard className='customerTable'>
            <CCardBody>
                <CDataTable
                items={barcodesData && barcodesData.length>0 ? barcodesData : []}
                fields={fields}
                itemsPerPage={5}
                pagination= {barcodesData.length>5 ? true : false}
                scopedSlots={{
                    'edit':
                    (item) => (
                    <td>
                        <CButton type="button" onClick={()=>{ history.push({pathname: '/barcodes/new-barcodes', search: `${item.id}`, state: { detail: item , type:'Edit' }})}}><CIcon name="cil-pencil" /></CButton>
                    </td>
                    ),
                    'view':
                    (item) => (
                    <td>
                        <CButton type="button" onClick={()=> history.push({pathname: `/barcodes/${item.id}`, state: { detail: item , type:'Edit' }})} >View </CButton>
                    </td>
                    ),
                    'delete':
                    (item) => (
                    <td>
                        <CButton type="button" onClick={(e)=> handleDelete(e, item.id)} ><CIcon name="cil-trash" /> </CButton>
                    </td>
                    ),
                }}/>
            </CCardBody>
        </CCard>
    </div>
    </>
    )
}

export default ShowBarcode
