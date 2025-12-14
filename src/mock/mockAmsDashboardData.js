// src/mockAmsDashboardData.js

export const USE_API = false; // later set to true when you wire real APIs

// Keeping all endpoints ready for future wiring
export const API_ENDPOINTS = {
  cabinetStatus: {
    online: '/api/AMS_Dashboard/get_online_sites',
    offline: '/api/AMS_Dashboard/get-offline-sites',
    total: '/api/AMS_Dashboard/get_total_sites',
    unregistered: '/api/AMS_Dashboard/get_unregistered_popup',
  },
  eventSitesStatus: '/api/AMS_Dashboard/get_event_sites',
  activitySitesStatus: '/api/AMS_Dashboard/get_activity_sites',
  accessTypeStatus: '/api/AMS_Dashboard/get_access_list',
  pumpTestStatus: {
    withTest: '/api/AMS_Dashboard/get_testact_count',
    noTest: '/api/AMS_Dashboard/get_notestact_popup',
  },
  deviceHealth: '/api/AMS_Dashboard/get_battery',
};

export const MOCK_DASHBOARD = {
  meta: {
    cabinetStatusDate: '10/12/2025',
    eventStatusDate: '09/12/2025',
    activityStatusDate: '09/12/2025',
    accessStatusDate: '09/12/2025',
    period: 'Last 7 Days',
  },

  // === Snapshot numbers (from your current tiles) ===
  cabinetStatus: {
    online: 605,
    offline: 165,
    totalOtpedCabinets: 770,
    unregistered: 47,
  },
  eventSitesStatus: {
    cabinetsWithEvents: 418,
    cabinetsWithZeroEvent: 352,
  },
  activitySitesStatus: {
    cabinetsWithActivities: 298,
    cabinetsWithZeroActivity: 352,
  },
  accessTypeStatus: {
    pinAccess: 372,
    webAccess: 17,
    pinWebAccess: 6,
    cabinetWithZeroAccess: 375,
  },
  pumpTestStatus: {
    cabinetsWithTest: 64,
    cabinetsWithZeroTest: 706,
  },
  deviceHealth: {
    alertCount: 39,
    totalCabinets: 770,
    avgBatteryPc: 78,
  },

  // === Regional breakdown ===
  byRegion: [
    {
      region: 'North',
      online: 150,
      offline: 30,
      unregistered: 4,
      events: 120,
      activities: 110,
    },
    {
      region: 'South',
      online: 170,
      offline: 40,
      unregistered: 6,
      events: 140,
      activities: 120,
    },
    {
      region: 'East',
      online: 120,
      offline: 50,
      unregistered: 9,
      events: 80,
      activities: 65,
    },
    {
      region: 'West',
      online: 165,
      offline: 45,
      unregistered: 8,
      events: 128,
      activities: 103,
    },
  ],

  // === Site type breakdown for access ===
  accessBySiteType: [
    { type: 'COCO', pin: 150, web: 5, pinWeb: 3, zero: 100 },
    { type: 'DODO', pin: 180, web: 8, pinWeb: 2, zero: 120 },
    { type: 'COCO+', pin: 42, web: 4, pinWeb: 1, zero: 155 },
  ],

  // === Trends for the last 7 days (pure dummy but looks good on charts) ===
  cabinetTrend: [
    { date: '04 Dec', online: 580, offline: 190, unregistered: 50 },
    { date: '05 Dec', online: 590, offline: 185, unregistered: 48 },
    { date: '06 Dec', online: 600, offline: 178, unregistered: 47 },
    { date: '07 Dec', online: 608, offline: 170, unregistered: 46 },
    { date: '08 Dec', online: 602, offline: 176, unregistered: 46 },
    { date: '09 Dec', online: 610, offline: 168, unregistered: 45 },
    { date: '10 Dec', online: 605, offline: 165, unregistered: 47 },
  ],

  eventsTrend: [
    { date: '04 Dec', events: 380, activities: 340 },
    { date: '05 Dec', events: 410, activities: 355 },
    { date: '06 Dec', events: 395, activities: 360 },
    { date: '07 Dec', events: 420, activities: 375 },
    { date: '08 Dec', events: 430, activities: 380 },
    { date: '09 Dec', events: 418, activities: 390 },
    { date: '10 Dec', events: 425, activities: 398 },
  ],

  accessTrend: [
    { date: '04 Dec', pin: 320, web: 12, pinWeb: 4, zero: 410 },
    { date: '05 Dec', pin: 335, web: 13, pinWeb: 4, zero: 398 },
    { date: '06 Dec', pin: 350, web: 14, pinWeb: 5, zero: 385 },
    { date: '07 Dec', pin: 360, web: 15, pinWeb: 5, zero: 379 },
    { date: '08 Dec', pin: 365, web: 16, pinWeb: 5, zero: 374 },
    { date: '09 Dec', pin: 370, web: 17, pinWeb: 6, zero: 370 },
    { date: '10 Dec', pin: 372, web: 17, pinWeb: 6, zero: 375 },
  ],

  testsTrend: [
    { date: '04 Dec', withTest: 58, zeroTest: 712 },
    { date: '05 Dec', withTest: 60, zeroTest: 710 },
    { date: '06 Dec', withTest: 61, zeroTest: 709 },
    { date: '07 Dec', withTest: 63, zeroTest: 707 },
    { date: '08 Dec', withTest: 64, zeroTest: 706 },
    { date: '09 Dec', withTest: 64, zeroTest: 706 },
    { date: '10 Dec', withTest: 64, zeroTest: 706 },
  ],

  // === Device health distribution ===
  healthByBattery: [
    { bucket: '0–20%', count: 8 },
    { bucket: '21–40%', count: 21 },
    { bucket: '41–60%', count: 96 },
    { bucket: '61–80%', count: 210 },
    { bucket: '81–100%', count: 435 },
  ],

  // === Top N lists (tables) ===
  topOfflineSites: [
    {
      siteCode: 'TS001',
      siteName: 'Mumbai COCO 1',
      hoursOffline: 18,
      lastSeen: '10 Dec 2025, 14:05',
    },
    {
      siteCode: 'TS014',
      siteName: 'Pune Highway DODO',
      hoursOffline: 12,
      lastSeen: '10 Dec 2025, 16:10',
    },
    {
      siteCode: 'TS043',
      siteName: 'Nagpur COCO City',
      hoursOffline: 9,
      lastSeen: '10 Dec 2025, 13:42',
    },
    {
      siteCode: 'TS087',
      siteName: 'Nashik Bypass',
      hoursOffline: 7,
      lastSeen: '10 Dec 2025, 11:20',
    },
    {
      siteCode: 'TS102',
      siteName: 'Thane Urban',
      hoursOffline: 5,
      lastSeen: '10 Dec 2025, 17:02',
    },
  ],

  topZeroAccessSites: [
    {
      siteCode: 'TS005',
      siteName: 'Kolkata COCO',
      daysZeroAccess: 7,
    },
    {
      siteCode: 'TS022',
      siteName: 'Delhi Ring Road',
      daysZeroAccess: 5,
    },
    {
      siteCode: 'TS031',
      siteName: 'Chennai South',
      daysZeroAccess: 4,
    },
    {
      siteCode: 'TS056',
      siteName: 'Bangalore Outer',
      daysZeroAccess: 4,
    },
    {
      siteCode: 'TS099',
      siteName: 'Jaipur City',
      daysZeroAccess: 3,
    },
  ],

  topAlertDevices: [
    {
      cabinetId: 10,
      siteCode: 'TS001',
      siteName: 'Mumbai COCO 1',
      lastPing: '10 Dec 2025, 15:59',
      batteryPc: 18,
    },
    {
      cabinetId: 24,
      siteCode: 'TS043',
      siteName: 'Nagpur COCO City',
      lastPing: '10 Dec 2025, 15:54',
      batteryPc: 22,
    },
    {
      cabinetId: 31,
      siteCode: 'TS087',
      siteName: 'Nashik Bypass',
      lastPing: '10 Dec 2025, 15:49',
      batteryPc: 25,
    },
    {
      cabinetId: 46,
      siteCode: 'TS099',
      siteName: 'Jaipur City',
      lastPing: '10 Dec 2025, 15:46',
      batteryPc: 27,
    },
    {
      cabinetId: 51,
      siteCode: 'TS102',
      siteName: 'Thane Urban',
      lastPing: '10 Dec 2025, 15:40',
      batteryPc: 30,
    },
  ],

  topEventSites: [
    { siteCode: 'TS001', siteName: 'Mumbai COCO 1', events: 52 },
    { siteCode: 'TS014', siteName: 'Pune Highway DODO', events: 45 },
    { siteCode: 'TS022', siteName: 'Delhi Ring Road', events: 41 },
    { siteCode: 'TS031', siteName: 'Chennai South', events: 38 },
    { siteCode: 'TS043', siteName: 'Nagpur COCO City', events: 35 },
  ],
};
