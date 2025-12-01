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
  getuserrelated,
  getuser_withrocode,
} from "../../../actions/AmsDashboard/AmsDashboardAction";
import { get_protalUser } from "../../../actions/PortalmngAction/PortalUserAction";
import {
  get_ro,
  get_state,
  get_zone,
} from "../../../actions/AmsDashboard/GetDropDownAction";
import moment from "moment";
import { Datatable } from "../../../components/Datatable/Datatable";
import "./Style.scss";
import Select from "react-select";

function Cabinet_User() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const dispatch = useDispatch();
  const initialvalue = { region: "", state: "", r_outlet: "" };
  const getCab = useSelector((state) => state.Amsdashboard.userrelateddata);
  const getCabwithRo = useSelector((state) => state.Amsdashboard.userwithro);
  //  const getUsers = useSelector((state) => state.portaluser.users);
  //  const [Isclicked, setclick] = React.useState(false);
  //  const [isShown, setIsShown] = useState(false);
  const [formError, setformError] = React.useState({});
  const [isform, setForm] = React.useState(initialvalue);
  const [Issubmit, setsubmit] = React.useState(false);
  const [iszone, setzone] = React.useState();
  const getzone = useSelector((state) => state.Ddwreducer.Zone);
  const getstate = useSelector((state) => state.Ddwreducer.States);
  const getro = useSelector((state) => state.Ddwreducer.RO);
  // console.log(getCabwithRo);

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    dispatch(getuserrelated());
    dispatch(get_protalUser());
    dispatch(get_zone());
  }, []);

  //   const handleClick = event => {
  //     setIsShown(true);
  //     setclick(true);
  //   };

  //   const webuserClick = event => {
  //     setclick(false);
  //     setIsShown(false);
  //   };

  const onChangeSelect = (name, option) => {
    setForm({ ...isform, [name]: option ? option.value : "" });
  };

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      const newUser = {
        // rocode: isform.rocode,
        region: isform.region,
        r_outlet: isform.r_outlet,
        state: isform.state,
      };
      dispatch(getuser_withrocode(newUser));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};
    if (!values.region) {
      err.region = "Zone is Required";
    }
    if (!values.state) {
      err.state = "State is Required";
    }
    if (!values.r_outlet) {
      err.r_outlet = "Retail Outlet is Required";
    }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setIsLoading(true);
  };

  const getstatefun = (e) => {
    console.log(e.target.value);
    dispatch(get_state({ ZONE_ID: e.target.value }));
    setzone(e.target.value);
    // onChange(e);
  };
  const getrofun = (e) => {
    console.log(e.target.value);
    dispatch(get_ro({ ZONE_ID: iszone, STATE_ID: e.target.value }));
    // onChange(e);
  };

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

  const checkselect = (maindata, formdata) => {
    if (maindata == formdata) return true;

    return false;
  };

  useEffect(() => {
    if (getCabwithRo) {
      setIsLoading(false);
    }
  }, [getCabwithRo]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">AMS Cabinet Users Report</h3>
      </div>
      <br></br>
      <CRow>
        <CCol lg={4}></CCol>
        <CCol lg={6}>
          <h5>TOTAL NUMBER OF CABINET USERS: {getCab.length} </h5>
        </CCol>
      </CRow>
      <br></br>

      <div>
        <CRow>
          <CCol lg={4}>
            <CFormGroup>
              <CLabel htmlFor="nf-email">
                Zone<i style={{ color: "red" }}>*</i>
              </CLabel>
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
                <option>Select State</option>
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
                onChange={onChange}
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

          <CCol lg={2}>
            <CButton
              color="primary "
              style={{ backgroundColor: "#01a757", "margin-top": "28px" }}
              target="_blank"
              onClick={submitform}
            >
              Filter
            </CButton>
          </CCol>
        </CRow>
      </div>

      <br></br>

      <div className="table text-center">
        <Datatable
          isLoading={isLoading}
          data={getCabwithRo}
          Headfields={[
            { key: "RO_CODE", _style: tablehead },
            { key: "USER_NAME", _style: tablehead },
            { key: "ROLE_NAME", _style: tablehead },
            {
              key: "CABINET_LOCATION",
              label: "RO LOCATION",
              _style: tablehead,
            },
            { key: "USER_EMAIL", _style: tablehead },
            { key: "USER_IS_ACTIVE", _style: tablehead },
            { key: "USER_MOBILE", _style: tablehead },
            {
              key: "USER_VALIDITY_TO",
              label: "VALID UNTIL",
              _style: tablehead,
            },
            {
              key: "USER_LAST_LOGIN_TIMESTAMP",
              label: "USER LAST LOGIN",
              _style: tablehead,
            },
          ]}
          scopedSlots={{
            USER_IS_ACTIVE: (item) => (
              <td>{item.USER_IS_ACTIVE == 1 ? "Active" : "Inactive"}</td>
            ),
            USER_LAST_LOGIN_TIMESTAMP: (item) => (
              <td>
                {item.USER_LAST_LOGIN_TIMESTAMP
                  ? moment(item.USER_LAST_LOGIN_TIMESTAMP).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )
                  : "-"}
              </td>
            ),
            // 'USER_LAST_LOGIN_TIMESTAMP': (item) => (
            //   <td>
            //     {item.USER_LAST_LOGIN_TIMESTAMP.includes("1970") ? '-' :moment(item.USER_LAST_LOGIN_TIMESTAMP).format('DD-MM-YYYY HH:mm:ss') }
            //   </td>
            // ),
          }}
        />
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

export default Cabinet_User;
