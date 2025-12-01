import { combineReducers } from 'redux';
import headerReducer from './HeaderReducer';
import topUsersReducer from './TopUsersReducer';
import topKeysReducer from './TopKeysReducer';
import roleAccesReducer from './PortalMngReducer/roleAccesReducer';
import PortalUserReducer from './PortalMngReducer/PortalUserReducer';
import FirmwareReducer from './PortalMngReducer/SmtpReducer';
import LoginReducer from './authReducer/LoginReducer';
import AmsDashboardReducer from './AmsDashboard/AmsDashboardReducer';
import SiteInformationReducer from './AMSConfig/SiteInformationReducer';
import CabinetOverviewReducer from './AMSConfig/CabinetOverviewReducer';
import ManageRolesReducer from './AMSConfig/ManageRolesReducer';
import ManageEventsReducer from './AMSConfig/ManageEventsReducer';
import ManageKeysReducer from './AMSConfig/ManageKeysReducer';
import ManageUsersReducer from './AMSConfig/ManageUsersReducer';
import ManageActivitiesReducer from './AMSConfig/ManageActivitiesReducer';
import StateListReducer from './MasterDataReducer/StateListReducer';
import RoListReducer from './MasterDataReducer/RoListReducer';
import AmsCabinetReducer from './MasterDataReducer/AmsCabinetReducer';
import KeyListReducer from './MasterDataReducer/KeyListReducer';
import EventTypesReducer from './MasterDataReducer/EventTypesReducer';
import ActivityListReducer from './MasterDataReducer/ActivityListReducer';
import GetDropDownReducer from './AmsDashboardReducer/GetDropDownReducer';
import GetStateCodeReducer from './AmsDashboard/GetStateCodeReducer';
import AccessManagementReducer from './PortalMngReducer/AccessManagementReducer';
import AmsConfigSidebarReducer from './AMSConfig/AmsConfigSidebarReducer';

export default combineReducers({
  headerReducer: headerReducer,
  topUser: topUsersReducer,
  topKey: topKeysReducer,
  roleandaccess: roleAccesReducer,
  portaluser: PortalUserReducer,
  LoginReducer: LoginReducer,
  Ddwreducer: GetDropDownReducer,
  Amsdashboard: AmsDashboardReducer,
  siteInfo: SiteInformationReducer,
  cabinetOverview: CabinetOverviewReducer,
  manageRoles: ManageRolesReducer,
  manageEvents: ManageEventsReducer,
  manageKeys: ManageKeysReducer,
  manageUsers: ManageUsersReducer,
  manageActivities: ManageActivitiesReducer,
  statelist: StateListReducer,
  rolist: RoListReducer,
  amscabinet: AmsCabinetReducer,
  keylist: KeyListReducer,
  eventtype: EventTypesReducer,
  activitylist: ActivityListReducer,
  AccessManagement: AccessManagementReducer,
  AmsConfigSidebar: AmsConfigSidebarReducer,
  firmware: FirmwareReducer,
  statecodeReducer: GetStateCodeReducer
});