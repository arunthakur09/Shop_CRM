import React, { useState , useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardFooter,
    CCardHeader, CCol, CForm, CFormGroup, CInput,
    CLabel, CRow
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

import { TextInput, SelectInput ,TextAreaInput } from '../../../containers';
import { isValidEmail } from '../../../helper';
import { weekDays , states ,primaryAddresses } from '../../../config/mockData';


//action
import { addNewCustomerData, updateCustomerData, getCustomerbyidData } from '../../../redux/actions/customerAction';

const EditForms = (props) => {
   
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [contactName, setContactName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [fax, setFax] = useState('');
    const [mobile, setMobile] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [primaryAddress, setPrimaryAddress] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [collectorDate, setCollectorDate] = useState('');
    const [commission, setCommision] = useState(0.00);
    const [sales, setSales] = useState(0.00);
    const [rent, setRent] = useState(0.00);
    const [countryTax, setCountryTax] = useState(0.00);
    const [error, setError] = useState([])

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';
    
    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getCustomerbyidData(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);
    const customerD = useSelector(state => state.customerData.customerid);
    const customerData = [customerD];
    
    useEffect(() => {
        if(editType==="Edit" ){
            if(customerData && customerData.length>0){
                customerData.forEach((item) => {
         setId(item.id ? item.id :'');
         setName(item.name ? item.name :'');
         setContactName(item.contact_name ? item.contact_name :'');
         setAddress1(item.address1 ? item.address1 :'');
         setAddress2(item.address2 ? item.address2 :'');
         setCity(item.city ? item.city :'');
         setState(item.state ? item.state :'');
         setZipCode(item.zip ? item.zip :'');
         setCollectorDate(item.collector_day ? item.collector_day :'');
         setCommision(item.commission ? item.commission :'');
         setFax(item.fax ? item.fax :'');
         setMobile(item.mobile ? item.mobile : "");
         setPhone(item.phone ? item.phone : "");
         setEmail(item.email ? item.email : "");
         setPrimaryAddress(item.primary_address_same_as_mailing ? item.primary_address_same_as_mailing : "");
         setPrimaryAddress(item.primaryAddress === '0' ? 'No' : 'Yes');
         setMailingAddress(item.email ? item.email : "");
         setCountryTax(item.county_tax ? item.county_tax :'');
         setSales(item.rent_tax ? item.rent_tax :'');
         setRent(item.sales_tax ? item.sales_tax :'');
        })
    }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [customerD]);

    useEffect(() => {
        if(editType==="New" ){
         setId('');
         setName('');
         setContactName('');
         setAddress1('');
         setAddress2('');
         setCity('');
         setState('');
         setZipCode('');
         setCollectorDate('');
         setFax('');
         setMobile('');
         setPhone('');
         setEmail('');
         setPrimaryAddress('');
         setMailingAddress('');
         setCommision(0.00);
         setCountryTax(0.00);
         setSales(0.00);
         setRent(0.00);
    }}, [editType])

    const handleCustomerCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
          history.push('/customer/show-customer')
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
        }
      }

    const handleInputChange = (event, type) => {
        const re = /^[0-9\b]+$/;
        if (type === "name") {
            if (error.includes('name')) {
                const errorremained = error.filter((value) => { return value !== "name"; })
                setError(errorremained);
            }
            setName(event.target.value);
        }
        else if (type === "contactName") {
            if (error.includes('contactName')) {
                const errorremained = error.filter((value) => { return value !== "contactName"; })
                setError(errorremained);
            }
            setContactName(event.target.value);
        }
        else if (type === "city") {
            if (error.includes('city')) {
                const errorremained = error.filter((value) => { return value !== "city"; })
                setError(errorremained);
            }
            setCity(event.target.value);
        }

        else if (type === 'zipCode') {
            if (event.target.value === '' || re.test(event.target.value)) {
                if (error.includes('zipCode')) {
                    const errorremained = error.filter((value) => { return value !== "zipCode"; })
                    setError(errorremained);
                }
                setZipCode(event.target.value);
            }
        }

        else if (type === 'mobile') {
            if (event.target.value === '' || re.test(event.target.value)) {
                if (error.includes('mobile')) {
                    const errorremained = error.filter((value) => { return value !== "mobile"; })
                    setError(errorremained);
                }
                setMobile(event.target.value);
            }
        }

        else if (type === 'email') {
            if (error.includes('email')) {
                const errorremained = error.filter((value) => { return value !== "email"; })
                setError(errorremained);
            }
            setEmail(event.target.value);
        }

        else if (type === "address1") {
            if (error.includes('address1')) {
                const errorremained = error.filter((value) => { return value !== "address1"; })
                setError(errorremained);
            }
            setAddress1(event.target.value);
        }
        else if(type==="address2"){
            setAddress2(event.target.value);
        }
        else if(type==="mailingAddress"){
            setMailingAddress(event.target.value)
        }
        else if(type==="collectorDate"){
            if (error.includes('collectorDate')) {
                const errorremained = error.filter((value) => { return value !== "collectorDate"; })
                setError(errorremained);
            }
            setCollectorDate(event.target.value)
        }
        else if(type==="state"){
            if (error.includes('state')) {
                const errorremained = error.filter((value) => { return value !== "state"; })
                setError(errorremained);
            }
            setState(event.target.value)

        }
        else if(type==="primaryAddress"){
            setPrimaryAddress(event.target.value)
        }

    }


    const handleAddCustomer = () => {
        const error = handleFormValidation();
        if (error && error.length > 0) {
            setError(error);
        }
        else {
            if (name && contactName && city && zipCode && mobile && email) {
              if(editType==="New") {
                  const  customerObj={
                    name: name,
                    contact_name: contactName,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    zip: zipCode,
                    commission: commission ? commission.toString():'0.00',
                    sales_tax: sales ?sales.toString():'0.00' ,
                    rent_tax: rent ? rent.toString():'0.00',
                    county_tax: countryTax ? countryTax.toString():"0.00",
                    collector_day:collectorDate,
                    fax: fax,
                    mobile: mobile,
                    phone: phone,
                    email: email,
                    primary_address_same_as_mailing: primaryAddresses==="Yes"?"1":"0",
                    mailing_address: mailingAddress
             }
             dispatch(addNewCustomerData(customerObj, handleCustomerCallback));
            } 
            else {
                const  customerObj={
                  id: id,
                  name: name,
                  contact_name: contactName,
                  address1: address1,
                  address2: address2,
                  city: city,
                  state: state,
                  zip: zipCode,
                  commission: commission ? commission.toString():'0.00',
                  sales_tax: sales ?sales.toString():'0.00' ,
                  rent_tax: rent ? rent.toString():'0.00',
                  county_tax: countryTax ? countryTax.toString():"0.00",
                  collector_day:collectorDate,
                  fax: fax,
                  mobile: mobile,
                  phone: phone,
                  email: email,
                  primary_address_same_as_mailing: primaryAddresses==="Yes"?"1":"0",
                  mailing_address: mailingAddress
           }
           dispatch(updateCustomerData(customerObj, handleCustomerCallback));
          }
            }
        }
    }


    const handleFormValidation = () => {
        const error = [];

        if (!name) {
            error.push('name')
        }
        if (!contactName) {
            error.push('contactName')
        }
        if (!email || !isValidEmail(email)) {
            error.push('email')
        }
        if (!city) {
            error.push('city')
        }
        if (!mobile) {
            error.push('mobile')
        }

        if (!zipCode) {
            error.push('zipCode')
        }
        if (!address1) {
            error.push('address1')
        }
        if (!primaryAddress || primaryAddress==="Unknown") {
            error.push('primaryAddress')
        }
        if(!collectorDate){
            error.push('collectorDate')
        }
        if(!state){
            error.push('state')
        }
        return error;
    }



    return (
        <>
            <CRow>
                <CCol xs="12" md="6">
                    <CCard>
                        <CCardHeader>
                            {editType} Customer
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <TextInput errorMessage="Please Enter a Name" value={name} error={error} type="name" title="Name*:" handleInputChange={handleInputChange} />
                                <TextInput errorMessage="Please Enter a Contact Name" value={contactName} error={error} type="contactName" title="Contact*:" handleInputChange={handleInputChange} />
                                <TextAreaInput errorMessage="Please Enter a Address" value={address1} error={error} type="address1" title="Address 1*:" handleInputChange ={handleInputChange} rows={2}/>
                                <TextAreaInput  value={address2} error={error} type="address2" title="Address 2:" handleInputChange ={handleInputChange} rows={2}/>
                                <TextInput errorMessage="Please Enter a City Name" value={city} error={error} type="city" title="City*:" handleInputChange={handleInputChange} />
                                <SelectInput title="State*:"  error={error} errorMessage="Please Select state from the List" value={state} data={states} type="state" handleInputChange={handleInputChange} />
                                <TextInput errorMessage="Please Enter a Zip Code" value={zipCode} error={error} type="zipCode" title="ZipCode*:" handleInputChange={handleInputChange} />
                                <TextInput value={fax} error={error} type="contact" title="Fax" handleInputChange={(event) => setFax(event.target.value)} />
                                <TextInput errorMessage="Please Enter a Mobile Nmber" value={mobile} error={error} type="mobile" title="Mobile*:" handleInputChange={handleInputChange} />
                                <TextInput value={phone} error={error} type="phone" title="Phone:" handleInputChange={(event)=> setPhone(event.target.value)} />
                                <TextInput errorMessage="Please Enter a valid Email Address" value={email} error={error} type="email" title="Email*:" handleInputChange={handleInputChange} />
                                <SelectInput  title ="Primary address same as Mailing*:"  value={primaryAddress} error={error} data={primaryAddresses} type="primaryAddress" handleInputChange={handleInputChange} />
                                <TextAreaInput  value={mailingAddress} error={error} type="mailingAddress" title="Mailing Address:" handleInputChange ={handleInputChange} rows={2}/>
                                 <SelectInput title="Collector date*:"  error={error} errorMessage="Please Select day from the List" value={collectorDate} data={weekDays} type="collectorDate" handleInputChange={handleInputChange} />
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Commission:</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number"  value={commission} placeholder="0.0" step="0.01" id="text-input" name="commission" onChange={(event)=> setCommision(event.target.value)} />
                                    </CCol>
                                </CFormGroup>


                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Sales tax:</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number" value={sales} step="0.01" placeholder="0.0" id="text-input" name="sales" onChange={(event)=> setSales(event.target.value)} />
                                    </CCol>
                                </CFormGroup>


                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Rent tax:</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number" value={rent} placeholder="0.0" step="0.01" id="text-input" name="rent" onChange={(event)=>setRent(event.target.value)} />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">County tax:</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="number" value={countryTax} placeholder="0.0" step="0.01" id="text-input" name="countryTax" onChange={(event)=> setCountryTax(event.target.value)}/>
                                    </CCol>
                                </CFormGroup>

                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                        <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/customer/show-customer'})}} color="success" >Back</CButton>
                            <CButton shape="square" style={{float: 'right'}} color="success" onClick={() => handleAddCustomer()}>{editType ==="New" ? 'Add Customer' : 'Update Customer'}</CButton>
                        </CCardFooter>
                    </CCard>

                </CCol>

            </CRow>

        </>
    )
}

export default EditForms

