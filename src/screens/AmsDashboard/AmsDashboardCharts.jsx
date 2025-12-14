import React, { useMemo } from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#eab308", "#8b5cf6", "#06b6d4"];

const getCounter = (arr, entry) =>
  (arr || []).find((x) => x.ENTRY === entry)?.COUNTER ?? 0;

const groupSum = (rows, groupKey, sumKey) => {
  const map = new Map();
  (rows || []).forEach((r) => {
    const k = r[groupKey] || "Unknown";
    if (!map.has(k)) map.set(k, { name: k, [sumKey]: 0 });
    map.get(k)[sumKey] += Number(r[sumKey] || 0);
  });
  return Array.from(map.values());
};

export default function AmsDashboardCharts({
  DEMO_DASHBOARD,
  MOCK_DASHBOARD,

  cabinetstatuss,
  eventlists,
  activitylists,
  accesslists,
  testact_counts,

  eventlists_popup,
  activitylists_popup,
  offlinesite,

  // optional live trends (if you ever add reducers for them)
  cabinetTrendLive = [],
  eventsTrendLive = [],
  accessTrendLive = [],
  testsTrendLive = [],
}) {
  // ---------- COUNTERS ----------
  const cabinet = useMemo(
    () => ({
      online: getCounter(cabinetstatuss, "Online"),
      offline: getCounter(cabinetstatuss, "Offline"),
      unregistered: getCounter(cabinetstatuss, "Unregistered"),
    }),
    [cabinetstatuss]
  );

  const access = useMemo(
    () => ({
      pin: getCounter(accesslists, "PIN + CARD Access"),
      web: getCounter(accesslists, "WEB + Emergency Access"),
      multi: getCounter(accesslists, "Multi Access"),
      bio: getCounter(accesslists, "Biometric Access"),
      fp: getCounter(accesslists, "FP + PIN / CARD Access"),
      zero: getCounter(accesslists, "Cabinet With Zero Access"),
    }),
    [accesslists]
  );

  const tests = useMemo(
    () => ({
      withTest: getCounter(testact_counts, "Cabinets with test performed"),
      zeroTest: getCounter(testact_counts, "Cabinets with Zero Test"),
    }),
    [testact_counts]
  );

  const cabinetPie = [
    { name: "Online", value: cabinet.online },
    { name: "Offline", value: cabinet.offline },
    { name: "Unregistered", value: cabinet.unregistered },
  ];

  const accessPie = [
    { name: "PIN", value: access.pin },
    { name: "WEB", value: access.web },
    { name: "Multi", value: access.multi },
    { name: "Bio", value: access.bio },
    { name: "FP", value: access.fp },
    { name: "Zero", value: access.zero },
  ];

  const testsPie = [
    { name: "With Test", value: tests.withTest },
    { name: "Zero Test", value: tests.zeroTest },
  ];

  // ---------- REGION BARS (from popup arrays) ----------
  const eventsByRegion = useMemo(
    () => groupSum(eventlists_popup, "ZONE_NAME", "TOTAL_EVENTS"),
    [eventlists_popup]
  );

  const activitiesByRegion = useMemo(() => {
    // your API uses TOTAL_ACTIVITIES sometimes and TOTAL_ACITIVITIES sometimes
    const rows = (activitylists_popup || []).map((r) => ({
      ...r,
      TOTAL_ACTIVITIES: Number(r.TOTAL_ACTIVITIES || r.TOTAL_ACITIVITIES || 0),
    }));
    return groupSum(rows, "ZONE_NAME", "TOTAL_ACTIVITIES").map((x) => ({
      name: x.name,
      activities: x.TOTAL_ACTIVITIES,
    }));
  }, [activitylists_popup]);

  // ---------- TRENDS ----------
  // DEMO => mock trends; LIVE => use *_TrendLive if you later store trends in redux.
  const cabinetTrend = DEMO_DASHBOARD
    ? MOCK_DASHBOARD?.cabinetTrend || []
    : cabinetTrendLive || [];

  const eventsTrend = DEMO_DASHBOARD
    ? MOCK_DASHBOARD?.eventsTrend || []
    : eventsTrendLive || [];

  const accessTrend = DEMO_DASHBOARD
    ? MOCK_DASHBOARD?.accessTrend || []
    : accessTrendLive || [];

  const testsTrend = DEMO_DASHBOARD
    ? MOCK_DASHBOARD?.testsTrend || []
    : testsTrendLive || [];

  const showTrends =
    (cabinetTrend?.length || 0) > 0 ||
    (eventsTrend?.length || 0) > 0 ||
    (accessTrend?.length || 0) > 0 ||
    (testsTrend?.length || 0) > 0;

  // ---------- OPTIONAL: TOP OFFLINE SITES CHART ----------
  const topOfflineChart = useMemo(() => {
    const rows = (offlinesite || []).slice(0, 10);
    return rows.map((r) => ({
      name: r.RO_CODE || r.RO_NAME || r.CABINET_IP_ADDR || "Site",
      value: 1,
    }));
  }, [offlinesite]);

  const showTopOffline = (topOfflineChart?.length || 0) > 0;

  return (
    <>
      {/* ------------------- PIES ------------------- */}
      <CRow className="mb-3">
        <CCol lg={4}>
          <CCard className="ccard">
            <CCardHeader>
              <b>Cabinet Status Split</b>
            </CCardHeader>
            <CCardBody style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cabinetPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="45%"
                    outerRadius="75%"
                  >
                    {cabinetPie.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard className="ccard">
            <CCardHeader>
              <b>Access Split</b>
            </CCardHeader>
            <CCardBody style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accessPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="45%"
                    outerRadius="75%"
                  >
                    {accessPie.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard className="ccard">
            <CCardHeader>
              <b>Test vs No Test</b>
            </CCardHeader>
            <CCardBody style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={testsPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="45%"
                    outerRadius="75%"
                  >
                    {testsPie.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ------------------- REGION BARS ------------------- */}
      <CRow className="mb-3">
        <CCol lg={6}>
          <CCard className="ccard">
            <CCardHeader>
              <b>Events by Region</b>
            </CCardHeader>
            <CCardBody style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventsByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="TOTAL_EVENTS" name="Events" fill={COLORS[2]} />
                </BarChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={6}>
          <CCard className="ccard">
            <CCardHeader>
              <b>Activities by Region</b>
            </CCardHeader>
            <CCardBody style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activitiesByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activities" name="Activities" fill={COLORS[5]} />
                </BarChart>
              </ResponsiveContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ------------------- TRENDS ------------------- */}
      {showTrends && (
        <CRow className="mb-3">
          {!!cabinetTrend?.length && (
            <CCol lg={6}>
              <CCard className="ccard">
                <CCardHeader>
                  <b>7-Day Cabinet Trend</b>
                </CCardHeader>
                <CCardBody style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cabinetTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="online"
                        name="Online"
                        stroke={COLORS[0]}
                        fill="#22c55e33"
                      />
                      <Area
                        type="monotone"
                        dataKey="offline"
                        name="Offline"
                        stroke={COLORS[1]}
                        fill="#ef444433"
                      />
                      <Area
                        type="monotone"
                        dataKey="unregistered"
                        name="Unregistered"
                        stroke={COLORS[3]}
                        fill="#eab30833"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
          )}

          {!!eventsTrend?.length && (
            <CCol lg={6}>
              <CCard className="ccard">
                <CCardHeader>
                  <b>Events & Activities Trend</b>
                </CCardHeader>
                <CCardBody style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={eventsTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="events"
                        name="Events"
                        stroke={COLORS[2]}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="activities"
                        name="Activities"
                        stroke={COLORS[5]}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
          )}

          {!!accessTrend?.length && (
            <CCol lg={6}>
              <CCard className="ccard">
                <CCardHeader>
                  <b>Access Trend</b>
                </CCardHeader>
                <CCardBody style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={accessTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="pin"
                        name="PIN"
                        stroke={COLORS[0]}
                        fill="#22c55e33"
                      />
                      <Area
                        type="monotone"
                        dataKey="web"
                        name="WEB"
                        stroke={COLORS[2]}
                        fill="#3b82f633"
                      />
                      <Area
                        type="monotone"
                        dataKey="pinWeb"
                        name="PIN+WEB"
                        stroke={COLORS[4]}
                        fill="#8b5cf633"
                      />
                      <Area
                        type="monotone"
                        dataKey="zero"
                        name="Zero"
                        stroke={COLORS[1]}
                        fill="#ef444433"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
          )}

          {!!testsTrend?.length && (
            <CCol lg={6}>
              <CCard className="ccard">
                <CCardHeader>
                  <b>Tests Trend</b>
                </CCardHeader>
                <CCardBody style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={testsTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="withTest"
                        name="With Test"
                        stroke={COLORS[0]}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="zeroTest"
                        name="Zero Test"
                        stroke={COLORS[1]}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CCardBody>
              </CCard>
            </CCol>
          )}
        </CRow>
      )}

      {/* ------------------- TOP OFFLINE (OPTIONAL CHART) ------------------- */}
      {showTopOffline && (
        <CRow className="mb-3">
          <CCol lg={12}>
            <CCard className="ccard">
              <CCardHeader>
                <b>Top Offline Sites (Top 10)</b>
              </CCardHeader>
              <CCardBody style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topOfflineChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Offline Sites" fill={COLORS[1]} />
                  </BarChart>
                </ResponsiveContainer>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
}
