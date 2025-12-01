import React, { useState, useEffect } from "react";
import {
  CForm,
  CInput,
  CLabel,
  CSwitch,
  CSelect,
  CFormText,
  CFormGroup,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import "./Style.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { get_keylist } from "../../../actions/MasterDataAction/KeyListAction";
import { get_protalUser } from "../../../actions/PortalmngAction/PortalUserAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import {
  get_activitylist,
  update_activitylist,
  create_activitylist
} from "../../../actions/MasterDataAction/ActivityListAction";

function ActivityList({ }) {
  //const seletedRo = { roId: 2 };
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    aname: "",
    code: "",
    timelimit: "",
    freq: "",
    timefrom: "",
    timeto: "",
    s1: false,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    s7: false,
    keys: ""
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [iskey, setkey] = React.useState([]);
  const [iskeyid, setkeyid] = React.useState([]);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);
  const [isupdateid, setupdateid] = React.useState();
  // const [isCabinetid, setCabinetid] = React.useState();

  // const getuser = useSelector((state) => state.portaluser.users);
  const getuser = useSelector(
    (state) => state.manageActivities.manageActivitiesForm
  );

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const [isLoading, setIsLoading] = useState(true);

  const role = sessionStorage.getItem("role");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  function onChangeKeys(e) {
    console.log(e.target.selectedOptions);
    setkey({ key: Array.from(e.target.selectedOptions, (key) => key.value) });
    setkeyid({
      keyid: Array.from(e.target.selectedOptions, (key) => key.className)
    });
    console.log("iskey", iskey);
    console.log("iskeyid", iskeyid);
  }
  const onchangeswitch = (e) => {
    const { name, checked } = e.target;
    setForm({ ...isform, [name]: checked });
  };

  // function onChangeUsers(e) {
  //     setkey({ key: Array.from(e.target.selectedOptions, (key) => key.value) });
  //     console.log(iskey);
  // }

  const dispatch = useDispatch();
  const getActivity = useSelector((state) => state.activitylist.activity);
  const getkey = useSelector((state) => state.keylist.keyl);

  //console.log(seletedRo);
  React.useEffect(() => {
    dispatch(
      checkaccess({
        MODULE_ID: 2,
        AR_ROLE_ID: role
      })
    );
    dispatch(get_activitylist());
    dispatch(get_keylist());
    dispatch(get_protalUser());
  }, []);

  //console.log(getkey);
  //console.log(getActivity);
  // const _vgetroles = () => {
  //     dispatch(get_activitylist());
  //     setForm(initialvalue);
  //     setupdate(false);
  // }

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log(isform);

      const newActivity = {
        ACTIVITY_ID: isupdateid,
        ACT_NAME: isform.aname,
        ACT_CODE: isform.code,
        ACT_DURATION: isform.timelimit,
        ACT_WEEKDAYS: {
          s1: isform.s1,
          s2: isform.s2,
          s3: isform.s3,
          s4: isform.s4,
          s5: isform.s5,
          s6: isform.s6,
          s7: isform.s7
        },
        ACT_FREQUENCY: isform.freq,
        //KEYS: JSON.stringify(iskey.key),
        ACT_KEYS_LIST: iskeyid.keyid,
        KEYNAMES: iskey.key,
        TIMESLOTFROM: isform.timefrom + ":00.000",
        TIMESLOTTO: isform.timeto + ":00.000"
      };
      console.log("create data--", newActivity);
      dispatch(create_activitylist(newActivity))
    }

    if (Object.values(formError).length === 0 && Isupdate) {
      const updateActivity = {
        ACTIVITY_ID: isupdateid,
        ACT_NAME: isform.aname,
        ACT_CODE: isform.code,
        ACT_DURATION: isform.timelimit,
        ACT_WEEKDAYS: {
          s1: isform.s1,
          s2: isform.s2,
          s3: isform.s3,
          s4: isform.s4,
          s5: isform.s5,
          s6: isform.s6,
          s7: isform.s7
        },
        ACT_FREQUENCY: isform.freq,
        //KEYS: JSON.stringify(iskey.key),
        ACT_KEYS_LIST: iskeyid.keyid,
        KEYNAMES: iskey.key,
        TIMESLOTFROM: isform.timefrom + ":00.000",
        TIMESLOTTO: isform.timeto + ":00.000"
      };
      console.log("update data--", updateActivity);
      dispatch(update_activitylist(updateActivity))
    }
  }, [formError]);

  const validateForm = (values) => {
    console.log("values", values);
    const err = {};

    if (!values.aname) {
      err.aname = "Activity Name is Required";
    }
    if (!values.code) {
      err.code = "Activity Code is Required";
    }
    if (!values.timelimit) {
      err.timelimit = "Time Limit is Required";
    }
    if (!values.freq) {
      err.freq = "Frequency is Required";
    }
    if (!iskey.key) {
      err.key = "Key Name is Required";
    }
    if (!values.timefrom) {
      err.timefrom = "Time From is Required";
    }
    if (!values.timeto) {
      err.timeto = "Time To is Required";
    }
    // if (!values.user) {
    //     err.user = "User Name is Required"
    // }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setshowupdatebtn(true);
    // console.log(iskey);
    setIsLoading(true)
  };

  const editvalue = (values) => {
    // console.log("values", values);
    // console.log("key names", values.ACT_KEYS_LIST.split(","));
    const WEEKDAYS = JSON.parse(values.ACT_WEEKDAYS);
    setkey({ key: values.KEYNAMES.split(",") });
    setkeyid({ keyid: values.ACT_KEYS_LIST.split(",") });
    // setkey({ key: Array.from(values.KEYS, (key) => key.value) });
    var timefromValue = values.ACT_START_TIME.substring(0, 5);
    var timetoValue = values.ACT_END_TIME.substring(0, 5);

    setForm({
      aname: values.ACT_NAME,
      code: values.ACT_CODE,
      timelimit: values.ACT_DURATION,
      freq: values.ACT_FREQUENCY,
      timefrom: timefromValue,
      timeto: timetoValue,
      key: iskey.key,
      s1: WEEKDAYS.s1,
      s2: WEEKDAYS.s2,
      s3: WEEKDAYS.s3,
      s4: WEEKDAYS.s4,
      s5: WEEKDAYS.s5,
      s6: WEEKDAYS.s6,
      s7: WEEKDAYS.s7
    });

    setupdateid(values.ACTIVITY_ID);
    //setCabinetid(values.AMSC_CABINETID)

    setshowsavebtn(true);
    setshowupdatebtn(false);
  };

  const updateform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setupdate(true);
    setIsLoading(true);
  };

  const deleteform = (value) => {
    const newActivity = {
      ACTIVITY_ID: value.ACTIVITY_ID
    };
    // dispatch(delete_activitylist(newActivity));
  };

  const hidetable = () => {
    if (checkacc && checkacc[0].AR_RIGHTS == 2) {
      return false;
    }
    return true;
  };

  //console.log(isform);

  const resetForm = () => {
    setForm(initialvalue);
    setkey({ key: "" });
  };

  useEffect(() => {
      if (getActivity) {
        setIsLoading(false);
      }
    }, [getActivity]);

  return (
    <div className="Cbody">
      <div>
        <div className="Header mb-5">
          <h3 className="Header_Text">Manage Activity</h3>
        </div>
        {checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 && (
          <CForm onSubmit={submitform} method="post">
            <CRow>
              <CCol lg={6}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Activity Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    id="aname"
                    name="aname"
                    value={isform.aname}
                    onChange={onChange}
                    placeholder="Enter Activity Name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.aname}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={6}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Activity Code<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="text"
                    id="code"
                    name="code"
                    value={isform.code}
                    onChange={onChange}
                    placeholder="Enter Activity Code.."
                    maxLength={2}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.aname}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={6}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Time limit in minutes<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="number"
                    id="timelimit"
                    name="timelimit"
                    value={isform.timelimit}
                    onChange={onChange}
                    placeholder="Enter Time Limit.."
                    maxLength={2}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.timelimit}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={6}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Frequency in a day<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="number"
                    id="freq"
                    name="freq"
                    value={isform.freq}
                    onChange={onChange}
                    placeholder="Enter Frequency.."
                    maxLength={2}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.freq}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={6}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Time Slot (from time)<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="time"
                    id="timefrom"
                    name="timefrom"
                    value={isform.timefrom}
                    onChange={onChange}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.timefrom}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={6}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Time Slot (to time)<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="time"
                    id="timeto"
                    name="timeto"
                    value={isform.timeto}
                    onChange={onChange}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.timeto}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <br></br>
            <CFormGroup row>
              <CCol xs="1">
                <CSwitch
                  //onClick={this.sunday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s1"
                  name="s1"
                  value={isform.s1}
                  onChange={onchangeswitch}
                  checked={isform.s1}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>SUN</CLabel>
              </CCol>

              <CCol xs="1">
                <CSwitch
                  //onClick={this.monday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s2"
                  name="s2"
                  value={isform.s2}
                  onChange={onchangeswitch}
                  checked={isform.s2}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>MON</CLabel>
              </CCol>

              <CCol xs="1">
                <CSwitch
                  //onClick={this.tuesday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s3"
                  name="s3"
                  value={isform.s3}
                  checked={isform.s3}
                  onChange={onchangeswitch}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>TUE</CLabel>
              </CCol>

              <CCol xs="1">
                <CSwitch
                  //onClick={this.wednesday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s4"
                  name="s4"
                  value={isform.s4}
                  onChange={onchangeswitch}
                  checked={isform.s4}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>WED</CLabel>
              </CCol>

              <CCol xs="1">
                <CSwitch
                  //onClick={this.thrusday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s5"
                  name="s5"
                  value={isform.s5}
                  onChange={onchangeswitch}
                  checked={isform.s5}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>THURS</CLabel>
              </CCol>

              <CCol xs="1">
                <CSwitch
                  //onClick={this.friday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s6"
                  name="s6"
                  value={isform.s6}
                  onChange={onchangeswitch}
                  checked={isform.s6}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>FRI</CLabel>
              </CCol>

              <CCol xs="1">
                <CSwitch
                  //onClick={this.saturday}
                  className={"mx-1"}
                  color={"primary"}
                  variant={"opposite"}
                  labelOn={"\u2713"}
                  labelOff={"\u2715"}
                  id="s7"
                  name="s7"
                  value={isform.s7}
                  onChange={onchangeswitch}
                  checked={isform.s7}
                />{" "}
              </CCol>
              <CCol xs="1">
                <CLabel>SAT</CLabel>
              </CCol>
            </CFormGroup>
            <CRow>
              <CCol xs="7">
                <CFormGroup>
                  <CLabel>
                    Associate Keys<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CSelect
                    selected
                    required
                    custom
                    name="key"
                    id="key"
                    value={iskey.key}
                    onChange={onChangeKeys}
                    multiple={true}
                  >
                    {getkey.map((data) => (
                      <option
                        value={data.KEY_NAME}
                        className={data.KEY_ID}
                        key={data.KEY_ID}
                      >
                        {data.KEY_NAME}
                      </option>
                    ))}
                  </CSelect>
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.key}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <div>
              <CButton
                color="primary mr-3"
                target="_blank"
                style={{ backgroundColor: "gray" }}
                onClick={resetForm}
              >
                Clear
              </CButton>
              <CButton
                color="primary"
                style={{
                  display: showsavebtn ? "none" : "",
                  backgroundColor: "#01a757"
                }}
                target="_blank"
                onClick={submitform}
              >
                Save
              </CButton>
              <CButton
                color="primary"
                style={{
                  display: showupdatebtn ? "none" : "",
                  backgroundColor: "#01a757"
                }}
                target="_blank"
                onClick={updateform}
              >
                Update
              </CButton>
            </div>
            <br></br>
          </CForm>
        )}
      </div>
      <br></br>

      <div className="table text-center">
        <Datatable
          isLoading={isLoading}
          data={getActivity}
          Headfields={[
            {
              key: "Modify",
              label: "MODIFY",
              sorter: false,
              filter: false,
              _style: tablehead
            },
            // { key: 'Delete', _style: tablehead },
            { key: "ACT_NAME", label: "ACTIVITY NAME", _style: tablehead },
            { key: "ACT_CODE", label: "ACTIVITY CODE", _style: tablehead },
            {
              key: "ACT_DURATION",
              label: "ACTIVITY DURATION",
              _style: tablehead
            },
            {
              key: "ACT_FREQUENCY",
              label: "ACTIVITY FREQUENCY",
              _style: tablehead
            }
            // { key: 'ACT_KEYS_LIST', label: 'KEYS', _style: tablehead },
          ]}
          scopedSlots={{
            Modify: (item) => (
              <td>
                <CButton
                  className="border border-secondary"
                  color="white"
                  onClick={() => editvalue(item)}
                  disabled={
                    checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2
                      ? false
                      : true
                  }
                >
                  Modify
                </CButton>
              </td>
            )
          }}
        />
      </div>
    </div>
  );
}

export default ActivityList;
