import React from 'react'
import {
  // CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  //CHeaderNavLink,
  // CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdownTasks = () => {
  //  const itemsCount = 5
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2 d-lg-none"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-applications-settings" size="lg" />
        {/* <CBadge shape="pill" color="warning">{itemsCount}</CBadge> */}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        {/* <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {itemsCount} screens</strong>
        </CDropdownItem> */}
        <CDropdownItem className="d-block" to="/Ams-Dashboard/Dashboard">AMS Dashboard
          {/* <CHeaderNavLink to="/alarms" style={{color: '#3c4b64'}}>Event Logs</CHeaderNavLink> */}
        </CDropdownItem>
        <CDropdownItem className="d-block" to="/Portal-Management/Role-and-access-rights">Portal Management
          {/* <CHeaderNavLink to="/dashboard" style={{color: '#3c4b64'}}>Dashboard</CHeaderNavLink> */}
        </CDropdownItem>
        <CDropdownItem className="d-block" to="/Master-Data/State-List">Master Data
          {/* <CHeaderNavLink to="/keyStatus" style={{color: '#3c4b64'}}>Key Status</CHeaderNavLink> */}
        </CDropdownItem>
        <CDropdownItem className="d-block" to="/Ams-Configuration">AMS Configuration
          {/* <CHeaderNavLink to="/eventLogs" style={{color: '#3c4b64'}}>Reports</CHeaderNavLink> */}
          {/* </CDropdownItem>
        <CDropdownItem className="d-block" to="/settings">Settings */}
          {/* <CHeaderNavLink to="/settings" style={{color: '#3c4b64'}}>Settings</CHeaderNavLink> */}
        </CDropdownItem>
        {/* <CDropdownItem className="d-block">
          <div className="small mb-1">ReactJS Version <span className="float-right"><strong>25%</strong></span></div>
          <CProgress size="xs" color="danger" value={25} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">VueJS Version <span className="float-right"><strong>50%</strong></span></div>
          <CProgress size="xs" color="warning" value={50} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">Add new layouts <span className="float-right"><strong>75%</strong></span></div>
          <CProgress size="xs" color="info" value={75} />
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="small mb-1">Angular 2 Cli Version <span className="float-right"><strong>100%</strong></span></div>
          <CProgress size="xs" color="success" value={100} />
        </CDropdownItem>
        <CDropdownItem className="text-center border-top"><strong>View all tasks</strong></CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownTasks
