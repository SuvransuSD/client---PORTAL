/* "use client";  // harmless in CRA/Vite, needed in Next.js */

import React, { useEffect, useMemo, useState } from "react";
import "./Style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  CButton,
} from "@coreui/react";
import { CSVLink } from "react-csv";

import {
  cabinetstatus,
  offlinesites,
  emergencydoor,
  emergencydoor_popup,
  get_unregistered_popup,
  online_sites,
  total_sites,
  eventlist,
  eventlist_popup,
  zeroeventlist_popup,
  activitylist,
  activitylist_popup,
  zeroactivitylist_popup,
  accesslist,
  pinaccess_popup,
  bioaccess_popup,
  webaccess_popup,
  pinpluswebaccess_popup,
  fpaccess_popup,
  nobox_popup,
  noactivitybox,
  testact_count,
  testact_popup,
  notestact_popup,
  get_battery,
  clearCaptcha,
  load_demo_dashboard,
} from "../../../actions/AmsDashboard/AmsDashboardAction";


const DEMO_DASHBOARD = process.env.REACT_APP_DEMO_DASHBOARD === "true";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#eab308", "#8b5cf6", "#06b6d4"];

const VIEWS = {
  OVERVIEW: "OVERVIEW",
  EVENTS: "EVENTS",
  ACCESS: "ACCESS",
  TESTS: "TESTS",
  HEALTH: "HEALTH",
};

/* ----------------- small reusable UI pieces ----------------- */

