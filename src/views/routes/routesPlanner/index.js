import React, {useEffect, useState} from 'react';
import { CCard, CCardBody, CButton, CDataTable ,CFormGroup } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";

//Actions
import {getPickuproutesData, addPickuproutesData, deletePickuproutesData} from '../../../redux/actions/pickroutesAction';
import {getCustomerData} from '../../../redux/actions/customerAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'id', label: 'ID' }, { key: 'route_name', label: 'Name' }, { key: 'address1', label: 'Address' }, { key: 'address2', label: 'Address2' }, { key: 'city', label: 'City' }, { key: 'state', label: 'State' }, { key: 'zipcode', label: 'Zipcode' }, { key: 'mobile', label: 'Mobile' }, { key: 'phone', label: 'Phone' }];

const plannerfields = [{ key: 'checkbox', label: '' }, { key: 'add', label: 'InRoute' }, 'name', { key: 'address1', label: 'Address' }, 'address2', "city", "state", { key: 'zip', label: 'Zipcode' }, "mobile", { key: 'phone', label: 'Phone' }];

const RoutesPlanner = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const [customerid , setId]=useState([]);

    const routeid = props.location && props.location.search ? props.location.search : "";

    useEffect(()=>{
        dispatch(getCustomerData());
        dispatch(getPickuproutesData(routeid.substring(1,routeid.length)));
      },[dispatch, routeid])
      const customerData = useSelector(state => state.customerData.customer);

      const plannerData = useSelector(state => state.pickroutes.pickroutes);
      let plannerDataarray = []
      plannerData && plannerData.length>0 && plannerData.forEach((value, key) => {
          plannerDataarray.push(plannerData[key].customer.id);
      });

      const handleRequestCallback = (value, message) => {
          if (value) {
            alert.show(message, { timeout: 2000, type: 'success', position: 'middle' });
            // history.push('/routes/show-routes');
        dispatch(getPickuproutesData(routeid.substring(1,routeid.length)));
          }
          else if(!value){
            alert.show(message , {timeout:4000 , type:'error', position: 'middle'})
          }
        }

        const handlecustomerid = (id) => {
            let ids = customerid
            customerid.includes(id) ? ids.splice(ids.indexOf(id), 1) : ids.push(id);    
            setId(ids);
        }

      const handleAddTransaction = (type) => {
            if ( customerid ) {
              if(type==="add") {
                  const  requestObj={
                    customers: customerid
             }
             dispatch(addPickuproutesData(requestObj,routeid.substring(1,routeid.length), handleRequestCallback));
            } 
            else {
                const  requestObj={
                    customers: customerid
                }
           dispatch(deletePickuproutesData(requestObj,routeid.substring(1,routeid.length), handleRequestCallback));
          }
            }
    }

    return (
        <>
            <p className="h4">Routes Planner</p>
            <p className="small"> Select a customer below to add to this route, or you can filter your search to narrow down the list of customers</p>
            <p className="h5 mt-3">  Currently Assigned to this Route</p>
            <div className="custom-table2-sec mb-5">
                <CCard className='customerTable'>

                    <CCardBody>

                        <CDataTable
                            items={plannerData}
                            fields={fields}
                            itemsPerPage={5}
                            pagination={plannerData.length > 5 ? true : false}
                            scopedSlots={{                                
                                'address1':
                                (item) => (
                                    <td>
                                        {item.customer.address1}
                                    </td>
                                ),                                
                                'address2':
                                (item) => (
                                    <td>
                                        {item.customer.address2}
                                    </td>
                                ),                                
                                'city':
                                (item) => (
                                    <td>
                                        {item.customer.city}
                                    </td>
                                ),                                
                                'state':
                                (item) => (
                                    <td>
                                        {item.customer.state}
                                    </td>
                                ),                                
                                'zipcode':
                                (item) => (
                                    <td>
                                        {item.customer.zip}
                                    </td>
                                ),                                
                                'mobile':
                                (item) => (
                                    <td>
                                        {item.customer.mobile}
                                    </td>
                                ),                                
                                'phone':
                                (item) => (
                                    <td>
                                        {item.customer.phone}
                                    </td>
                                ),
                            }}
                        />
                    </CCardBody>
                </CCard>
                <p className="h4">Routes Planner</p>
                <div > <CButton className="mr-3"  onClick={() =>handleAddTransaction('add')} color="success">Add to Route</CButton>  <CButton  onClick={() =>handleAddTransaction('delete')} color="danger">Remove from Route</CButton> </div>
                <CCard className='customerTable blue-th'>

                    <CCardBody>

                        <CDataTable
                            items={customerData}
                            fields={plannerfields}
                            itemsPerPage={5}
                            pagination={customerData.length > 5 ? true : false}
                            scopedSlots={{
                                'checkbox':
                                    (item, i) => (
                                        <td key={i}>
                                            <CFormGroup variant="custom-checkbox" inline>
                                            <input name={item.name} type="checkbox"  id={item.id} onClick={() => handlecustomerid(item.id)}/>
                                            </CFormGroup>
                                        </td>
                                    ),
                                'add':
                                    (item) => (
                                        <td>
                                            <i className={  `fa fa-${plannerDataarray.includes(item.id) ? 'check': 'ban'} `} aria-hidden="true" style={{ color: plannerDataarray.includes(item.id)?'green' :'red'}}></i>
                                          </td>
                                    ),

                            }}

                        />
                    </CCardBody>
                </CCard>
                <div > <CButton className="mr-3" onClick={() =>handleAddTransaction('add')} color="success">Add to Route</CButton>  <CButton  onClick={() =>handleAddTransaction('delete')} color="danger">Remove from Route</CButton> </div>
            </div>
        </>
    )
}

export default RoutesPlanner
