import React, { useState,useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow, CFormGroup,
    CLabel, CInput, CInputCheckbox
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";
import { SelectInputObj, SelectInput } from '../../../containers';
import moment from 'moment-timezone';

//action
import { getCustomerData } from '../../../redux/actions/customerAction';
import { getTransactionDataByCustomer } from '../../../redux/actions/transactionsActions';
import { addNewPaymentsData, updatePaymentsData, getPaymentsbyidData } from '../../../redux/actions/paymentsAction';

const EditPayment = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [customer, setCustomer] = useState('');
    const [newVal, setNewVal] = useState('');
    const [payout, setPayout] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [isSave, setSave]=useState(false);

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return setDate([year, month, day].join('-'));
    }

    const newd  = ['YES', 'NO']

    const customerData = useSelector(state => state.customerData.customer);
    const customers = [{label:'---',value:''}];
    customerData.map(customer => customers.push({label:customer.name, value:customer.id}));
    
    const transactionData = useSelector(state => state.transactions.transactionsbyid);
    const transactions = [];
    transactionData.map(transaction => transactions.push({label:transaction.collection_date, value:transaction.id}));

    const [error, setError] = useState([]);

    useEffect(()=>{
        dispatch(getCustomerData());
        formatDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getPaymentsbyidData(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const paymentD = useSelector(state => state.payments.paymentsbyid);
    const paymentData = [paymentD];
         
    useEffect(() => {
        if(editType==="Edit" ){
            if(paymentData && paymentData.length>0){
                paymentData.forEach((item) => {
          setId(item.id ? item.id :'');
          setCustomer(item.customer ? item.customer :'');
          dispatch(getTransactionDataByCustomer(item.customer));
          setDate(moment(item.create_date).local().format('YYYY-MM-DD'));
          setTransaction(item.transaction ? item.transaction :'');
          setNewVal(item.new===0 ? 'NO' : 'YES');
            })
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentD]);

     useEffect(() => {
        if(editType==="New" ){
         setId('');
         setCustomer('');
         setTransaction([]);
         setNewVal('');
         setSave(false);
         formatDate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }}, [editType])

    const handleInputCheck =(event) => {
        const target = event.target;
        var value = parseInt(target.value);
        let permiss = transaction
        
        permiss.includes(value) ? permiss.splice(permiss.indexOf(value), 1) : permiss.push(value);
            setTransaction(permiss);
    }

    const handleInputChange = (event, type) => {
        if (type === "customer") {
            if (error.includes('customer')) {
                const errorremained = error.filter((value) => { return value !== "customer"; })
                setError(errorremained);
            }
            setCustomer(event.target.value);
            dispatch(getTransactionDataByCustomer(event.target.value));
        }
        else if(type=== "transaction"){
            if (error.includes('transaction')) {
                const errorremained = error.filter((value) => { return value !== "transaction"; })
                setError(errorremained);
            }
            var joined = transaction.concat(Array.from(event.target.selectedOptions, item => parseFloat(item.value)));
           setTransaction(joined);
        }
        else if (type==="new"){
            setNewVal(event.target.value)
        }
}

    const handleAddPayment = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else if (customer) {
         setSave(true)
        }
    }
 
    const handlePaymentCallback = (value, message) => {
      if (value) {
        alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
        history.push('/payments/show-payment');
      }
      else if(!value){
        alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
      }
    }

    const amount = transaction.length>0 ? transaction.reduce((total, t) => total + t, 0): 0;

    const handleAddTransaction =()=> {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
            alert.show('Select a transaction' , {timeout:2000 , type:'error', position: 'middle'});
        }else if(transaction.length>0){
            if(editType==="New") {
                const  customerObj={
                    customer: customer,
                    create_date: moment(date).utc(),
                    transaction: transaction,
                    new: newVal==='YES' ? 1 : 0
                }
                dispatch(addNewPaymentsData(customerObj, handlePaymentCallback));
            }else {
                const  customerObj={
                    id: id,
                    customer: customer,
                    create_date: moment(date).utc(),
                    transaction: transaction,
                    new: newVal==='YES' ? 1 : 0
                }
                dispatch(updatePaymentsData(customerObj, handlePaymentCallback));
            }
        }
    }

    const handleFormValidation = () => {
        const error = [];

        if (!customer || customer === '-----') {
            error.push('customer')
        }
        if(isSave && transaction.length===0){
            error.push("transaction")
        }
        return error;
    }

return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            {editType} Payments
                        </CCardHeader>
                        {!isSave &&<>
                        <CCardBody>
                      <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                              <SelectInputObj title="Customer*: " error={error} errorMessage="Please Select Customer from the List" value={customer} data={customers} type="customer" handleInputChange={handleInputChange} />
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Collection date*: </CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="date" id="date-input" name="date-input" placeholder="date" value={date} onChange={(event) => setDate(event.target.value)} />
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                         <CCardFooter>
                            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/payments/show-payment'})}} color="success" >Back</CButton>
                            <CButton className="mr-3" style={{float: 'right'}} color="success" onClick={() => handleAddPayment()}> Save</CButton>
                        </CCardFooter></>}


                        {isSave===true ? transactions.length>0 ? <>
                        <CCardBody>
                      <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      {/* <SelectInputObj title="Transaction: *"  multiple={true} error={error} errorMessage="Please Select Transactions from the List" value={transaction} data={transactions} type="transaction" handleInputChange={handleInputChange} /> */}
                                 <>Transactions*:<br />
                                 <div style={{height: `${(window.innerHeight)/7}px`, border: '1px solid black', overflow:'scroll'}}>{transactionData.map((permission) => {
                                     return (
                                     <div style={{marginTop: '3%' ,marginBottom: '3%'}}><input type="checkbox"  key={permission.id} style={{marginLeft: '27%', maxHeight: 'inherit'}} value={permission.id} name='permission' defaultChecked={transaction.includes(permission.id)} onChange={handleInputCheck}/><span  key={permission.id} style={{marginLeft: '3%', maxHeight: 'inherit'}}>{permission.collection_date}</span><br /></div>
                                     )
                                 })}</div></>
                      {/* <CFormGroup row>
                         <CCol md="3">
                                        <CLabel htmlFor="text-input">Amount*: </CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                   <span> {amount}</span>
                                    </CCol>
                                </CFormGroup> */}
                                <br /><SelectInput title="New*: " error={error} errorMessage="Please Select Transactions from the List" value={newVal} data={newd} type="new" handleInputChange={handleInputChange} />
                                {/* <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Payout:*</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number" value={payout} step="0.01" placeholder="0.0" id="text-input" name="sales" onChange={(event)=> setPayout(event.target.value)} />
                                    </CCol>
                                </CFormGroup> */}
                            </CForm>
                        </CCardBody>
                         <CCardFooter>
                            <CButton className="mr-3" style={{float: 'right'}} color="success" onClick={() => handleAddTransaction()}> {editType ==="New" ? 'Add Payment' : 'Update Payment'}</CButton>
                            <CButton className="mr-3" color="success" onClick={() => setSave(false)}>Back</CButton>
                        </CCardFooter></>:<><p>No Transactions Available for This Customer</p>
                         <CCardFooter>
                            <CButton style={{float: 'right'}} className="mr-3" color="success" onClick={() => setSave(false)}>Back</CButton>
                        </CCardFooter></>: null}
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditPayment

