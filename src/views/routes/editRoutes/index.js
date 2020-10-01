import React, { useState,useEffect } from 'react'
import { CButton, CCard, CCardBody,
  CCardHeader, CCol, CForm, CRow
} from '@coreui/react'
import { TextInput, SelectInputObj, SelectInput } from '../../../containers';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { weekDays } from '../../../config/mockData';

//action
import { addNewRoutesData, updateRoutesData, getRoutesbyidData } from '../../../redux/actions/routesAction';
import { getCollectorData } from '../../../redux/actions/collectorAction';

const EditForms = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [collector, setCollector] = useState('');
  const [error, setError] = useState([])

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const collectorData = useSelector(state => {
      return state.collector.collector
  });
  const collectors = [{label:'---',value:''}];
  collectorData.map(collector => collectors.push({label:collector.first_name, value:collector.id}));

  useEffect(()=>{
     dispatch(getCollectorData())
   },[dispatch])

   const editType= props.location && props.location.search && props.location.search ? "Edit" : "New";
    const uid = props.location && props.location.search && props.location.search ? props.location.search : '';

    useEffect(()=>{
        if(editType==="Edit"){
            dispatch(getRoutesbyidData(uid.substring(1,uid.length)));
        }
    },[dispatch, editType, uid]);

    const routeD = useSelector(state => state.routes.routesbyid);
    const routeData = [routeD];

  useEffect(() => {
    if(editType==="Edit" ){
        if(routeData && routeData.length>0){
            routeData.forEach((item) => {
      setId(item.id ? item.id :'');
      setName(item.name ? item.name :'');
      setDay(item.day ? item.day :'');
      setCollector(item.collector ? item.collector :'');
    })
  }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [routeD]);

useEffect(() => {
  if(editType==="New" ){
    setId('');
    setName('');
    setDay('');
    setCollector('');
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [editType]);
 
  const handleRoutesCallback = (value, message) => {
    if (value) {
      alert.show(message, { timeout: 2000, type: 'success' , position: 'middle'});
      history.push('/routes/show-routes')
    }
    else if(!value){
      alert.show(message , {timeout:2000 , type:'error', position: 'middle'})
    }
  }
  
  const handleInputChange = (event, type) => {
    if (type === 'name') {
      if (error.includes('name')) {
        const errorremained = error.filter((value) => { return value !== "name"; })
        setError(errorremained);
      }
      setName(event.target.value);
    }

    if (type === 'day') {
      if (error.includes('day')) {
        const errorremained = error.filter((value) => { return value !== "day"; })
        setError(errorremained);
      }
      setDay(event.target.value);
    }
    if (type === 'collector') {
      if (error.includes('collector')) {
        const errorremained = error.filter((value) => { return value !== "collector"; })
        setError(errorremained);
      }
      setCollector(event.target.value);
    }

  }


  const handleAddRoute = () => {
    const error = handleFormValidation();
    if (error && error.length > 0) {
      setError(error);
    }
    else {
      if (name && day && collector) {
        if(editType==="New") {
          const  customerObj={
            name: name,
            day: day,
            collector: collector
          }
     dispatch(addNewRoutesData(customerObj, handleRoutesCallback));
    } 
    else {
        const  customerObj={
          id: id,
          name: name,
          day: day,
          collector: collector
        }
        dispatch(updateRoutesData(customerObj, handleRoutesCallback));
  }
      }
    }
  }


  const handleFormValidation = () => {
    const error = [];

    if (!name) {
      error.push('name')
    }

    if (!day) {
      error.push('day')
    }

    if (!collector) {
      error.push('collector')
    }

    return error;
  }

  return (
    <>
      <CRow>
        <CCol xs="12" md="12">
          <div className="custom-edit-rout">
            <CCard>
              <CCardHeader>
                <p className="h4"> {editType} Route</p>

                <p className="small">adds a new route. Once you create the route, you will be taken to the route planner so you can select the customers that are to be picked up for this route. You will also be able to add routes that were missed.</p>
              </CCardHeader>
              <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <TextInput errorMessage="Please enter a Name" value={name} error={error} type="name" title="Name*:" handleInputChange={handleInputChange} />
                  <SelectInput title="Day*:" error={error} errorMessage="Please Select day from the List" value={day} data={weekDays} type="day" handleInputChange={handleInputChange} />
                  <SelectInputObj title="Collector*:" error={error} errorMessage="Please Select Collector from the List" value={collector} data={collectors} type="collector" handleInputChange={handleInputChange} />
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9"><CButton className="mr-3"   color="success" onClick={() => handleAddRoute()}>{editType ==="New" ? 'Add Route' : 'Update Route'}</CButton></div>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </div>
        </CCol>

      </CRow>

    </>
  )
}

export default EditForms

