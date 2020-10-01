import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//action
import { getBarcodeByidData } from '../../../redux/actions/barcodeAction';
// eslint-disable-next-line no-sparse-arrays

const fields = [{ key: 'edit', label: '' }, { key: 'device_name', label: 'Device Name' }, 'model', { key: 'serial_number', label: 'Serial Number' }, 'description'];

const ViewBarcode = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    let barcodeId= props.location && props.location.pathname && props.location.pathname;
    barcodeId = barcodeId.substring(barcodeId.length-2, barcodeId.length);
    const barcodeData = useSelector(state => state.barcodes.barcodebyid);

    useEffect(()=>{
        dispatch(getBarcodeByidData(barcodeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    return (
        <>
            <p className="h4">Barcode View</p>
            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/barcodes/new-barcodes', search: `${barcodeId}`, state: { type:'Edit', detail: props && props.location && props.location.state && props.location.state.detail && props.location.state.detail }})}} color="warning text-white">Edit This Barcode</CButton>

            <div className="custom-table-sec">
                <CRow>
                    <CCol md="4">
                        <div className="textDiv mt-5">
                            <h4>Barcode</h4>
                            <p>Barcode: {barcodeData.barcode}</p>
                            <p>
                                Customer: {barcodeData.customer && barcodeData.customer.name} <br />
                                Location: {barcodeData.customer && barcodeData.customer.address1}<br />
                        </p>
                        </div>
                    </CCol>
                    <CCol md="8">
                        <CCard className='customerTable barcode-table-dv mt-5'>
                            <CCardBody>
                                <CDataTable
                                    items={barcodeData.devices && barcodeData.devices}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination={barcodeData.devices && barcodeData.devices.length > 5 ? true : false}
                                    scopedSlots={{
                                        'edit':
                                            (item) => (
                                                <td>
                                                    <CButton type="button" onClick={()=>{ history.push({pathname: '/devices/new-devices', search: `${item.id}`, state: { detail: item ,barcode: barcodeData.id, type:'Edit' }})}}><CIcon name="cil-pencil" /> </CButton>
                                                </td>
                                            ),
                                    }}

                                />
                            </CCardBody>
                        </CCard>

                    </CCol>
                </CRow>

            </div>
        </>
    )
}

export default ViewBarcode
