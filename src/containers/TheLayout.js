import React, { useEffect } from 'react'
import {
  TheContent,
  TheSidebar,
  TheHeader
} from './index'
import { getAccessToken }  from '../helper/sessionFunction';
import { useHistory } from 'react-router-dom'

const TheLayout = () => {
  const history = useHistory();

  useEffect(() => {
    const token = getAccessToken()
    if(!token ||  token === 'null'){
      history.push('/login');
    }

  })

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
    </div>
    </div>
  )
}

export default TheLayout
