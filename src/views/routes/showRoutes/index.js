import React, {useEffect} from 'react';
import { CCard, CCardBody, CButton, CDataTable } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAlert } from "react-alert";

//Actions
import {getRoutesData, deleteRoutesData} from '../../../redux/actions/routesAction';

// eslint-disable-next-line no-sparse-arrays
const fields = [{ key: 'planner', label: 'Planner' }, { key: 'pickup', label: 'Pickup' }, { key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }, 'name', 'day', 'collector'];

const ShowRoutes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const routesData = useSelector(state => {
        return state.routes.routes
    });

    useEffect(()=>{
       dispatch(getRoutesData())
     },[dispatch])

     const handleDeleteRouteCallback = (value, message) => {
         if (value) {
           alert.show(message, { timeout: 2000, type: 'success' , position: 'middle'});
         }
         else if(!value){
           alert.show(message , {timeout:2000 , type:'error', position: 'middle'});
         }
       }

     const handleDelete = (e, id) => {
         e.preventDefault()
         if(id){
            dispatch(deleteRoutesData(id, handleDeleteRouteCallback))
         }
     }

    return (
        <>
            <p className="h4">Routes</p>
            <CButton className="mr-3" onClick={()=>{ history.push({pathname: '/routes/new-routes', state: { type:'New' }})}} color="success">+ Add New Routes</CButton>
            <div className="custom-table-sec">
                <CCard className='customerTable'>
                    <CCardBody>
                        <CDataTable
                            items={routesData && routesData.length>0 ? routesData : []}
                            fields={fields}
                            itemsPerPage={5}
                            pagination={routesData.length > 5 ? true : false}
                            scopedSlots={{
                                'planner':
                                    (item) => (
                                        <td>
                                            <CButton type="button" onClick={()=> history.push({pathname: '/routes/planner', search: `${item.id}`})} ><CIcon name="cil-calendar" /> </CButton>
                                        </td>
                                    ),
                                'pickup':
                                    (item) => (
                                        <td>
                                            <CButton type="button" onClick={()=> history.push({pathname: '/routes/pickup', search: `${item.id}`})} ><CIcon name="cil-calendar" /> </CButton>
                                        </td>
                                    ),
                                'edit':
                                    (item) => (
                                        <td>
                                            <CButton type="button" onClick={()=>{ history.push({pathname: '/routes/new-routes', search: `${item.id}`, state: { detail: item , type:'Edit' }})}}><CIcon name="cil-pencil" /> </CButton>
                                        </td>
                                    ),
                                'delete':
                                    (item) => (
                                        <td>
                                            <CButton onClick={(e) => handleDelete(e, item.id)} type="button" ><CIcon name="cil-trash" /> </CButton>
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

export default ShowRoutes
