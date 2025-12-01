import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  //  CToggler,
  //  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  //CNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CDropdown,
  CDropdownItem,
  CLabel,
  CDropdownToggle, CDropdownMenu
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import "./TheHeader.scss"
// routes config
// import routes from '../routes'
import { logoUrl } from '../model';

import {
  //   TheHeaderDropdown,
  //   TheHeaderDropdownMssg,
  //   TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
} from './index'
import { useDispatch, useSelector } from 'react-redux'
import { update_lastlogin } from '../actions/PortalmngAction/PortalUserAction'

//const { role } = require('../model')

const TheHeader = () => {

  const getUser = sessionStorage.getItem('user');
  //console.log('getuser',getUser);
  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );
  // const [Islogout, setlogout] = React.useState(false);
  const dispatch = useDispatch()

  // React.useEffect(()=>{
  //   if(Islogout){
  //     const lastlogin ={
  //         getUser,
  //         date: Date.now()
  //       }
  //       dispatch(update_lastlogin(lastlogin));
  //   }
  // },[])

  const Logout = () => {
    const lastlogin = {
      getUser,
      //date: Date.now()
    }
    dispatch(update_lastlogin(lastlogin));
    //setlogout(true);
    sessionStorage.clear();
    window.location.reload()
  };

  //   window.onunload = () => {
  //     // Clear the local storage
  //     sessionStorage.clear();
  //  }
  let history = useHistory();

  // var host = window.location.protocol + window.location.hostname;

  return (
    <CHeader withSubheader>
      <CSubheader className="px-3 justify-content-between">
        <CHeaderNav className="mr-auto">
          <img src={logoUrl} alt="logopng" style={{ "width": "150px", "height": "80px" }} />
          <CHeaderNavItem className="px-3" >

            <span className="h1" style={{ fontWeight: '800', "fontSize": "25px" }}>AMS</span>
            <span className="h1" style={{ fontWeight: '800', "fontSize": "25px" }}>CENTRAL</span>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3" >
            <span className="h4" style={{ fontWeight: '800', "fontSize": "1.2rem" }}>Version 1.2.2</span>
          </CHeaderNavItem>

        </CHeaderNav>

        <div className="mfe-2 c-subheader-nav">

          <CDropdown direction="down">

            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <CLink className="c-subheader-nav-link h6 px-3" to="#">
                {getUser}
                &nbsp;User &nbsp;
                <CIcon name="cil-user" alt="Settings" />
              </CLink>
            </CDropdownToggle>
            <CDropdownMenu placement="bottom-end" className="pt-0" style={{ margin: 0 }}>

              <CDropdownItem className="d-block" onClick={Logout}>

                Logout
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>



        </div>
      </CSubheader>
      <div style={{ "display": "flex", "justifyContent": "space-between", "backgroundColor": "rgb(0 196 102)", width: "100%", height: "50px" }}>
        <CHeaderNav className="mr-auto">
          <CHeaderNavItem className="px-3" >
            {"   "}
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3" >
            {" "}
          </CHeaderNavItem>

        </CHeaderNav>


        <CHeaderNav>
          <CHeaderNavItem className="px-3 h6 d-md-down-none">
            <CHeaderNavLink to="/Ams-Dashboard/Dashboard" style={{ color: 'white' }} className={history.location.pathname.match("/Ams-Dashboard") !== null ? "active-nav-link" : ""}>AMS Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3 h6 d-md-down-none">
            <CHeaderNavLink to="/Portal-Management/Role-and-access-rights" style={{ color: 'white' }} className={history.location.pathname.match("/Portal-Management") !== null ? "active-nav-link" : ""} >Portal Management</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3 h6 d-md-down-none">
            <CHeaderNavLink to="/Master-Data/State-List" style={{ color: 'white' }} className={history.location.pathname.match("/Master-Data") !== null ? "active-nav-link" : ""} >Master Data</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3 h6 d-md-down-none">
            <CHeaderNavLink to="/Ams-Configuration" style={{ color: 'white' }} className={history.location.pathname.match("/Ams-Configuration") !== null ? "active-nav-link" : ""}>AMS Configuration</CHeaderNavLink>
          </CHeaderNavItem>
          <TheHeaderDropdownTasks />
        </CHeaderNav>
      </div>

    </CHeader>

  )
}

export default TheHeader
