import {
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CButton,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_events,
  get_all_events,
} from "../../../actions/AmsDashboard/AmsDashboardAction";
import {
  get_ro,
  get_state,
  get_zone,
} from "../../../actions/AmsDashboard/GetDropDownAction";
import { Datatable } from "../../../components/Datatable/Datatable";
import "./Style.scss";
import moment from "moment";
import { CSVLink } from "react-csv";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import Select from "react-select";

function Event_History() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    r_outlet: "",
    region: "",
    state: "",
    dt_to: "",
    dt_from: "",
    rocode: "",
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  //const [Issearch, setsearch] = React.useState(false);
  const [iszone, setzone] = React.useState();
  const get_table_data = [];
  const dispatch = useDispatch();
  const getzone = useSelector((state) => state.Ddwreducer.Zone);
  const getstate = useSelector((state) => state.Ddwreducer.States);
  const getro = useSelector((state) => state.Ddwreducer.RO);
  const gettable = useSelector((state) => state.Amsdashboard.events);
  const getsearchtbl = useSelector((state) => state.Amsdashboard.searchevents);

  const [isLoading, setIsLoading] = useState(true);

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  React.useEffect(() => {
    dispatch(get_zone());
    if (Object.values(formError).length === 0 && Issubmit) {
      const newUser = {
        zone: isform.region,
        state: isform.state,
        ro: isform.r_outlet,
        dt_to: isform.dt_to,
        dt_frm: isform.dt_from,
      };
      dispatch(get_events(newUser));
    }
  }, [formError]);

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(
      checkaccess({
        MODULE_ID: 3,
        AR_ROLE_ID: role,
      })
    );
  }, []);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const validateForm = (values) => {
    const err = {};
    if (!values.r_outlet) {
      err.r_outlet = "Retail outlet is Required";
    }
    if (!values.region) {
      err.region = "Region is Required";
    }
    if (!values.state) {
      err.state = "State is Required";
    }
    if (!values.dt_from) {
      err.dt_from = "Date from is Required";
    }
    if (!values.dt_to) {
      err.dt_to = "Date to is Required";
    }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setIsLoading(true);
  };

  const searchfn = (e) => {
    e.preventDefault();
    const searchconst = {
      ro: isform.rocode,
    };
    setIsLoading(true);
    dispatch(get_all_events(searchconst));
  };

  const getstatefun = (e) => {
    console.log(e.target.value);
    dispatch(get_state({ ZONE_ID: e.target.value }));
    setzone(e.target.value);
    onChangeText(e);
  };
  const getrofun = (e) => {
    console.log(e.target.value);
    dispatch(get_ro({ ZONE_ID: iszone, STATE_ID: e.target.value }));
    onChangeText(e);
  };

  const exportData = (Issubmit ? gettable : getsearchtbl).map((item) => ({
    ...item,
    EVENT_TS: item.EVENT_TS
      ? moment(item.EVENT_TS).format("DD-MM-YYYY HH:mm:ss")
      : "-",
  }));

  useEffect(() => {
    if (gettable || getsearchtbl) {
      setIsLoading(false);
    }
  }, [gettable, getsearchtbl]);

  const Headfields = [
    { key: "EVENT_TS", label: "DATE", _style: tablehead },
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "RO_NAME", label: "RO NAME", _style: tablehead },
    { key: "EVENT_DESC", label: "DESCRIPTION", _style: tablehead },
    { key: "SIGNIN_USER_NAME", label: "USERS", _style: tablehead },
    { key: "LOGIN_TYPE", label: "LOGIN TYPE", _style: tablehead },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#ced4da",
      boxShadow: "none",
      "&:hover": { borderColor: "#80bdff" },
    }),
  };

  const handleZoneChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setForm({ ...isform, region: value });
    dispatch(get_state({ ZONE_ID: value }));
    setzone(value);
  };

  const handleStateChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setForm({ ...isform, state: value });
    dispatch(get_ro({ ZONE_ID: iszone, STATE_ID: value }));
  };

  const handleROChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setForm({ ...isform, r_outlet: value });
  };

  const zoneOptions = getzone.map((data) => ({
    value: data.ZONE_ID,
    label: data.ZONE_NAME,
  }));

  const stateOptions = getstate.map((data) => ({
    value: data.STATE_ID,
    label: data.STATE_NAME,
  }));

  const roOptions = getro.map((data) => ({
    value: data.RO_ID,
    label: data.RO_NAME,
  }));

  return (
    <div className="Cbody">
      {checkacc && checkacc[0].AR_RIGHTS == 2 && (
        <CForm method="post" onSubmit={submitform}>
          <CRow>
            <CCol lg={9}>
              <div className="Header mb-5">
                <h3 className="Header_Text">Event History</h3>
              </div>
            </CCol>
            <CCol lg={3}>
              <CInput
                id="rocode"
                name="rocode"
                autoComplete="off"
                value={isform.rocode}
                type="text"
                placeholder="Enter RO Code"
                onChange={onChangeText}
              ></CInput>
            </CCol>
            <CCol lg={2}>
              <CButton color="success" onClick={searchfn}>
                Search
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">
                  Zone<i style={{ color: "red" }}>*</i>
                </CLabel>
                {/* <select
                    className="form-control"
                    onChange={getstatefun}
                    name="region"
                    id="region"
                  >
                    <option>Select Zone</option>
                    {getzone.map((data) => (
                      <option value={data.ZONE_ID} key={data.ZONE_ID}>
                        {data.ZONE_NAME}
                      </option>
                    ))}
                  </select> */}
                <Select
                  options={zoneOptions}
                  onChange={handleZoneChange}
                  styles={customStyles}
                  placeholder="Select Zone"
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.region}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">
                  State<i style={{ color: "red" }}>*</i>
                </CLabel>
                {/* <select
                  className="form-control"
                  onChange={getrofun}
                  name="state"
                  id="state"
                  value={isform.state}
                >
                  <option>Select state</option>
                  {getstate.map((data) => (
                    <option value={data.STATE_ID} key={data.STATE_ID}>
                      {data.STATE_NAME}
                    </option>
                  ))}
                </select> */}
                <Select
                  options={stateOptions}
                  onChange={handleStateChange}
                  styles={customStyles}
                  placeholder="Select State"
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.state}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">
                  Retail Outlet<i style={{ color: "red" }}>*</i>
                </CLabel>
                {/* <select
                  className="form-control"
                  onChange={onChangeText}
                  name="r_outlet"
                  id="r_outlet"
                  value={isform.r_outlet}
                >
                  <option>Select RO</option>
                  {getro.map((data) => (
                    <option value={data.RO_ID} key={data.RO_ID}>
                      {data.RO_NAME}
                    </option>
                  ))}
                </select> */}
                <Select
                  options={roOptions}
                  onChange={handleROChange}
                  styles={customStyles}
                  placeholder="Select Retail Outlet"
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.r_outlet}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">
                  Valid From<i style={{ color: "red" }}>*</i>
                </CLabel>
                <CInput
                  type="date"
                  id="dt_from"
                  name="dt_from"
                  onChange={onChangeText}
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.dt_from}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">
                  Valid to<i style={{ color: "red" }}>*</i>
                </CLabel>
                <CInput
                  type="date"
                  id="dt_to"
                  name="dt_to"
                  onChange={onChangeText}
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.dt_to}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol lg={4}></CCol>
          </CRow>
          <div>
            {/* <CButton color="primary mr-3" target="_blank" onClick={() => setForm(initialvalue)} >Clear</CButton> */}
            <CButton
              color="primary "
              style={{ backgroundColor: "#01a757" }}
              target="_blank"
              onClick={submitform}
            >
              Filter
            </CButton>
            <CRow>
              <CCol lg={11}></CCol>
              <CCol lg={3}>
                <CButton color="light">
                  <CSVLink
                    data={exportData}
                    filename={"EventHistory-Report.csv"}
                    headers={Headfields}
                  >
                    Export to Excel
                  </CSVLink>
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CForm>
      )}
      <div className="table text-center">
        <Datatable
          isLoading={isLoading}
          data={Issubmit ? gettable : getsearchtbl}
          Headfields={[
            { key: "EVENT_TS", label: "DATE", _style: tablehead },
            { key: "RO_CODE", label: "RO CODE", _style: tablehead },
            { key: "RO_NAME", label: "RO NAME", _style: tablehead },
            { key: "EVENT_DESC", label: "DESCRIPTION", _style: tablehead },
            { key: "SIGNIN_USER_NAME", label: "USERS", _style: tablehead },
            { key: "LOGIN_TYPE", label: "LOGIN TYPE", _style: tablehead },
          ]}
          scopedSlots={{
            STATE_NAME: (item) => (
              <td>{item.STATE_NAME ? item.STATE_NAME : "-"}</td>
            ),
            EVENT_TS: (item) => (
              <td>
                {item.EVENT_TS
                  ? moment(item.EVENT_TS).format("DD-MM-YYYY HH:mm:ss")
                  : "-"}
              </td>
            ),
            EVENT_NAME: (item) => (
              <td>{item.EVENT_NAME ? item.EVENT_NAME : "-"}</td>
            ),
            EVENT_DESC: (item) => (
              <td>
                {item.EVENT_DESC ? item.EVENT_DESC.replace("event", "") : "-"}
              </td>
            ),
            LOGIN_TYPE: (item) => (
              <td>{item.LOGIN_TYPE ? item.LOGIN_TYPE : "-"}</td>
            ),
            SIGNIN_USER_NAME: (item) => (
              <td>{item.SIGNIN_USER_NAME ? item.SIGNIN_USER_NAME : "-"}</td>
            ),
            RO_NAME: (item) => <td>{item.RO_NAME ? item.RO_NAME : "-"}</td>,
            RO_CODE: (item) => <td>{item.RO_CODE ? item.RO_CODE : "-"}</td>,
            KEYS_TAKEN: (item) => (
              <td>{item.KEYS_TAKEN ? item.KEYS_TAKEN : "-"}</td>
            ),
            KEYS_RETURNED: (item) => (
              <td>{item.KEYS_RETURNED ? item.KEYS_RETURNED : "-"}</td>
            ),
          }}
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Event_History;
