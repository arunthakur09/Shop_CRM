import React, {useEffect, useState} from 'react';
import { CCard, CCardBody, CDataTable , CFormGroup  , CButton} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";
import moment from 'moment-timezone';

//Actions
import {getPickuproutesData,updatePickuproutesData} from '../../../redux/actions/pickroutesAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'checkbox', label: '' } , { key: 'pickedUp', label: 'Picked Up' },{ key: 'id', label: 'Route #'},{key:"added_to_route" , label:"Added to Route"}, { key: 'route_name', label: 'Route Name' }, {key:'collector_name', label: "Collector"} , { key: 'customer_name', label: 'Customer Name' }, { key: 'address1', label: 'Address' }, { key: 'address2', label: 'Address2' }, { key: 'city', label: 'City' }, { key: 'state', label: 'State' }, { key: 'zipcode', label: 'Zipcode' },];


const RoutesPickup = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const [customerid , setId]=useState([]);

    const routeid = props.location && props.location.search ? props.location.search : "";

    useEffect(()=>{
        dispatch(getPickuproutesData(routeid.substring(1,routeid.length)))
      },[dispatch, routeid])
      const plannerData = useSelector(state => state.pickroutes.pickroutes);

      const handlecustomerid = (id) => {
        let ids = customerid
        customerid.includes(id) ? ids.splice(ids.indexOf(id), 1) : ids.push(id);    
        setId(ids);
    }

    const handleRequestCallback = (value, message) => {
        if (value) {
          alert.show(message, { timeout: 2000, type: 'success' , position: 'middle'});
        //   history.push('/routes/show-routes');
        dispatch(getPickuproutesData(routeid.substring(1,routeid.length)));
        }
        else if(!value){
          alert.show(message , {timeout:2000 , type:'error', position: 'middle' })
        }
      }

  const handleAddTransaction = () => {
        if ( customerid.length>0 ) {
              const  requestObj={
                pickuproutes: customerid
         }
         dispatch(updatePickuproutesData(requestObj,routeid.substring(1,routeid.length), handleRequestCallback));
      }else{
        alert.show('Select a route first' , {timeout:2000 , type:'error', position:'middle'})
      }
}
    return (
        <>
            <p className="h4">Routes Pickup</p>
            <p className="small"> Select a customer below to add to this route, or you can filter your search to narrow down the list of customers</p>
            <p className="h5 mt-3">  Currently Assigned to this route</p>
            <div className="custom-table2-sec mb-5">
                <CCard className='customerTable'>

                    <CCardBody>

                        <CDataTable
                            items={plannerData}
                            fields={fields}
                            itemsPerPage={5}
                            pagination={plannerData.length > 5 ? true : false}
                            scopedSlots={{
                                'checkbox':
                                    (item, i) => (
                                        <td key={i}>
                                            <CFormGroup variant="custom-checkbox" inline>
                                            <input name={item.name} type="checkbox" onClick={() => handlecustomerid(item.id)} id={item.name} />
                                            </CFormGroup>
                                        </td>
                                    ),
                                'pickedUp':
                                    (item) => (
                                        <td>
                                            <i className={  `fa fa-${item.picked_up ? 'check': 'ban'} `} aria-hidden="true" style={{ color: item.picked_up?'green' :'red'}}></i>
                                        </td>
                                    ),
                                    'address1':
                                    (item) => (
                                        <td>
                                            {item.customer.address1}
                                        </td>
                                    ),
                                    'id':
                                    (item) => (
                                        <td>
                                            {routeid.substring(1,routeid.length)}
                                        </td>
                                    ), 
                                    'customer_name':
                                    (item) => (
                                        <td>
                                            {item.customer.name}
                                        </td>
                                    ),
                                    'added_to_route':
                                    (item) => (
                                        <td>
                                            {moment(item.added_to_route).local().format('YYYY-MM-DD')} at {moment(item.added_to_route).local().format('hh:mm')}
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

                            }}


                        />
                    </CCardBody>
                    <CButton className="mr-3" onClick={() => handleAddTransaction()} color="success">Acknowledge Pickup</CButton>
                </CCard>
            </div>
        </>
    )
}

export default RoutesPickup
