import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';
import navigationuser from './_navuser';

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow.sidebarShow);

 return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <div className="nav_title">
        <i className="fa fa-paw"></i>
        <span>CPV</span>
      </div>
       <div className="profile clearfix">
              <div className="profile_pic">
                <img src="http://dev.fuzlab.com/cdn-cpv/images/img.jpg" alt="..." className="img-circle profile_img"/>
              </div>
              <div className="profile_info">
                <span>Welcome,</span>
                <h2>admin</h2>
              </div>
            </div>
      {/* <CSidebarBrand className="d-md-down-none" to="/">

        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand> */}
      <CSidebarNav>

        <CCreateElement
          items={sessionStorage.getItem('isstaff')==='S'? navigation : navigationuser}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
