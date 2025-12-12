
import React, { useState } from "react";
import "./Style.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardFooter,
  CCard,
  CButton,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
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
  nobox_popup,
  noactivitybox,
  testact_count,
  testact_popup,
  notestact_popup,
  get_battery,
  clearCaptcha,
} from "../../../actions/AmsDashboard/AmsDashboardAction";
import moment from "moment";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import Loader from "../../../components/loader";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

function ADashboard() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const cabinetstatuss = useSelector(
    (state) => state.Amsdashboard.cabinetstatus
  );
  // const topkeys = useSelector((state) => state.Amsdashboard.topkey);
  // const donutcharts = useSelector((state) => state.Amsdashboard.donutchart);
  const unregisteredpopups = useSelector((state) => state.Amsdashboard.unregisteredpopups);
  const onlinesite = useSelector((state) => state.Amsdashboard.onlinesites);
  const offlinesite = useSelector((state) => state.Amsdashboard.offlinesites);
  const totalsite = useSelector((state) => state.Amsdashboard.totalsites);
  const eventlists = useSelector((state) => state.Amsdashboard.eventlists);
  const eventlists_popup = useSelector((state) => state.Amsdashboard.eventlists_popup);
  const activitylists = useSelector((state) => state.Amsdashboard.activitylists);
  const activitylists_popup = useSelector((state) => state.Amsdashboard.activitylists_popup);
  const zeroeventlists_popup = useSelector((state) => state.Amsdashboard.zeroeventlists_popup);
  const zeroactivitylists_popup = useSelector((state) => state.Amsdashboard.zeroactivitylists_popup);
  const accesslists = useSelector((state) => state.Amsdashboard.accesslists);
  const pinsaccess_popup = useSelector((state) => state.Amsdashboard.pinsaccess_popup);
  const bioaccess_popup = useSelector((state) => state.Amsdashboard.bioaccess_popup);
  const websaccess_popup = useSelector((state) => state.Amsdashboard.websaccess_popup);
  const pinwebaccess_popup = useSelector((state) => state.Amsdashboard.pinwebaccess_popup);
  const noboxs_popup = useSelector((state) => state.Amsdashboard.noboxs_popup);
  const testact_counts = useSelector((state) => state.Amsdashboard.testact_counts);
  const testact_popups = useSelector((state) => state.Amsdashboard.testact_popups);
  const notestact_popups = useSelector((state) => state.Amsdashboard.notestact_popups);
  const keysbyactivity = useSelector((state) => state.Amsdashboard.keysbyactivity);
  const get_batterys = useSelector((state) => state.Amsdashboard.get_batterys);

  // const [isdonutchart, setdonutchart] = useState();
  // const [istopkey, settopkey] = useState();

  const dispatch = useDispatch();

  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visible10, setVisible10] = useState(false);
  const [visible11, setVisible11] = useState(false);
  const [visible12, setVisible12] = useState(false);
  const [visible13, setVisible13] = useState(false);
  const [visible14, setVisible14] = useState(false);
  const [visible15, setVisible15] = useState(false);
  const [visible16, setVisible16] = useState(false);
  const [visible19, setVisible19] = useState(false);
  const [visible20, setVisible20] = useState(false);
  const [visible21, setVisible21] = useState(false);
  const [visible22, setVisible22] = useState(false);
  const [visible23, setVisible23] = useState(false);

  React.useEffect(() => {
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
    // dispatch(bioaccess_popup()); // Temporarily commented out to debug
    dispatch(webaccess_popup());
    dispatch(pinpluswebaccess_popup());
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
  }, []);

  const labels = keysbyactivity.map((state) => state.KEYNAME);
  const activities = keysbyactivity.map((state) => state.ACTIVITY_CODE);
  const data = {
    labels,
    activities,
    datasets: [
      {
        label: "Total Count",
        data: keysbyactivity.map((state) => state.TOTAL),
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  // React.useEffect(() => {
  //   if (donutcharts) {
  //     var eventname = donutcharts.map((state) => state.EVENT_NAME);
  //     var colorname = donutcharts.map((state) => "#" + state.COLOR);
  //     var percentage = donutcharts.map((state) => state.PERCENTAGE);
  //   }

  //   setdonutchart({
  //     labels: eventname,
  //     datasets: [
  //       {
  //         data: percentage,
  //         backgroundColor: colorname,
  //         hoverBackgroundColor: [
  //           "#FF6384",
  //           "#55D8C1",
  //           "#55D8C1",
  //           "#55D8C1",
  //           "#55D8C1",
  //           "#36A2EB",
  //           "#55D8C1",
  //           "#FFCE56",
  //           "#FF6384",
  //           "#55D8C1",
  //           "#55D8C1",
  //           "#55D8C1",
  //           "#55D8C1",
  //           "#36A2EB",
  //         ],
  //       },
  //     ],
  //   });
  // }, [donutcharts]);

  // React.useEffect(() => {
  //   if (topkeys) {
  //     var keyname = topkeys.map((state) => state.KEYNAME);
  //     var total = topkeys.map((state) => state.TOTAL);
  //     var totalSum = 0;
  //     for (var x = 0; x < total.length; x++) {
  //       totalSum = totalSum + total[x];
  //     }
  //     var percentages = [];
  //     for (var x = 0; x < total.length; x++) {
  //       percentages.push(((total[x] / totalSum) * 100).toFixed(2));
  //     }
  //   }
  //   settopkey({
  //     labels: keyname,
  //     datasets: [
  //       {
  //         data: percentages,
  //         backgroundColor: [
  //           "#4d96ff",
  //           "#ff1d1d",
  //           "#2eb85c",
  //           "#E32636",
  //           "#5D8AA8",
  //         ],
  //         hoverBackgroundColor: [
  //           "#4d96ff",
  //           "#ff1d1d",
  //           "#2eb85c",
  //           "#E32636",
  //           "#5D8AA8",
  //         ],
  //       },
  //     ],
  //   });
  // }, [topkeys]);

  const HeadfieldUnregistered = [
    { key: "CABINET_IP_ADDR", label: "IP ADDRESS", _style: tablehead },
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
  ];

  const HeadfieldOnline = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "CABINET_IP_ADDR", label: "IP Address", _style: tablehead },
    { key: "LAST_PING_TS", label: "LAST CONNECTED", _style: tablehead },
    { key: "OTP", label: "OTP Date", _style: tablehead },
    { key: "MAKE", label: "MAKE", _style: tablehead },
  ];

  const HeadfieldOffline = [
    { key: "RO_NAME", label: "CABINET LOCATION", _style: tablehead },
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "CABINET_IP_ADDR", label: "CABINET IP ADDRESS", _style: tablehead },
    { key: "Last_Active_On", label: "LAST ACTIVE ON", _style: tablehead },
    { key: "OTP", label: "OTP Date", _style: tablehead },
    { key: "MAKE", label: "MAKE", _style: tablehead },
  ];

  const Headfieldstotal = [
    { key: "STATUS", label: "STATUS", _style: tablehead },
    { key: "LAST_ACTIVE", label: "LAST ACTIVE", _style: tablehead },
    { key: "IP ADDRESS", label: "IP ADDRESS", _style: tablehead },
    { key: "CABINET_CODE", label: "CABINET CODE", _style: tablehead },
    { key: "MAKE", label: "MAKE", _style: tablehead },
  ];

  const HeadfieldsEventlist = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION NAME", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    { key: "TOTAL_EVENTS", label: "TOTAL EVENTS", _style: tablehead },
  ];

  const HeadfieldsActivitylist = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION NAME", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    { key: "TOTAL_ACITIVITIES", label: "TOTAL ACTIVITIES", _style: tablehead },
  ];

  const ZeroEventHeadfields = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION NAME", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    { key: "MAX_TS", label: "LAST ACTIVE ON", _style: tablehead },
  ];

  const HeadfieldAccess = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    { key: "LOGIN_TYPE", label: "LOGIN TYPE", _style: tablehead },
    { key: "TOTAL_ACCESS", label: "TOTAL ACCESS", _style: tablehead },
  ];

  const HeadfieldsNoBox = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    { key: "LOGIN_TYPE", label: "LOGIN TYPE", _style: tablehead },
  ];

  const HeadfieldsTotalTest = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    {
      key: "TIMES_TEST_PERFORMED",
      label: "TIMES TEST PERFORMED",
      _style: tablehead,
    },
  ];

  const HeadfieldsBattery = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "ZONE_NAME", label: "REGION NAME", _style: tablehead },
    { key: "STATE_NAME", label: "STATE NAME", _style: tablehead },
    { key: "BATTERY_PC", label: "BATTERY PERCENTAGE", _style: tablehead },
  ];

  const editvalue = (values) => {
    sessionStorage.setItem("CABINET_IP_ADDR", values.CABINET_IP_ADDR);
    sessionStorage.setItem("RO_CODE", values.RO_CODE);
    sessionStorage.setItem("RO_NAME", values.RO_NAME);
    sessionStorage.setItem("CABINET_CODE", values.RO_CODE);
    sessionStorage.setItem("LOCATION", values.RO_NAME);
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  
  // Show today's date with time range (start of day to 30 minutes ago)
  const todayStart = moment().startOf("day").format("HH:mm");
  const currentMinus30 = moment().subtract(30, "minutes").format("HH:mm");
  const timeRangeDate = `${date} (${todayStart} - ${currentMinus30})`;
  
  const previousDate = moment(new Date(Date.now() - 864e5)).format(
    "DD/MM/YYYY"
  ); // 864e5 == 86400000 == 24*60*60*1000

  return (
    <div>
      <div className="d-flex justify-content-around">
        <CCard style={{ width: "22vw", height: "18vw" }} className="ccard">
          <CCardBody className="p-3">
            {cabinetstatuss && cabinetstatuss.length > 0 ? (
              cabinetstatuss.map((state, index) => {
                return (
                  <div key={`cabinet-${index}`} className="d-flex justify-content-between">
                    {state.ENTRY == "Unregistered" ? (
                      <CButton onClick={() => setVisible6(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Online" ? (
                      <CButton onClick={() => setVisible7(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Offline" ? (
                      <CButton onClick={() => setVisible8(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Total OTPed Cabinets" ? (
                      <CButton onClick={() => setVisible9(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : (
                      <p className="cabstatus">{state.ENTRY}</p>
                    )}

                    <p
                      className={
                        state.ENTRY == "Offline"
                          ? "text-danger counter"
                          : state.ENTRY == "Unregistered"
                          ? "text-primary counter"
                          : state.ENTRY == "Online"
                          ? "text-success counter"
                          : "text-dark counter"
                      }
                    >
                      <b>{state.COUNTER || 0}</b>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <p>No cabinet status data available</p>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Online</p>
                  <p className="text-success counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Offline</p>
                  <p className="text-danger counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Unregistered</p>
                  <p className="text-primary counter"><b>0</b></p>
                </div>
              </div>
            )}
            <CModal
              style={{ width: 600 }}
              show={visible6}
              onClose={() => setVisible6(false)}
            >
              <CModalHeader onClose={() => setVisible6(false)}>
                <CModalTitle>Unregistered Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={unregisteredpopups}
                    Headfields={[
                      {
                        key: "CABINET_IP_ADDR",
                        label: "IP ADDRESS",
                        _style: tablehead,
                      },
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      {
                        key: "Register",
                        label: "REGEISTER HERE",
                        sorter: false,
                        filter: false,
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                      Register: (item) => (
                        <td>
                          <CButton
                            className="border border-secondary"
                            color="white"
                            onClick={() => editvalue(item)}
                          >
                            <Link
                              to={"/Master-Data/Ro-List"}
                              style={{ cursor: "pointer" }}
                            >
                              Register
                            </Link>
                          </CButton>
                        </td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={unregisteredpopups}
                    filename={"Unregistered-Sites.csv"}
                    headers={HeadfieldUnregistered}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible6(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 700 }}
              show={visible7}
              onClose={() => setVisible7(false)}
            >
              <CModalHeader onClose={() => setVisible7(false)}>
                <CModalTitle>Online Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={onlinesite}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      // { key: 'LAST_KEY_ACTIVTTY', label: 'LAST KEY ACTIVITY', _style: tablehead },
                      {
                        key: "CABINET_IP_ADDR",
                        label: "IP Address",
                        _style: tablehead,
                      },
                      {
                        key: "LAST_PING_TS",
                        label: "LAST CONNECTED",
                        _style: tablehead,
                      },
                      { key: "OTP", label: "OTP Date", _style: tablehead },
                      { key: "MAKE", label: "MAKE", _style: tablehead },
                    ]}
                    scopedSlots={{
                      LAST_KEY_ACTIVTTY: (item) => (
                        <td>
                          {item.LAST_KEY_ACTIVITY
                            ? item.LAST_KEY_ACTIVITY
                            : "-"}
                        </td>
                      ),
                      LAST_PING_TS: (item) => (
                        <td>
                          {/*{item.LAST_PING_TS ? item.LAST_PING_TS.substr(0, 19) : '-'}*/}
                          {item.LAST_PING_TS
                            ? moment(item.LAST_PING_TS).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )
                            : "-"}
                        </td>
                      ),
                      OTP: (item) => <td>{item.OTP ? item.OTP : "-"}</td>,
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={onlinesite}
                    filename={"Online-Sites.csv"}
                    headers={HeadfieldOnline}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible7(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 700 }}
              show={visible8}
              onClose={() => setVisible8(false)}
            >
              <CModalHeader onClose={() => setVisible8(false)}>
                <CModalTitle>Offline Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={offlinesite}
                    Headfields={[
                      { key: "RO_CODE", _style: tablehead },
                      { key: "RO_NAME", _style: tablehead },
                      {
                        key: "CABINET_IP_ADDR",
                        label: "IP Address",
                        _style: tablehead,
                      },
                      { key: "Last_Active_On", _style: tablehead },
                      { key: "OTP", label: "OTP Date", _style: tablehead },
                      { key: "MAKE", label: "MAKE", _style: tablehead },
                    ]}
                    scopedSlots={{
                      Last_Active_On: (item) => (
                        <td>
                          {/*{item.Last_Active_On ? item.Last_Active_On.substr(0, 19) : '-'}*/}
                          {item.Last_Active_On
                            ? moment(item.Last_Active_On).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )
                            : "-"}
                        </td>
                      ),
                      OTP: (item) => <td>{item.OTP ? item.OTP : "-"}</td>,
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={offlinesite}
                    filename={"Offline-Sites.csv"}
                    headers={HeadfieldOffline}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible8(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 700 }}
              show={visible9}
              onClose={() => setVisible9(false)}
            >
              <CModalHeader onClose={() => setVisible9(false)}>
                <CModalTitle>Total Cabinets</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={totalsite}
                    Headfields={[
                      { key: "STATUS", label: "STATUS", _style: tablehead },
                      {
                        key: "LAST_ACTIVE",
                        label: "LAST ACTIVE",
                        _style: tablehead,
                      },
                      {
                        key: "IP ADDRESS",
                        label: "IP ADDRESS",
                        _style: tablehead,
                      },
                      {
                        key: "CABINET_CODE",
                        label: "CABINET CODE",
                        _style: tablehead,
                      },
                      { key: "MAKE", label: "MAKE", _style: tablehead },
                    ]}
                    scopedSlots={{
                      LAST_ACTIVE: (item) => (
                        <td>
                          {/*{item.LAST_ACTIVE ? item.LAST_ACTIVE.substr(0, 19) : '-'} */}
                          {item.LAST_ACTIVE
                            ? moment(item.LAST_ACTIVE).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )
                            : "-"}
                        </td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={totalsite}
                    filename={"Total-Sites.csv"}
                    headers={Headfieldstotal}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible9(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
          <CCardFooter
            className="text-center"
            style={{ backgroundColor: "#dae3f3" }}
          >
            <b>AMS Cabinet Status ({date})</b>
          </CCardFooter>
        </CCard>

        <CCard style={{ width: "22vw", height: "18vw" }} className="ccard">
          <CCardBody className="p-3">
            {eventlists && eventlists.length > 0 ? (
              eventlists.map((state, index) => {
                return (
                  <div key={`event-${index}`} className="d-flex justify-content-between">
                    {state.ENTRY == "Cabinets with Events" ? (
                      <CButton onClick={() => setVisible10(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Cabinets with Zero Event" ? (
                      <CButton onClick={() => setVisible12(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : (
                      <p className="cabstatus">{state.ENTRY}</p>
                    )}

                    <p
                      className={
                        state.ENTRY == "Cabinets with Events"
                          ? "text-success counter"
                          : state.ENTRY == "Cabinets with Zero Event"
                          ? "text-danger counter"
                          : "text-dark counter"
                      }
                    >
                      <b>{state.COUNTER || 0}</b>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <p>No event data available</p>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Cabinets with Events</p>
                  <p className="text-success counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Cabinets with Zero Event</p>
                  <p className="text-danger counter"><b>0</b></p>
                </div>
              </div>
            )}
            <CModal
              style={{ width: 600 }}
              show={visible10}
              onClose={() => setVisible10(false)}
            >
              <CModalHeader onClose={() => setVisible10(false)}>
                <CModalTitle>Event performed Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={eventlists_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      {
                        key: "ZONE_NAME",
                        label: "REGION NAME",
                        _style: tablehead,
                      },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "TOTAL_EVENTS",
                        label: "TOTAL EVENTS",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={eventlists_popup}
                    filename={"Event-Sites.csv"}
                    headers={HeadfieldsEventlist}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible10(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 600 }}
              show={visible12}
              onClose={() => setVisible12(false)}
            >
              <CModalHeader onClose={() => setVisible12(false)}>
                <CModalTitle>Zero Event performed Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={zeroeventlists_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      {
                        key: "ZONE_NAME",
                        label: "REGION NAME",
                        _style: tablehead,
                      },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "MAX_TS",
                        label: "LAST ACTIVE ON",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                      MAX_TS: (item) => (
                        <td>
                          {item.MAX_TS
                            ? moment
                                .utc(item.MAX_TS)
                                .format("DD-MM-YYYY HH:mm:ss")
                            : "-"}
                        </td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={zeroeventlists_popup}
                    filename={"Zero-Event-Sites.csv"}
                    headers={ZeroEventHeadfields}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible12(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
          <CCardFooter
            className="text-center"
            style={{ backgroundColor: "peachpuff" }}
          >
            <b>Event Sites Status ({timeRangeDate})</b>
          </CCardFooter>
        </CCard>

        <CCard style={{ width: "22vw", height: "18vw" }} className="ccard">
          <CCardBody className="p-3">
            {activitylists && activitylists.length > 0 ? (
              activitylists.map((state, index) => {
                return (
                  <div key={`activity-${index}`} className="d-flex justify-content-between">
                    {state.ENTRY == "Cabinets with Activities" ? (
                      <CButton onClick={() => setVisible11(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Cabinets with Zero Activity" ? (
                      <CButton onClick={() => setVisible13(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : (
                      <p className="cabstatus">{state.ENTRY}</p>
                    )}

                    <p
                      className={
                        state.ENTRY == "Cabinets with Activities"
                          ? "text-success counter"
                          : state.ENTRY == "Cabinets with Zero Activity"
                          ? "text-danger counter"
                          : "text-dark counter"
                      }
                    >
                      <b>{state.COUNTER || 0}</b>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <p>No activity data available</p>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Cabinets with Activities</p>
                  <p className="text-success counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Cabinets with Zero Activity</p>
                  <p className="text-danger counter"><b>0</b></p>
                </div>
              </div>
            )}
            <CModal
              style={{ width: 600 }}
              show={visible11}
              onClose={() => setVisible11(false)}
            >
              <CModalHeader onClose={() => setVisible11(false)}>
                <CModalTitle>Activity performed Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={activitylists_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      {
                        key: "ZONE_NAME",
                        label: "REGION NAME",
                        _style: tablehead,
                      },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "TOTAL_ACTIVITIES",
                        label: "TOTAL ACTIVITIES",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={activitylists_popup}
                    filename={"Activity-Sites.csv"}
                    headers={HeadfieldsActivitylist}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible11(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 600 }}
              show={visible13}
              onClose={() => setVisible13(false)}
            >
              <CModalHeader onClose={() => setVisible13(false)}>
                <CModalTitle>Zero Activity performed Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={zeroactivitylists_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      {
                        key: "ZONE_NAME",
                        label: "REGION NAME",
                        _style: tablehead,
                      },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "MAX_TS",
                        label: "LAST ACTIVE ON",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                      MAX_TS: (item) => (
                        <td>
                          {item.MAX_TS
                            ? moment
                                .utc(item.MAX_TS)
                                .format("DD-MM-YYYY HH:mm:ss")
                            : "-"}
                        </td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={zeroactivitylists_popup}
                    filename={"Zero-Activity-Sites.csv"}
                    headers={ZeroEventHeadfields}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible13(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
          <CCardFooter
            className="text-center"
            style={{ backgroundColor: "#dae3f3" }}
          >
            <b>Activities Sites Status ({timeRangeDate})</b>
          </CCardFooter>
        </CCard>
      </div>

      <div className="d-flex justify-content-around">
        <CCard style={{ width: "22vw", height: "18vw" }} className="ccard">
          <CCardBody className="p-3">
            {accesslists && accesslists.length > 0 ? (
              accesslists.map((state, index) => {
                return (
                  <div key={`access-${index}`} className="d-flex justify-content-between">
                    {state.ENTRY == "Pin Access" ? (
                      <CButton onClick={() => setVisible14(true)}>
                        Pin+Card Access
                      </CButton>
                    ) : state.ENTRY == "Web Access" ? (
                      <CButton onClick={() => setVisible15(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Pin+Web Access" ? (
                      <CButton onClick={() => setVisible22(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Biometric" ? (
                      <CButton onClick={() => setVisible23(true)}>
                        Biometric+Pin Access
                      </CButton>
                    ) : state.ENTRY == "Cabinet With Zero Access" ? (
                      <CButton onClick={() => setVisible16(true)}>
                        No Access
                      </CButton>
                    ) : (
                      <p className="cabstatus">{state.ENTRY}</p>
                    )}

                    <p
                      className={
                        state.ENTRY == "Pin Access"
                          ? "text-primary counter"
                          : state.ENTRY == "Web Access"
                          ? "text-primary counter"
                          : state.ENTRY == "Biometric"
                          ? "text-success counter"
                          : state.ENTRY == "Cabinet With Zero Access"
                          ? "text-danger counter"
                          : "text-dark counter"
                      }
                    >
                      <b>{state.COUNTER || 0}</b>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <p>No access data available</p>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Pin Access</p>
                  <p className="text-primary counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Web Access</p>
                  <p className="text-primary counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">No Access</p>
                  <p className="text-danger counter"><b>0</b></p>
                </div>
              </div>
            )}
            <CModal
              style={{ width: 600 }}
              show={visible14}
              onClose={() => setVisible14(false)}
            >
              <CModalHeader onClose={() => setVisible14(false)}>
                <CModalTitle>Pin+Card Access Entries</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={pinsaccess_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "LOGIN_TYPE",
                        label: "LOGIN TYPE",
                        _style: tablehead,
                      },
                      {
                        key: "TOTAL_ACCESS",
                        label: "TOTAL ACCESS",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={pinsaccess_popup}
                    filename={"PinOnly-Entry.csv"}
                    headers={HeadfieldAccess}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible14(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 600 }}
              show={visible15}
              onClose={() => setVisible15(false)}
            >
              <CModalHeader onClose={() => setVisible15(false)}>
                <CModalTitle>Web Only Entries</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={websaccess_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "LOGIN_TYPE",
                        label: "LOGIN TYPE",
                        _style: tablehead,
                      },
                      {
                        key: "TOTAL_ACCESS",
                        label: "TOTAL ACCESS",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={websaccess_popup}
                    filename={"WebOnly-Entry.csv"}
                    headers={HeadfieldOnline}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible15(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>

            <CModal
              style={{ width: 600 }}
              show={visible16}
              onClose={() => setVisible16(false)}
            >
              <CModalHeader onClose={() => setVisible16(false)}>
                <CModalTitle>No Access Entries</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={noboxs_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "LAST_ACCESS_TS",
                        label: "LAST ACCESS TIME",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                      LAST_ACCESS_TS: (item) => (
                        <td>
                          {item.LAST_ACCESS_TS
                            ? moment(item.LAST_ACCESS_TS).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )
                            : "-"}
                        </td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={noboxs_popup}
                    filename={"ZeroAccess-Entry.csv"}
                    headers={HeadfieldsNoBox}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible16(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>

            <CModal
              style={{ width: 600 }}
              show={visible22}
              onClose={() => setVisible22(false)}
            >
              <CModalHeader onClose={() => setVisible22(false)}>
                <CModalTitle>Pin+Web Entries</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={pinwebaccess_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "LOGIN_TYPE",
                        label: "LOGIN TYPE",
                        _style: tablehead,
                      },
                      {
                        key: "TOTAL_ACCESS",
                        label: "TOTAL ACCESS",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={pinwebaccess_popup}
                    filename={"PinPlusWeb-Entry.csv"}
                    headers={HeadfieldOnline}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible22(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 600 }}
              show={visible23}
              onClose={() => setVisible23(false)}
            >
              <CModalHeader onClose={() => setVisible23(false)}>
                <CModalTitle>Biometric+Pin Access Entries</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={bioaccess_popup}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "LOGIN_TYPE",
                        label: "LOGIN TYPE",
                        _style: tablehead,
                      },
                      {
                        key: "TOTAL_ACCESS",
                        label: "TOTAL ACCESS",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={bioaccess_popup}
                    filename={"Biometric-Entry.csv"}
                    headers={HeadfieldAccess}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible23(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
          <CCardFooter
            className="text-center"
            style={{ backgroundColor: "peachpuff" }}
          >
            <b>Access Type Status ({timeRangeDate})</b>
          </CCardFooter>
        </CCard>

        <CCard style={{ width: "22vw", height: "18vw" }} className="ccard">
          <CCardBody className="p-3">
            {testact_counts && testact_counts.length > 0 ? (
              testact_counts.map((state, index) => {
                return (
                  <div key={`test-${index}`} className="d-flex justify-content-between">
                    {state.ENTRY == "Cabinets with test performed" ? (
                      <CButton onClick={() => setVisible19(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : state.ENTRY == "Cabinets with Zero Test" ? (
                      <CButton onClick={() => setVisible21(true)}>
                        {state.ENTRY}
                      </CButton>
                    ) : (
                      <p className="cabstatus">{state.ENTRY}</p>
                    )}
                    <p
                      className={
                        state.ENTRY == "Cabinets with test performed"
                          ? "text-success counter"
                          : state.ENTRY == "Cabinets with Zero Test"
                          ? "text-danger counter"
                          : "text-dark counter"
                      }
                    >
                      <b>{state.COUNTER || 0}</b>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <p>No test data available</p>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Cabinets with test performed</p>
                  <p className="text-success counter"><b>0</b></p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="cabstatus">Cabinets with Zero Test</p>
                  <p className="text-danger counter"><b>0</b></p>
                </div>
              </div>
            )}
            <CModal
              style={{ width: 600 }}
              show={visible19}
              onClose={() => setVisible19(false)}
            >
              <CModalHeader onClose={() => setVisible19(false)}>
                <CModalTitle>
                  Total Cabinets With Pump test performed details
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={testact_popups}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "TIMES_TEST_PERFORMED",
                        label: "TIMES TEST PERFORMED",
                        _style: tablehead,
                      },
                    ]}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={testact_popups}
                    filename={"TotalTestActivity.csv"}
                    headers={HeadfieldsTotalTest}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>

                <CButton color="secondary" onClick={() => setVisible19(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
            <CModal
              style={{ width: 600 }}
              show={visible21}
              onClose={() => setVisible21(false)}
            >
              <CModalHeader onClose={() => setVisible21(false)}>
                <CModalTitle>
                  Cabinets With NO Pump test performed details
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={notestact_popups}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      { key: "ZONE_NAME", label: "REGION", _style: tablehead },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                    ]}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={notestact_popups}
                    filename={"NoTestActivity.csv"}
                    headers={HeadfieldsTotalTest}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>

                <CButton color="secondary" onClick={() => setVisible21(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
          <CCardFooter
            className="text-center"
            style={{ backgroundColor: "#dae3f3" }}
          >
            <b>Pump Test performed total sites</b>
          </CCardFooter>
        </CCard>

        <CCard style={{ width: "22vw", height: "18vw" }} className="ccard">
          <CCardBody className="p-3">
            <div className="d-flex justify-content-around">
              <CButton onClick={() => setVisible20(true)}>
                <div
                  style={{
                    "padding-left": "0.1em",
                    "font-size": "5rem",
                    "align-self": "center",
                  }}
                >
                  <p style={{ color: "red" }}>{get_batterys ? get_batterys.length : 0}</p>
                </div>
              </CButton>
            </div>

            <CModal
              style={{ width: 600 }}
              show={visible20}
              onClose={() => setVisible20(false)}
            >
              <CModalHeader onClose={() => setVisible20(false)}>
                <CModalTitle>
                  Device Health Parameters Sites Details
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="table text-center">
                  <Datatable
                    data={get_batterys}
                    Headfields={[
                      { key: "RO_CODE", label: "RO CODE", _style: tablehead },
                      { key: "RO_NAME", label: "RO NAME", _style: tablehead },
                      {
                        key: "ZONE_NAME",
                        label: "REGION NAME",
                        _style: tablehead,
                      },
                      {
                        key: "STATE_NAME",
                        label: "STATE NAME",
                        _style: tablehead,
                      },
                      {
                        key: "BATTERY_PC",
                        label: "BATTERY PERCENTAGE",
                        _style: tablehead,
                      },
                    ]}
                    scopedSlots={{
                      RO_CODE: (item) => (
                        <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>
                      ),
                      RO_NAME: (item) => (
                        <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>
                      ),
                    }}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary">
                  <CSVLink
                    data={get_batterys}
                    filename={"Event-Sites.csv"}
                    headers={HeadfieldsBattery}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
                <CButton color="secondary" onClick={() => setVisible20(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
          <CCardFooter
            className="text-center"
            style={{ backgroundColor: "peachpuff" }}
          >
            <b>Device Health Parameters</b>
          </CCardFooter>
        </CCard>
      </div>
    </div>
  );
}

export default ADashboard;