const Tile = ({ label, value, color, subLabel, onClick }) => (
  <div 
    className={`dash-tile ${onClick ? 'dash-tile--clickable' : ''}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <span className="dash-tile__label">{label}</span>
    <span className="dash-tile__value" style={{ color: color || "#0f172a" }}>
      {value}
    </span>
    {subLabel ? <span className="dash-tile__sub">{subLabel}</span> : null}
  </div>
);

const Card = ({ title, subtitle, children, height = 320 }) => (
  <div className="dash-card" style={{ height, minHeight: height, minWidth: 300 }}>
    <div className="dash-card__head">
      <div>
        <h3 className="dash-card__title">{title}</h3>
        {subtitle ? <p className="dash-card__sub">{subtitle}</p> : null}
      </div>
    </div>
    <div className="dash-card__body" style={{ minHeight: height - 80, minWidth: 250 }}>
      {children}
    </div>
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`dash-tab ${active ? "is-active" : ""}`}>
    {label}
  </button>
);

/* ----------------- helpers (safe parsing + grouping) ----------------- */

const toNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const pickCounter = (list, entryName) => {
  if (!Array.isArray(list)) return 0;
  const found = list.find(
    (x) => String(x?.ENTRY || "").toLowerCase() === String(entryName).toLowerCase()
  );
  return toNum(found?.COUNTER);
};

const groupBy = (arr, keyFn) => {
  const map = new Map();
  (arr || []).forEach((item) => {
    const k = keyFn(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  });
  return map;
};

const formatDay = (d) => moment(d).format("DD MMM");

/* --------------------------- Chart Error Boundary --------------------------- */

const ChartErrorBoundary = ({ children, fallback = null }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [children]);

  if (hasError) {
    return fallback || (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '200px',
        color: '#6c757d',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
          Chart temporarily unavailable
        </div>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    console.warn('Chart rendering error:', error);
    setHasError(true);
    return fallback || (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '200px',
        color: '#6c757d'
      }}>
        Chart loading...
      </div>
    );
  }
};



/* --------------------------- main component --------------------------- */

export default function ADashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [view, setView] = useState(VIEWS.OVERVIEW);
  
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [modalHeaders, setModalHeaders] = useState([]);

  // --- redux state (keep what you already have) ---
  const cabinetstatuss = useSelector((s) => s.Amsdashboard.cabinetstatus);

  const unregisteredpopups = useSelector((s) => s.Amsdashboard.unregisteredpopups);
  const onlinesite = useSelector((s) => s.Amsdashboard.onlinesites);
  const offlinesite = useSelector((s) => s.Amsdashboard.offlinesites);
  const totalsite = useSelector((s) => s.Amsdashboard.totalsites);

  const eventlists = useSelector((s) => s.Amsdashboard.eventlists);
  const eventlists_popup = useSelector((s) => s.Amsdashboard.eventlists_popup);

  const activitylists = useSelector((s) => s.Amsdashboard.activitylists);
  const activitylists_popup = useSelector((s) => s.Amsdashboard.activitylists_popup);

  const accesslists = useSelector((s) => s.Amsdashboard.accesslists);

  const testact_counts = useSelector((s) => s.Amsdashboard.testact_counts);

  const get_batterys = useSelector((s) => s.Amsdashboard.get_batterys);

  // Popup data selectors
  const emergencydoor_popups = useSelector((s) => s.Amsdashboard.emergencydoorpopup);
  const zeroeventlists_popup = useSelector((s) => s.Amsdashboard.zeroeventlists_popup);
  const zeroactivitylists_popup = useSelector((s) => s.Amsdashboard.zeroactivitylists_popup);
  const pinaccess_popups = useSelector((s) => s.Amsdashboard.pinsaccess_popup);
  const bioaccess_popups = useSelector((s) => s.Amsdashboard.bioaccess_popup);
  const webaccess_popups = useSelector((s) => s.Amsdashboard.websaccess_popup);
  const pinpluswebaccess_popups = useSelector((s) => s.Amsdashboard.pinwebaccess_popup);
  const fpaccess_popups = useSelector((s) => s.Amsdashboard.fpaccess_popup);
  const nobox_popups = useSelector((s) => s.Amsdashboard.noboxs_popup);
  const testact_popups = useSelector((s) => s.Amsdashboard.testact_popups);
  const notestact_popups = useSelector((s) => s.Amsdashboard.notestact_popups);


  const loadDashboardData = () => {
    if (DEMO_DASHBOARD) {
      dispatch(load_demo_dashboard());
      return;
    }

    // Load all dashboard data
    dispatch(emergencydoor_popup());
    dispatch(emergencydoor());
    dispatch(get_unregistered_popup());
    dispatch(online_sites());
    dispatch(total_sites());
    dispatch(eventlist());
    dispatch(eventlist_popup());
    dispatch(activitylist());
    dispatch(activitylist_popup());
    dispatch(pinaccess_popup());
    dispatch(bioaccess_popup());
    dispatch(webaccess_popup());
    dispatch(pinpluswebaccess_popup());
    dispatch(fpaccess_popup());
    dispatch(noactivitybox());
    dispatch(testact_count());
    dispatch(get_battery());
    dispatch(clearCaptcha());
    dispatch(offlinesites());
    dispatch(cabinetstatus());
    dispatch(accesslist());
    dispatch(zeroeventlist_popup());
    dispatch(zeroactivitylist_popup());
    dispatch(testact_popup());
    dispatch(notestact_popup());
    dispatch(nobox_popup());
  };

  useEffect(() => {
    loadDashboardData();
  }, [dispatch]);

  // Refresh data when component receives focus (user returns from registration)
  useEffect(() => {
    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch]);



  // Modal handlers
  const showModal = (title, data, headers) => {
    setModalTitle(title);
    setModalData(data || []);
    setModalHeaders(headers || []);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalTitle("");
    setModalData([]);
    setModalHeaders([]);
  };

  // Navigation handler for cabinet registration
  const handleCabinetRegistration = (cabinet) => {
    // Store cabinet data in sessionStorage for the registration flow
    sessionStorage.setItem("CABINET_IP_ADDR", cabinet.CABINET_IP_ADDR || "");
    sessionStorage.setItem("CABINET_CODE", cabinet.RO_CODE || "");
    sessionStorage.setItem("LOCATION", cabinet.RO_NAME || "");
    
    // Close the modal first
    setModalVisible(false);
    
    // Navigate to Site List (RoList) to start the registration flow
    history.push("/Master-Data/Ro-List");
  };

  // Tile click handlers
  const handleOnlineClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Cabinet IP", key: "CABINET_IP_ADDR" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Online Cabinets", onlinesite, headers);
  };

  const handleOfflineClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Cabinet IP", key: "CABINET_IP_ADDR" },
      { label: "Last Active", key: "Last_Active_On" },
      { label: "Zone", key: "ZONE_NAME" },
    ];
    showModal("Offline Cabinets", offlinesite, headers);
  };

  const handleUnregisteredClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Cabinet IP", key: "CABINET_IP_ADDR" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Unregistered Cabinets", unregisteredpopups, headers);
  };

  const handleTotalOtpedClick = () => {
    // Combine online and offline sites for total OTPed cabinets
    const totalOtpedData = [...(onlinesite || []), ...(offlinesite || [])];
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Cabinet IP", key: "CABINET_IP_ADDR" },
      { label: "Status", key: "STATUS" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    
    // Add status field to distinguish online vs offline
    const dataWithStatus = totalOtpedData.map(item => ({
      ...item,
      STATUS: onlinesite?.includes(item) ? 'Online' : 'Offline'
    }));
    
    showModal("Total OTPed Cabinets", dataWithStatus, headers);
  };

  const handleEventsClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "Total Events", key: "TOTAL_EVENTS" },
    ];
    showModal("Sites with Events", eventlists_popup, headers);
  };

  const handleZeroEventsClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Sites with Zero Events", zeroeventlists_popup, headers);
  };

  const handleActivitiesClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "Total Activities", key: "TOTAL_ACTIVITIES" },
    ];
    showModal("Sites with Activities", activitylists_popup, headers);
  };

  const handleZeroActivitiesClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Sites with Zero Activities", zeroactivitylists_popup, headers);
  };

  const handlePinAccessClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("PIN Access Sites", pinaccess_popups, headers);
  };

  const handleWebAccessClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Web Access Sites", webaccess_popups, headers);
  };

  const handlePinWebAccessClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("PIN + Web Access Sites", pinpluswebaccess_popups, headers);
  };

  const handleZeroAccessClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Sites with Zero Access", nobox_popups, headers);
  };

  const handleTestsClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Sites with Tests", testact_popups, headers);
  };

  const handleZeroTestsClick = () => {
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Sites with Zero Tests", notestact_popups, headers);
  };

  const handleAlertsClick = () => {
    const headers = [
      { label: "Cabinet ID", key: "CABINET_ID" },
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Battery %", key: "BATTERY_PC" },
      { label: "Last Ping", key: "LAST_PING_TS" },
      { label: "Zone", key: "ZONE_NAME" },
    ];
    showModal("Devices with Alerts", get_batterys, headers);
  };

  const handleTotalCabinetsClick = () => {
    // Show all cabinets (online + offline + unregistered)
    const allCabinets = [
      ...(onlinesite || []).map(item => ({ ...item, STATUS: 'Online' })),
      ...(offlinesite || []).map(item => ({ ...item, STATUS: 'Offline' })),
      ...(unregisteredpopups || []).map(item => ({ ...item, STATUS: 'Unregistered' }))
    ];
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Cabinet IP", key: "CABINET_IP_ADDR" },
      { label: "Status", key: "STATUS" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("All Cabinets", allCabinets, headers);
  };

  const handleBatteryClick = () => {
    const headers = [
      { label: "Cabinet ID", key: "CABINET_ID" },
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Battery %", key: "BATTERY_PC" },
      { label: "Last Ping", key: "LAST_PING_TS" },
      { label: "Zone", key: "ZONE_NAME" },
    ];
    showModal("Battery Status", get_batterys, headers);
  };

  const handleOfflineUnregisteredClick = () => {
    // Combine offline and unregistered cabinets
    const offlineUnregistered = [
      ...(offlinesite || []).map(item => ({ ...item, STATUS: 'Offline' })),
      ...(unregisteredpopups || []).map(item => ({ ...item, STATUS: 'Unregistered' }))
    ];
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Cabinet IP", key: "CABINET_IP_ADDR" },
      { label: "Status", key: "STATUS" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Offline + Unregistered Cabinets", offlineUnregistered, headers);
  };

  const handleTestCoverageClick = () => {
    // Show summary of test coverage
    const testCoverageData = [
      ...(testact_popups || []).map(item => ({ ...item, TEST_STATUS: 'With Test' })),
      ...(notestact_popups || []).map(item => ({ ...item, TEST_STATUS: 'Zero Test' }))
    ];
    const headers = [
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Test Status", key: "TEST_STATUS" },
      { label: "Zone", key: "ZONE_NAME" },
      { label: "State", key: "STATE_NAME" },
    ];
    showModal("Test Coverage Details", testCoverageData, headers);
  };

  // ---------------- build dashboard "shape" from redux ----------------
  const dashboard = useMemo(() => {
    // Cabinet status counters
    const online = pickCounter(cabinetstatuss, "Online");
    const offline = pickCounter(cabinetstatuss, "Offline");
    const unregistered = pickCounter(cabinetstatuss, "Unregistered");
    const totalOtpedCabinets = pickCounter(cabinetstatuss, "Total OTPed Cabinets");

    // Events / Activities counters
    const cabinetsWithEvents = pickCounter(eventlists, "Cabinets with Events");
    const cabinetsWithZeroEvent = pickCounter(eventlists, "Cabinets with Zero Event");

    const cabinetsWithActivities = pickCounter(activitylists, "Cabinets with Activities");
    const cabinetsWithZeroActivity = pickCounter(activitylists, "Cabinets with Zero Activity");

    // Access counters (labels vary sometimes; handle common variants)
    const pinAccess =
      pickCounter(accesslists, "PIN + CARD Access") || pickCounter(accesslists, "PIN + CARD");
    const webAccess =
      pickCounter(accesslists, "WEB + Emergency Access") || pickCounter(accesslists, "WEB + Emergency");
    const pinWebAccess = pickCounter(accesslists, "Multi Access");
    const cabinetWithZeroAccess =
      pickCounter(accesslists, "Cabinet With Zero Access") || pickCounter(accesslists, "No Access");

    // Tests
    const cabinetsWithTest =
      pickCounter(testact_counts, "Cabinets with test performed") ||
      pickCounter(testact_counts, "Cabinets with Test performed");
    const cabinetsWithZeroTest =
      pickCounter(testact_counts, "Cabinets with Zero Test") || pickCounter(testact_counts, "Zero Test");

    // Device health
    const alertCount = Array.isArray(get_batterys) ? get_batterys.length : 0;
    const batteryNums = (get_batterys || [])
      .map((x) => toNum(x?.BATTERY_PC))
      .filter((n) => n > 0 || n === 0);
    const avgBatteryPc =
      batteryNums.length > 0
        ? Math.round(batteryNums.reduce((a, b) => a + b, 0) / batteryNums.length)
        : 0;

    const totalCabinets =
      toNum(totalOtpedCabinets) ||
      (Array.isArray(totalsite) ? totalsite.length : 0) ||
      (online + offline + unregistered);

    // Region aggregation (best-effort using ZONE_NAME; fallback Unknown)
    const onlineByRegion = groupBy(onlinesite, (x) => x?.ZONE_NAME || "Unknown");
    const offlineByRegion = groupBy(offlinesite, (x) => x?.ZONE_NAME || "Unknown");
    const unregByRegion = groupBy(unregisteredpopups, (x) => x?.ZONE_NAME || "Unknown");

    // events/activities by region from popup lists (if present)
    const eventsByRegion = groupBy(eventlists_popup, (x) => x?.ZONE_NAME || "Unknown");
    const actByRegion = groupBy(activitylists_popup, (x) => x?.ZONE_NAME || "Unknown");

    const regionSet = new Set([
      ...onlineByRegion.keys(),
      ...offlineByRegion.keys(),
      ...unregByRegion.keys(),
      ...eventsByRegion.keys(),
      ...actByRegion.keys(),
    ]);

    const byRegion = Array.from(regionSet).map((region) => ({
      region,
      online: (onlineByRegion.get(region) || []).length,
      offline: (offlineByRegion.get(region) || []).length,
      unregistered: (unregByRegion.get(region) || []).length,
      // events/activities: sum totals if present, else count rows
      events: (eventsByRegion.get(region) || []).reduce((sum, r) => sum + toNum(r?.TOTAL_EVENTS), 0),
      activities: (actByRegion.get(region) || []).reduce(
        (sum, r) => sum + toNum(r?.TOTAL_ACTIVITIES || r?.TOTAL_ACITIVITIES),
        0
      ),
    }));

    // 7-day trends (if you don’t have a time-series API yet, we render a flat trend)
    const today = moment().startOf("day");
    const cabinetTrend = Array.from({ length: 7 }).map((_, i) => {
      const d = today.clone().subtract(6 - i, "days");
      return {
        date: formatDay(d),
        online,
        offline,
        unregistered,
      };
    });

    const eventsTrend = Array.from({ length: 7 }).map((_, i) => {
      const d = today.clone().subtract(6 - i, "days");
      return {
        date: formatDay(d),
        events: cabinetsWithEvents,
        activities: cabinetsWithActivities,
      };
    });

    const accessTrend = Array.from({ length: 7 }).map((_, i) => {
      const d = today.clone().subtract(6 - i, "days");
      return {
        date: formatDay(d),
        pin: pinAccess,
        web: webAccess,
        pinWeb: pinWebAccess,
        zero: cabinetWithZeroAccess,
      };
    });

    const testsTrend = Array.from({ length: 7 }).map((_, i) => {
      const d = today.clone().subtract(6 - i, "days");
      return {
        date: formatDay(d),
        withTest: cabinetsWithTest,
        zeroTest: cabinetsWithZeroTest,
      };
    });

    // battery distribution
    const buckets = [
      { bucket: "0-20", min: 0, max: 20 },
      { bucket: "21-40", min: 21, max: 40 },
      { bucket: "41-60", min: 41, max: 60 },
      { bucket: "61-80", min: 61, max: 80 },
      { bucket: "81-100", min: 81, max: 100 },
    ];

    const healthByBattery = buckets.map((b) => ({
      bucket: b.bucket,
      count: (get_batterys || []).filter((x) => {
        const n = toNum(x?.BATTERY_PC);
        return n >= b.min && n <= b.max;
      }).length,
    }));

    return {
      meta: {
        cabinetStatusDate: moment().format("DD-MM-YYYY"),
        eventStatusDate: moment().format("DD-MM-YYYY"),
        accessStatusDate: moment().format("DD-MM-YYYY"),
        period: "Last 7 days",
      },
      cabinetStatus: { online, offline, unregistered, totalOtpedCabinets },
      eventSitesStatus: { cabinetsWithEvents, cabinetsWithZeroEvent },
      activitySitesStatus: { cabinetsWithActivities, cabinetsWithZeroActivity },
      accessTypeStatus: { pinAccess, webAccess, pinWebAccess, cabinetWithZeroAccess },
      pumpTestStatus: { cabinetsWithTest, cabinetsWithZeroTest },
      deviceHealth: { alertCount, totalCabinets, avgBatteryPc },
      byRegion,
      cabinetTrend,
      eventsTrend,
      accessTrend,
      testsTrend,
      healthByBattery,
    };
  }, [
    cabinetstatuss,
    unregisteredpopups,
    onlinesite,
    offlinesite,
    totalsite,
    eventlists,
    eventlists_popup,
    activitylists,
    activitylists_popup,
    accesslists,
    testact_counts,
    get_batterys,
    emergencydoor_popups,
    zeroeventlists_popup,
    zeroactivitylists_popup,
    pinaccess_popups,
    bioaccess_popups,
    webaccess_popups,
    pinpluswebaccess_popups,
    fpaccess_popups,
    nobox_popups,
    testact_popups,
    notestact_popups,
  ]);

  const totalCabinets =
    dashboard.deviceHealth.totalCabinets || dashboard.cabinetStatus.totalOtpedCabinets;

  // CSV Export data
  const csvHeaders = {
    cabinetStatus: [
      { label: "Status", key: "status" },
      { label: "Count", key: "count" },
      { label: "Percentage", key: "percentage" },
    ],
    regionData: [
      { label: "Region", key: "region" },
      { label: "Online", key: "online" },
      { label: "Offline", key: "offline" },
      { label: "Unregistered", key: "unregistered" },
      { label: "Events", key: "events" },
      { label: "Activities", key: "activities" },
    ],
    deviceHealth: [
      { label: "Cabinet ID", key: "CABINET_ID" },
      { label: "Site Code", key: "RO_CODE" },
      { label: "Site Name", key: "RO_NAME" },
      { label: "Battery %", key: "BATTERY_PC" },
      { label: "Last Ping", key: "LAST_PING_TS" },
      { label: "Zone", key: "ZONE_NAME" },
    ],
  };

  const csvData = {
    cabinetStatus: [
      { 
        status: "Online", 
        count: dashboard.cabinetStatus.online,
        percentage: totalCabinets > 0 ? Math.round((dashboard.cabinetStatus.online / totalCabinets) * 100) : 0
      },
      { 
        status: "Offline", 
        count: dashboard.cabinetStatus.offline,
        percentage: totalCabinets > 0 ? Math.round((dashboard.cabinetStatus.offline / totalCabinets) * 100) : 0
      },
      { 
        status: "Unregistered", 
        count: dashboard.cabinetStatus.unregistered,
        percentage: totalCabinets > 0 ? Math.round((dashboard.cabinetStatus.unregistered / totalCabinets) * 100) : 0
      },
    ],
    regionData: dashboard.byRegion,
    deviceHealth: get_batterys || [],
  };

  const cabinetStatusPie = useMemo(
    () => [
      { name: "Online", value: dashboard.cabinetStatus.online },
      { name: "Offline", value: dashboard.cabinetStatus.offline },
      { name: "Unregistered", value: dashboard.cabinetStatus.unregistered },
    ],
    [dashboard]
  );

  const accessPie = useMemo(
    () => [
      { name: "Pin", value: dashboard.accessTypeStatus.pinAccess },
      { name: "Web", value: dashboard.accessTypeStatus.webAccess },
      { name: "Pin + Web", value: dashboard.accessTypeStatus.pinWebAccess },
      { name: "Zero", value: dashboard.accessTypeStatus.cabinetWithZeroAccess },
    ],
    [dashboard]
  );

  const testsPie = useMemo(
    () => [
      { name: "With Test", value: dashboard.pumpTestStatus.cabinetsWithTest },
      { name: "Zero Test", value: dashboard.pumpTestStatus.cabinetsWithZeroTest },
    ],
    [dashboard]
  );

  /* ------------------------ views ------------------------ */

  const Overview = () => (
    <>


      {/* Export buttons row */}
      <div className="dash-export-row" style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <CButton color="light">
          <CSVLink
            data={csvData.cabinetStatus}
            filename={`Cabinet-Status-${moment().format('YYYY-MM-DD')}.csv`}
            headers={csvHeaders.cabinetStatus}
          >
            Export Cabinet Status
          </CSVLink>
        </CButton>
        <CButton color="light">
          <CSVLink
            data={csvData.regionData}
            filename={`Region-Data-${moment().format('YYYY-MM-DD')}.csv`}
            headers={csvHeaders.regionData}
          >
            Export Region Data
          </CSVLink>
        </CButton>
        <CButton color="light">
          <CSVLink
            data={csvData.deviceHealth}
            filename={`Device-Health-${moment().format('YYYY-MM-DD')}.csv`}
            headers={csvHeaders.deviceHealth}
          >
            Export Device Health
          </CSVLink>
        </CButton>
      </div>

      {/* KPI row */}
      <div className="dash-grid dash-grid--kpi">
        <Tile
          label="Online Cabinets"
          value={dashboard.cabinetStatus.online}
          color={COLORS[0]}
          subLabel="Actively communicating"
          onClick={handleOnlineClick}
        />
        <Tile
          label="Offline Cabinets"
          value={dashboard.cabinetStatus.offline}
          color={COLORS[1]}
          subLabel="Need attention"
          onClick={handleOfflineClick}
        />
        <Tile
          label="Total OTPed"
          value={dashboard.cabinetStatus.totalOtpedCabinets}
          color={COLORS[2]}
          subLabel="Onboarded to AMS"
          onClick={handleTotalOtpedClick}
        />
        <Tile
          label="Unregistered"
          value={dashboard.cabinetStatus.unregistered}
          color={COLORS[3]}
          subLabel="Cabinets to onboard"
          onClick={handleUnregisteredClick}
        />
        <Tile
          label="Sites with Events"
          value={dashboard.eventSitesStatus.cabinetsWithEvents}
          color={COLORS[4]}
          subLabel="Operational activity"
          onClick={handleEventsClick}
        />
        <Tile
          label="Devices with Alerts"
          value={dashboard.deviceHealth.alertCount}
          color={COLORS[1]}
          subLabel={`Avg Battery: ${dashboard.deviceHealth.avgBatteryPc}%`}
          onClick={handleAlertsClick}
        />
      </div>

      {/* Charts row */}
      <div className="dash-grid dash-grid--charts-3">
        <Card title="Cabinet Status Split" subtitle={`As of ${dashboard.meta.cabinetStatusDate}`}>
          <ChartErrorBoundary>
            <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
              <PieChart>
                <Pie
                  data={cabinetStatusPie}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="45%"
                  outerRadius="75%"
                  paddingAngle={3}
                >
                  {cabinetStatusPie.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartErrorBoundary>
        </Card>

        <Card title="7-Day Cabinet Trend" subtitle={dashboard.meta.period}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboard.cabinetTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="online" name="Online" stroke={COLORS[0]} fill="#22c55e22" />
              <Area type="monotone" dataKey="offline" name="Offline" stroke={COLORS[1]} fill="#ef444422" />
              <Area type="monotone" dataKey="unregistered" name="Unregistered" stroke={COLORS[3]} fill="#eab30822" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Status by Region" subtitle="Online vs Offline vs Unregistered">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.byRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="online" name="Online" fill={COLORS[0]} />
              <Bar dataKey="offline" name="Offline" fill={COLORS[1]} />
              <Bar dataKey="unregistered" name="Unregistered" fill={COLORS[3]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  const Events = () => (
    <>
      <div className="dash-grid dash-grid--kpi-4">
        <Tile 
          label="Sites with Events" 
          value={dashboard.eventSitesStatus.cabinetsWithEvents} 
          color={COLORS[4]} 
          onClick={handleEventsClick}
        />
        <Tile 
          label="Sites with Zero Events" 
          value={dashboard.eventSitesStatus.cabinetsWithZeroEvent} 
          color="#64748b" 
          onClick={handleZeroEventsClick}
        />
        <Tile 
          label="Sites with Activities" 
          value={dashboard.activitySitesStatus.cabinetsWithActivities} 
          color={COLORS[5]} 
          onClick={handleActivitiesClick}
        />
        <Tile 
          label="Sites with Zero Activity" 
          value={dashboard.activitySitesStatus.cabinetsWithZeroActivity} 
          color={COLORS[1]} 
          onClick={handleZeroActivitiesClick}
        />
      </div>

      <div className="dash-grid dash-grid--charts-3">
        <Card title="Events & Activities – 7 Day Trend" subtitle="Behaviour over time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboard.eventsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="events" name="Events" stroke={COLORS[2]} strokeWidth={2} />
              <Line type="monotone" dataKey="activities" name="Activities" stroke={COLORS[5]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Events by Region" subtitle="Where is the network busy?">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.byRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="events" name="Events" fill={COLORS[2]} />
              <Bar dataKey="activities" name="Activities" fill={COLORS[5]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Events vs Status" subtitle="Quick comparison">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.byRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="offline" name="Offline" fill={COLORS[1]} />
              <Bar dataKey="unregistered" name="Unregistered" fill={COLORS[3]} />
              <Bar dataKey="events" name="Events" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  const Access = () => (
    <>
      <div className="dash-grid dash-grid--kpi-4">
        <Tile 
          label="Pin Access" 
          value={dashboard.accessTypeStatus.pinAccess} 
          color={COLORS[0]} 
          onClick={handlePinAccessClick}
        />
        <Tile 
          label="Web Access" 
          value={dashboard.accessTypeStatus.webAccess} 
          color={COLORS[2]} 
          onClick={handleWebAccessClick}
        />
        <Tile 
          label="Pin + Web" 
          value={dashboard.accessTypeStatus.pinWebAccess} 
          color={COLORS[4]} 
          onClick={handlePinWebAccessClick}
        />
        <Tile 
          label="Zero Access" 
          value={dashboard.accessTypeStatus.cabinetWithZeroAccess} 
          color={COLORS[1]} 
          onClick={handleZeroAccessClick}
        />
      </div>

      <div className="dash-grid dash-grid--charts-3">
        <Card title="Access Split" subtitle={`As of ${dashboard.meta.accessStatusDate}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={accessPie}
                dataKey="value"
                nameKey="name"
                innerRadius="45%"
                outerRadius="75%"
                paddingAngle={3}
              >
                {accessPie.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Access Trend – 7 Days" subtitle="Usage vs zero-access">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboard.accessTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="pin" name="Pin" stroke={COLORS[0]} fill="#22c55e22" />
              <Area type="monotone" dataKey="web" name="Web" stroke={COLORS[2]} fill="#3b82f622" />
              <Area type="monotone" dataKey="pinWeb" name="Pin+Web" stroke={COLORS[4]} fill="#8b5cf622" />
              <Area type="monotone" dataKey="zero" name="Zero" stroke={COLORS[1]} fill="#ef444422" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Access vs Status by Region" subtitle="Where access risk is higher">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.byRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="offline" name="Offline" fill={COLORS[1]} />
              <Bar dataKey="unregistered" name="Unregistered" fill={COLORS[3]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  const Tests = () => {
    const tested = dashboard.pumpTestStatus.cabinetsWithTest;
    const zeroTest = dashboard.pumpTestStatus.cabinetsWithZeroTest;
    const testedPct = totalCabinets > 0 ? Math.round((tested / totalCabinets) * 100) : 0;

    return (
      <>
        <div className="dash-grid dash-grid--kpi-3">
          <Tile 
            label="Cabinets with Test" 
            value={tested} 
            color={COLORS[0]} 
            subLabel="Covered by recent pump test" 
            onClick={handleTestsClick}
          />
          <Tile 
            label="Cabinets with Zero Test" 
            value={zeroTest} 
            color={COLORS[1]} 
            subLabel="High risk – no validation" 
            onClick={handleZeroTestsClick}
          />
          <Tile 
            label="Test Coverage" 
            value={`${testedPct}%`} 
            color={COLORS[2]} 
            subLabel="Tested / total cabinets" 
            onClick={handleTestCoverageClick}
          />
        </div>

        <div className="dash-grid dash-grid--charts-3">
          <Card title="Test vs No Test" subtitle="Overall validation coverage">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={testsPie} dataKey="value" nameKey="name" innerRadius="45%" outerRadius="75%" paddingAngle={3}>
                  {testsPie.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Tests Trend – 7 Days" subtitle="With test vs zero test">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboard.testsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="withTest" name="With Test" stroke={COLORS[0]} strokeWidth={2} />
                <Line type="monotone" dataKey="zeroTest" name="Zero Test" stroke={COLORS[1]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Offline + Zero Test Risk" subtitle="Priority combination">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Offline", value: dashboard.cabinetStatus.offline },
                  { name: "Zero Test", value: dashboard.pumpTestStatus.cabinetsWithZeroTest },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </>
    );
  };

  const Health = () => (
    <>
      <div className="dash-grid dash-grid--kpi-4">
        <Tile 
          label="Devices with Alerts" 
          value={dashboard.deviceHealth.alertCount} 
          color={COLORS[1]} 
          onClick={handleAlertsClick}
        />
        <Tile 
          label="Total Cabinets" 
          value={totalCabinets} 
          color={COLORS[2]} 
          onClick={handleTotalCabinetsClick}
        />
        <Tile 
          label="Avg Battery" 
          value={`${dashboard.deviceHealth.avgBatteryPc}%`} 
          color={COLORS[0]} 
          onClick={handleBatteryClick}
        />
        <Tile
          label="Offline + Unregistered"
          value={dashboard.cabinetStatus.offline + dashboard.cabinetStatus.unregistered}
          color={COLORS[3]}
          onClick={handleOfflineUnregisteredClick}
        />
      </div>

      <div className="dash-grid dash-grid--charts-3">
        <Card title="Battery Distribution" subtitle="Devices in each battery bucket">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.healthByBattery}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Devices" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Status by Region" subtitle="Online vs Offline">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.byRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="online" name="Online" fill={COLORS[0]} />
              <Bar dataKey="offline" name="Offline" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Alerts Summary" subtitle="Proxy risk signal">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dashboard.cabinetTrend.map((x) => ({
                date: x.date,
                offlinePlusUnreg: x.offline + x.unregistered,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="offlinePlusUnreg"
                name="Offline + Unregistered"
                stroke={COLORS[1]}
                fill="#ef444422"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  // Check if dashboard data is ready
  const isDashboardReady = dashboard && dashboard.cabinetStatus && totalCabinets > 0;

  const content = !isDashboardReady ? (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '400px',
      fontSize: '16px',
      color: '#6c757d'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
        Loading dashboard data...
      </div>
    </div>
  ) : (
    view === VIEWS.EVENTS ? <Events /> :
    view === VIEWS.ACCESS ? <Access /> :
    view === VIEWS.TESTS ? <Tests /> :
    view === VIEWS.HEALTH ? <Health /> :
    <Overview />
  );

  const handleExternalDashboard = () => {
    window.location.href = 'http://202.149.207.58/#/dashboard';
  };

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">AMS Dashboard</h1>
          <p className="dash-subtitle">Tata Steel – Key Management System overview</p>
        </div>

        <div className="dash-header-right">
          <div className="dash-tabs">
            <TabButton label="Overview" active={view === VIEWS.OVERVIEW} onClick={() => setView(VIEWS.OVERVIEW)} />
            <TabButton label="Events & Activities" active={view === VIEWS.EVENTS} onClick={() => setView(VIEWS.EVENTS)} />
            <TabButton label="Access Types" active={view === VIEWS.ACCESS} onClick={() => setView(VIEWS.ACCESS)} />
            <TabButton label="Pump Tests" active={view === VIEWS.TESTS} onClick={() => setView(VIEWS.TESTS)} />
            <TabButton label="Device Health" active={view === VIEWS.HEALTH} onClick={() => setView(VIEWS.HEALTH)} />
          </div>
          
          <CButton 
            color="secondary" 
            onClick={loadDashboardData}
            style={{
              marginLeft: '10px',
              backgroundColor: '#6c757d',
              borderColor: '#6c757d',
              color: 'white',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            Refresh
          </CButton>
          
          <CButton 
            color="primary" 
            className="dash-external-btn"
            onClick={handleExternalDashboard}
            style={{
              marginLeft: '10px',
              backgroundColor: '#1e3a8a',
              borderColor: '#1e3a8a',
              color: 'white',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            Local Dashboard
          </CButton>
        </div>
      </header>

      {content}



      {/* Modal for displaying detailed data */}
      {modalVisible && (
        <div className="modal show" style={{ display: 'block', zIndex: 1050 }} onClick={closeModal}>
          <div className="modal-dialog modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modalData.length > 0 ? (
                  <>
                    <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Total Records: {modalData.length}</span>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <CButton color="light">
                          <CSVLink
                            data={modalData}
                            filename={`${modalTitle.replace(/\s+/g, '-')}-${moment().format('YYYY-MM-DD')}.csv`}
                            headers={modalHeaders}
                          >
                            Export to CSV
                          </CSVLink>
                        </CButton>
                      </div>
                    </div>
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <table className="modal-table table table-striped table-hover">
                        <thead>
                          <tr>
                            {modalHeaders.map((header, index) => (
                              <th key={index}>
                                {header.label}
                              </th>
                            ))}
                            {modalTitle === "Unregistered Cabinets" && (
                              <th style={{ width: '120px', textAlign: 'center' }}>Action</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {modalData.map((row, index) => (
                            <tr key={index}>
                              {modalHeaders.map((header, headerIndex) => (
                                <td key={headerIndex}>
                                  {header.key === 'Last_Active_On' || header.key === 'LAST_PING_TS' 
                                    ? moment(row[header.key]).format('DD-MM-YYYY HH:mm:ss')
                                    : row[header.key] || '-'
                                  }
                                </td>
                              ))}
                              {modalTitle === "Unregistered Cabinets" && (
                                <td style={{ textAlign: 'center' }}>
                                  <CButton 
                                    color="primary" 
                                    size="sm"
                                    onClick={() => handleCabinetRegistration(row)}
                                    style={{ fontSize: '12px', padding: '4px 8px' }}
                                  >
                                    Register
                                  </CButton>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>No data available for {modalTitle}</p>
                    <p>This might be because:</p>
                    <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                      <li>The API hasn't returned data yet</li>
                      <li>There are no records for this category</li>
                      <li>The data is still loading</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <CButton color="secondary" onClick={closeModal}>
                  Close
                </CButton>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal backdrop */}
      {modalVisible && (
        <div className="modal-backdrop show" style={{ zIndex: 1040 }} onClick={closeModal}></div>
      )}


    </div>
  );
}
