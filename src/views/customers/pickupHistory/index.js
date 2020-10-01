import React, { useState, useEffect} from 'react';
import { CCard, CCardBody, CDataTable } from '@coreui/react';
import { SelectInputObj } from '../../../containers';
import { useSelector, useDispatch } from 'react-redux';

//action
import { getCustomerData } from '../../../redux/actions/customerAction';
import { getPickupHistoryData } from '../../../redux/actions/historyAction';

const PickupHistory = () => {
    const fields = [{ key: 'route_name', label: 'Route Name' }, { key: 'picked_up', label: 'Picked Up' }, { key: 'picked_up_at', label: 'Picked Up At' }, { key: 'added_to_route', label: 'Added To Route' }, { key: 'from_previous_routes', label: 'From Previous Routes' }];
    const pickupData = useSelector(state => state.pickups.pickups);
    const dispatch = useDispatch();
    const customerData = useSelector(state => state.customerData.customer);
    const customers = [{label:'---',value:''}];
    customerData.map(customer => customers.push({label:customer.name, value:customer.id}));
    
    const [customer, setCustomer] = useState('');
    const [error, setError] = useState([]);

    useEffect(()=>{
        dispatch(getCustomerData())
    },[dispatch])

    const handleInputChange = (event) => {
            setCustomer(event.target.value);
            dispatch(getPickupHistoryData(event.target.value))
    }

return (<>
        <p className="h4">Pickup History</p>
        {/* <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/customer/new-customer', state: { type:'New' }})}} color="success" on> + Add a New Customer</CButton> */}
        <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody><br />
                <div style={{margin: '0% 3% 0% 3%'}}><SelectInputObj title="Customer*: " error={error} errorMessage="Please Select Customer from the List" value={customer} data={customers} type="customer" handleInputChange={handleInputChange} /></div>
                    <CDataTable
                    items={pickupData}
                    fields={fields}
                    itemsPerPage={5}
                    pagination= {pickupData.length>5 ? true : false}
                     scopedSlots={{
                         'picked_up_at':
                         (item) => (
                        <td>{item.picked_up_at===null?'Not Yet Picked': `On ${((item.picked_up_at).substring(0, (item.picked_up_at).indexOf('T')))} at ${((item.picked_up_at).substring((item.picked_up_at).indexOf('T')+1, (item.picked_up_at).indexOf('T')+6 ))}`}
                        </td>
                         ),
                         'added_to_route':
                         (item) => (<td>{item.added_to_route===null?'Not Yet': `On ${((item.added_to_route).substring(0, (item.added_to_route).indexOf('T')))} at ${((item.added_to_route).substring((item.added_to_route).indexOf('T')+1, (item.added_to_route).indexOf('T')+6 ))}`}                            
                         </td>
                         ),
                         'from_previous_routes':
                         (item) => (
                        <td>{item.from_previous_routes===null?'No Data from Previous Routes': item.from_previous_routes}
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

export default PickupHistory
