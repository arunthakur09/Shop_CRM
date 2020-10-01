import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow, CFormGroup,
    CLabel, CInput
} from '@coreui/react';
import { TextAreaInput, SelectInputObj } from '../../../containers';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";
import moment, { min } from 'moment-timezone';

//action
import { getBarcodeData } from '../../../redux/actions/barcodeAction';
import { addNewTransactionData, updateTransactionData, getTransactionDataByid } from '../../../redux/actions/transactionsActions';

const EditTransaction = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [date , setDate]=useState('');
    const [id , setId]=useState('');
    const [barcode, setBarcode] = useState('');
    const [time, setTime] = useState('');
    const [comment, setComment] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState([]);
     
    function formatDate() {
       let d = new Date(),
           month = '' + (d.getMonth() + 1),
           day = '' + d.getDate(),
           year = d.getFullYear(),
           hours = d.getHours(),
           mins = d.getMinutes();
   
       if (month.length < 2) 
       month = '0' + month;
       if (day.length < 2) 
       day = '0' + day;
       if (hours.toString().length < 2) 
       hours = '0' + hours;
       if (mins.toString().length < 2)
       mins = '0' + mins;
       setTime([hours, mins].join(':'));
   
       return setDate([year, month, day].join('-'));
    }

    useEffect(()=>{
        dispatch(getBarcodeData());
        formatDate();
    },[dispatch])

    const barcodeData = useSelector(state => state.barcodes.barcodes);
    const barcodes = [{label:'---',value:''}];
    barcodeData.map(barcode => barcodes.push({label:barcode.barcode, value:barcode.id}));

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getTransactionDataByid(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const transactionD = useSelector(state => state.transactions.transactionsid);
    const transactionData = [transactionD];

    useEffect(() => {
        if(editType==="Edit" ){
            if(transactionData && transactionData.length>0){
                transactionData.forEach((item) => {
          setId(item.id ? item.id :'');
          setDate(moment(item.collection_date).local().format('YYYY-MM-DD'));
          setComment(item.comments ? item.comments :'');
          setAmount(item.amount_collected ? item.amount_collected :'');
          setBarcode(item.barcode_id ? item.barcode_id :'');
          setTime(moment(item.collection_date).local().format('hh:mm'));
            })
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionD]);

    useEffect(() => {
        if(editType==="New" ){
         setId('');
         setComment('');
         setBarcode('');
         setAmount('');
         setDate('');
         setTime('');
         formatDate();
    }}, [editType])

    const handleRequestCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
          history.push('/transaction/show-transaction')
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
      }

    const handleInputChange = (event, type) => {
        if (type === "barcode") {
            if (error.includes('barcode')) {
                const errorremained = error.filter((value) => { return value !== "barcode"; })
                setError(errorremained);
            }
            setBarcode(event.target.value);
        }
        else if (type === "amount") {
            if (error.includes('amount')) {
                const errorremained = error.filter((value) => { return value !== "amount"; })
                setError(errorremained);
            }
            setAmount(event.target.value);
        }
    }

    const handleAddTransaction = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (barcode && amount && date ) {
              if(editType==="New") {
                  const  requestObj={
                    collection_date: moment(date+' '+time).utc(),
                    barcode: barcode,
                    comments: comment,
                    amount_collected: amount,
             }
             dispatch(addNewTransactionData(requestObj, handleRequestCallback));
            } 
            else {
                const  requestObj={
                    id: id,
                    collection_date: moment(date+' '+time).utc(),
                    barcode: barcode,
                    comments: comment,
                    amount_collected: amount,
           }
           dispatch(updateTransactionData(requestObj, handleRequestCallback));
          }
            }
        }
    }

    const handleFormValidation = () => {
        const error = [];

        if (!barcode || barcode === '-----') {
            error.push('barcode')
        }

        if (!amount) {
            error.push('amount')
        }
        return error;
    }

    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            {editType} Transaction
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                            <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Create date*: </CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="date-input" name="date-input" placeholder="date" value={date} onChange={(event) => setDate(event.target.value)} />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Create time*: </CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="time" id="time-input" name="time-input" placeholder="time" value={time} onChange={(event) => setTime(event.target.value)} />
                                    </CCol>
                                </CFormGroup>

                                <SelectInputObj title="Barcode*: " error={error} errorMessage="Please Select Barcode from the List" value={barcode} data={barcodes} type="barcode" handleInputChange={handleInputChange} />

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Amount collected*: </CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number" value={amount} step="0.01" className={error.includes('amount') ? "inputError" : ''} placeholder="0.0" id="text-input" name="amount" onChange={(event) => handleInputChange(event, 'amount')} />
                                        {error && error.length > 0 && error.includes('amount') && <div className="error">Please Enter the Amount Collected.</div>}
                                    </CCol>
                                </CFormGroup>

                                <TextAreaInput value={comment} error={error} type="comment" title="Comment: " handleInputChange={(event) => setComment(event.target.value)} rows={2} />
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/transaction/show-transaction'})}} color="success" >Back</CButton>
                            <CButton className="mr-3" color="success" style={{float: "right"}} onClick={() => handleAddTransaction()}>{editType ==="New" ? 'Add Transaction' : 'Update Transaction'}</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditTransaction

