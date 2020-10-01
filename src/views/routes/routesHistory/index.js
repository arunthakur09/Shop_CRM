import React, { useEffect} from 'react';
import { CCard, CCardBody, CDataTable } from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';

//action
import { getRoutehistoryData } from '../../../redux/actions/pickroutesAction';

const Routehistory = () => {const fields = [{ key: 'route_name', label: 'Route Name' },{ key: 'route_id', label: 'Route Id' }, { key: 'picked_up', label: 'Picked Up' }, { key: 'picked_up_at', label: 'Picked Up At' }, { key: 'customer_name', label: 'Customer Name' }, { key: 'from_previous_routes', label: 'From Previous Routes' }, { key: 'added_to_route', label: 'Added to Route' }];
    const dispatch = useDispatch();
    const historyData = useSelector(state => state.pickroutes.routehistory);
    console.log(historyData);

    useEffect(()=>{
        dispatch(getRoutehistoryData());
    },[dispatch])

    return (<>
        <p className="h4">Route History</p>
        {/* <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/customer/new-customer', state: { type:'New' }})}} color="success" on> + Add a New Customer</CButton> */}
        <div className="custom-table-sec">
            <CCard className='customerTable'>
                <CCardBody>
                    <CDataTable
                    items={historyData}
                    fields={fields}
                    itemsPerPage={5}
                    pagination= {historyData.length>5 ? true : false}
                     scopedSlots={{
                         'picked_up_at':
                         (item) => (
                        <td>{item.picked_up_at===null?'Not Yet': `On ${((item.picked_up_at).substring(0, (item.picked_up_at).indexOf('T')))} at ${((item.picked_up_at).substring((item.picked_up_at).indexOf('T')+1, (item.picked_up_at).indexOf('T')+6 ))}`}                            
                        </td>
                         ),
                         'added_to_route':
                         (item) => (
                        <td>{item.added_to_route===null?'Not Yet': `On ${((item.added_to_route).substring(0, (item.added_to_route).indexOf('T')))} at ${((item.added_to_route).substring((item.added_to_route).indexOf('T')+1, (item.added_to_route).indexOf('T')+6 ))}`}
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

export default Routehistory
