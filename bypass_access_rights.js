// Script to bypass access rights checks in all files
// This script will be used to systematically replace access rights patterns

const fs = require('fs');
const path = require('path');

// Files to process (from the search results)
const filesToProcess = [
  'src/screens/PortalManagement/Smtp/Smtp.js',
  'src/screens/PortalManagement/RoleAndAccess/RoleAndAccess.js',
  'src/screens/PortalManagement/PortalUser/PortalUser.js',
  'src/screens/PortalManagement/FirmwareOTA/FirmwareOTA.js',
  'src/screens/MasterData/KeyList/KeyList.js',
  'src/screens/MasterData/EventTypes/EventTypes.js',
  'src/screens/AmsDashboard/LoginActivityReport/LoginActivityReport.js',
  'src/screens/AmsDashboard/EventHIstory/Event_History.js',
  'src/screens/AmsDashboard/ActivityReport/ActivityReport.js',
  'src/screens/AmsConfiguration/SiteInformation/SiteInformation.js',
  'src/screens/AmsConfiguration/SideBarPrimary/SideBarPrimary.js',
  'src/screens/AmsConfiguration/ManageUsers/ManageUsers.js',
  'src/screens/AmsConfiguration/ManageRoles/ManageRoles.js',
  'src/screens/AmsConfiguration/ManageKeys/ManageKeys.js',
  'src/screens/AmsConfiguration/ManageEvents/ManageEvents.js',
  'src/screens/AmsConfiguration/ManageActivities/ManageActivities.js',
  'src/screens/AmsConfiguration/KeyStatus/KeyStatus.js',
  'src/screens/AmsConfiguration/CabinetOverview/CabinetOverview.js'
];

// Patterns to replace
const patterns = [
  // Form visibility patterns
  {
    search: /\{checkacc && checkacc\[0\]\.AR_RIGHTS == 2 &&/g,
    replace: '{/* Access rights check bypassed - form always visible */ true &&'
  },
  {
    search: /\{checkacc && checkacc\[0\] && checkacc\[0\]\.AR_RIGHTS == 2 &&/g,
    replace: '{/* Access rights check bypassed - form always visible */ true &&'
  },
  {
    search: /\{checkacc && checkacc\[0\]\.AR_RIGHTS && checkacc\[0\]\.AR_RIGHTS == 2 &&/g,
    replace: '{/* Access rights check bypassed - form always visible */ true &&'
  },
  // Button disabled patterns
  {
    search: /disabled=\{\s*checkacc && checkacc\[0\] && checkacc\[0\]\.AR_RIGHTS == 2\s*\?\s*false\s*:\s*true\s*\}/g,
    replace: 'disabled={false} // Access rights bypassed - always enabled'
  },
  {
    search: /disabled=\{checkacc && checkacc\[0\] && checkacc\[0\]\.AR_RIGHTS == 2 \? false : true\}/g,
    replace: 'disabled={false} // Access rights bypassed - always enabled'
  }
];

console.log('This is a reference script for manual replacement patterns.');
console.log('Use the patterns above to manually replace access rights checks.');