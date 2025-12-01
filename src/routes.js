import React from 'react';
import CabinetOverview from './screens/AmsConfiguration/CabinetOverview/CabinetOverview';
import KeyStatus from './screens/AmsConfiguration/KeyStatus/KeyStatus';
import ManageActivities from './screens/AmsConfiguration/ManageActivities/ManageActivities';
import ManageEvents from './screens/AmsConfiguration/ManageEvents/ManageEvents';
import ManageKeys from './screens/AmsConfiguration/ManageKeys/ManageKeys';
import ManageRoles from './screens/AmsConfiguration/ManageRoles/ManageRoles';
import ManageUsers from './screens/AmsConfiguration/ManageUsers/ManageUsers';
import SiteInformation from './screens/AmsConfiguration/SiteInformation/SiteInformation';
const Dashboard = React.lazy(() => import('./screens/dashboard/Dashboard'));
const RoleAndAccess = React.lazy(() => import('./screens/PortalManagement/RoleAndAccess/RoleAndAccess'));
const AccessRight = React.lazy(() => import('./screens/PortalManagement/AccessManagement/AccessManagement'));
const PortalUser = React.lazy(() => import('./screens/PortalManagement/PortalUser/PortalUser'))
const Smtp = React.lazy(() => import('./screens/PortalManagement/Smtp/Smtp'))
const Firmware = React.lazy(() => import('./screens/PortalManagement/FirmwareOTA/FirmwareOTA'))


//master data
const StateList = React.lazy(() => import('./screens/MasterData/StateList/StateList'))
const RoList = React.lazy(() => import('./screens/MasterData/RoList/RoList'))
const AmsCabinet = React.lazy(() => import('./screens/MasterData/AmsCabinet/AmsCabinet'))
const KeyList = React.lazy(() => import('./screens/MasterData/KeyList/KeyList'))
const ActivityList = React.lazy(() => import('./screens/MasterData/ActivityList/ActivityList'))
const EventTypes = React.lazy(() => import('./screens/MasterData/EventTypes/EventTypes'));

//AMSDASHBOARD

const ADashboard = React.lazy(() => import('./screens/AmsDashboard/ADashboard/ADashboard'));
const ActivityReport = React.lazy(() => import('./screens/AmsDashboard/ActivityReport/ActivityReport'));
const LoginActivityReport = React.lazy(() => import('./screens/AmsDashboard/LoginActivityReport/LoginActivityReport'));
const Event_History = React.lazy(() => import('./screens/AmsDashboard/EventHIstory/Event_History'));
const UserRelatedReport = React.lazy(() => import('./screens/AmsDashboard/UserRelatedReport/UserRelatedReport'));
const CabinetUserReport = React.lazy(() => import('./screens/AmsDashboard/UserRelatedReport/CabinetUserReport'));

//AMSCONFIGURATION

const AmsConfiguration = React.lazy(() => import('./screens/AmsConfiguration/AmsConfiguration'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

  // /Portal-Management
  { path: '/Portal-Management/Role-and-access-rights', exact: true, name: 'Role', component: RoleAndAccess },
  { path: '/Portal-Management/access-rights', exact: true, name: 'AccessRight', component: AccessRight },
  { path: '/Portal-Management/Portal-User', exact: true, name: 'PortalUser', component: PortalUser },
  { path: '/Portal-Management/Smtp', exact: true, name: 'Smtp', component: Smtp },
  { path: '/Portal-Management/Firmware', exact: true, name: 'Firmware', component: Firmware },

  // Master-Data
  { path: '/Master-Data/State-List', exact: true, name: 'MasterData', component: StateList },
  { path: '/Master-Data/Ro-List', exact: true, name: 'MasterData', component: RoList },
  { path: '/Master-Data/AmsCabinet', exact: true, name: 'MasterData', component: AmsCabinet },
  { path: '/Master-Data/KeyList', exact: true, name: 'MasterData', component: KeyList },
  { path: '/Master-Data/ActivityList', exact: true, name: 'MasterData', component: ActivityList },
  { path: '/Master-Data/EventTypes', exact: true, name: 'MasterData', component: EventTypes },

  //AmsDAshboard

  { path: '/Ams-Dashboard/Dashboard', exact: true, name: 'AmsDashboard', component: ADashboard },
  { path: '/Ams-Dashboard/Activity-Report', exact: true, name: 'ActivityReport', component: ActivityReport },
  { path: '/Ams-Dashboard/Login-Activity-Report', exact: true, name: 'LoginActivityReport', component: LoginActivityReport },
  { path: '/Ams-Dashboard/Event-History', exact: true, name: 'EventHistory', component: Event_History },
  { path: '/Ams-Dashboard/User-Related-Report', exact: true, name: 'UserRelatedReport', component: UserRelatedReport },
  { path: '/Ams-Dashboard/Cabinet-Related-Report', exact: true, name: 'CabinetUserReport', component: CabinetUserReport },

  //AmsConfiguration

  { path: '/Ams-Configuration', exact: true, name: 'AmsConfiguration', component: AmsConfiguration },
  { path: '/Ams-Configuration/Site-Information', exact: true, name: 'SiteInformation', component: SiteInformation },
  { path: '/Ams-Configuration/Cabinet-Overview', exact: true, name: 'CabinetOverview', component: CabinetOverview },
  { path: '/Ams-Configuration/Manage-Keys', exact: true, name: 'ManageKeys', component: ManageKeys },
  { path: '/Ams-Configuration/Manage-Roles', exact: true, name: 'ManageRoles', component: ManageRoles },
  { path: '/Ams-Configuration/Manage-Events', exact: true, name: 'ManageEvents', component: ManageEvents },
  { path: '/Ams-Configuration/Manage-Users', exact: true, name: 'ManageUsers', component: ManageUsers },
  { path: '/Ams-Configuration/Manage-Activities', exact: true, name: 'ManageActivities ', component: ManageActivities },
  { path: '/Ams-Configuration/Key-Status', exact: true, name: 'KeyStatus ', component: KeyStatus }
];

export default routes;