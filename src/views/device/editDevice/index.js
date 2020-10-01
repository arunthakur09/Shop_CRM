import React, { useState,useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter,
    CCardHeader, CCol, CForm, CRow
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { TextInput, SelectInput, TextAreaInput, SelectInputObj } from '../../../containers';
import { currencyTypes, coinTypes } from '../../../config/mockData';

//action
import { addNewDevicesData, updateDevicesData, getDevicesbyidData } from '../../../redux/actions/devicesAction';
import { getBarcodeData } from '../../../redux/actions/barcodeAction'

const EditForms = (props) => {
    const [id, setId] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [model, setModel] = useState('');
    const [notes, setNotes] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [description, setDescription] = useState('');
    const [coinType, setCointType] = useState('');
    const [currencyType, setCurrencyType] = useState('');
    const [barcode ,setBarcode]=useState('');
    const [error, setError] = useState([]);

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const barcodeData = useSelector(state => state.barcodes.barcodes);
    const barcodes = [{label:'---',value:''}];
    console.log(barcodeData)
    barcodeData.map(barcode => barcodes.push({label:barcode.barcode, value:barcode.id}));
    
    useEffect(()=>{
        dispatch(getBarcodeData())
    },[dispatch])

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getDevicesbyidData(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const deviceD = useSelector(state => state.devices.devicesid);
    const deviceData = [deviceD];

    useEffect(() => {
        if(editType==="Edit" ){
            if(deviceData && deviceData.length>0){
                deviceData.forEach((item) => {
                    setId(item.id ? item.id :'');
                setDeviceName(item.device_name ? item.device_name :'');
                setModel(item.model ? item.model :'');
                setBarcode(item.barcode_id ? item.barcode_id :'');
                setNotes(item.description ? item.description :'');
                setCurrencyType(item.currency_type ? item.currency_type :'');
                setCointType(item.coin_type ? item.coin_type :'');
                setDescription(item.description ? item.description :'');
                setSerialNumber(item.serial_number ? item.serial_number :'');
                if(props && props.location && props.location.state && props.location.state.barcode && props.location.state.barcode){
                    setBarcode(props.location.state.barcode);
                }
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceD]);

     useEffect(() => {
        if(editType==="New" ){
         setId('');
         setDeviceName('');
         setModel('');
         setBarcode('');
         setNotes('');
         setCurrencyType('');
         setCointType('');
         setDescription('');
         setSerialNumber('');
    }}, [editType])

    const handleRequestCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
          history.push('/devices/show-devices')
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
      }

    const handleInputChange = (event, type) => {
        if (type === "deviceName") {
            if (error.includes('deviceName')) {
                const errorremained = error.filter((value) => { return value !== "deviceName"; })
                setError(errorremained);
            }
            setDeviceName(event.target.value);
        }
        else if (type === "model") {
            if (error.includes('model')) {
                const errorremained = error.filter((value) => { return value !== "model"; })
                setError(errorremained);
            }
            setModel(event.target.value);
        }
        else if (type === "serialNumber") {
            if (error.includes('serialNumber')) {
                const errorremained = error.filter((value) => { return value !== "serialNumber"; })
                setError(errorremained);
            }
            setSerialNumber(event.target.value);
        }
        else if (type === "coinType") {
            if (error.includes('coinType')) {
                const errorremained = error.filter((value) => { return value !== "coinType"; })
                setError(errorremained);
            }
            setCointType(event.target.value);
        }
        else if (type === "currencyType") {
            if (error.includes('currencyType')) {
                const errorremained = error.filter((value) => { return value !== "currencyType"; })
                setError(errorremained);
            }
            setCurrencyType(event.target.value);
        }
        else if (type === "barcode") {
            if (error.includes('barcode')) {
                const errorremained = error.filter((value) => { return value !== "barcode"; })
                setError(errorremained);
            }
            setBarcode(event.target.value);
        }
    }

    const handleAddCustomer = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (deviceName && barcode && model && serialNumber
                && coinType && currencyType) {
              if(editType==="New") {
                  const  requestObj={
                    device_name: deviceName,
                    model: model,
                    barcode: barcode,
                    currency_type: currencyType,
                    coin_type: coinType,
                    notes: notes,
                    serial_number: serialNumber,
                    description: description
             }
             dispatch(addNewDevicesData(requestObj, handleRequestCallback));
            } 
            else {
                const  requestObj={
                    id: id,
                    device_name: deviceName,
                    model: model,
                    barcode: barcode,
                    currency_type: currencyType,
                    coin_type: coinType,
                    notes: notes,
                    serial_number: serialNumber,
                    description: description
           }
           dispatch(updateDevicesData(requestObj, handleRequestCallback));
          }
            }
        }
    }

    const handleFormValidation = () => {
        const error = [];

        if (!deviceName) {
            error.push('deviceName')
        }
        if (!model) {
            error.push('model')
        }
        if (!serialNumber) {
            error.push('serialNumber')
        }
        if (!coinType || coinType === '-----') {
            error.push('coinType')
        }
        if (!currencyType || currencyType === '-----') {
            error.push('currencyType')
        }
        if (!barcode || barcode === '-----') {
            error.push('barcode')
        }
        return error;
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            {editType} Device
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <TextInput errorMessage="Please Enter a Device Name" value={deviceName} error={error} type="deviceName" title="Devicename*: " handleInputChange={handleInputChange} />
                                <TextInput errorMessage="Please Enter a Model Name" value={model} error={error} type="model" title="Model*: " handleInputChange={handleInputChange} />
                                <TextAreaInput value={notes} error={error} type="notes" title="Notes: " handleInputChange={(event) => setNotes(event.target.value)} rows={2} />
                                <TextAreaInput value={serialNumber} error={error} type="serialNumber" errorMessage="Please Enter a Serial Number" title="Serial number*: " handleInputChange={handleInputChange} rows={2} />
                                <SelectInputObj title="Barcode*: " error={error} errorMessage="Please Select Barcode from the List" value={barcode} data={barcodes} type="barcode" handleInputChange={handleInputChange} />
                                <SelectInput title="Coin Type*: " error={error} errorMessage="Please Select Coin Type from the List" value={coinType} data={coinTypes} type="coinType" handleInputChange={handleInputChange} />
                                <SelectInput title="Currency type*: " error={error} errorMessage="Please Select Currency Type from the List" value={currencyType} data={currencyTypes} type="currencyType" handleInputChange={handleInputChange} />
                                <TextAreaInput value={description} error={error} type="description" title="Description: " handleInputChange={(event) => setDescription(event.target.value)} rows={2} />
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                        <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/devices/show-devices'})}} color="success" >Back</CButton>
                            <CButton color="success" style={{float: "right"}} className="mr-3" onClick={() => handleAddCustomer()}>{editType ==="New" ? 'Add Device' : 'Update Device'}</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default EditForms

