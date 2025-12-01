import React, { useState, useEffect } from "react";
import {
  CForm,
  CInput,
  CLabel,
  CFormText,
  CFormGroup,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import "./RoList.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
import {
  get_state,
  get_zone,
  get_statecode,
} from "../../../actions/AmsDashboard/GetDropDownAction";
import { useDispatch, useSelector } from "react-redux";
import {
  create_rolist,
  get_rolist,
  update_rolist,
  delete_rolist,
} from "../../../actions/MasterDataAction/RoListAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import { CSVLink } from "react-csv";
import Select from "react-select";

function RoList() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    zone: "",
    state: "",
    scode: "",
    mktcode: "",
    name: "",
    code: "",
    shipcode: "",
    street: "",
    district: "",
    city: "",
    pincode: "",
    operation: "",
    rousername: "",
    roemail: "",
    rophone: "",
    rocategory: "",
    opt: "",
    status: "",
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const [iszone, setzone] = React.useState();
  const [valueDate, onChangedate] = React.useState();
  const getzone = useSelector((state) => state.Ddwreducer.Zone);
  const getstate = useSelector((state) => state.Ddwreducer.States);
  const getStateCode = useSelector((state) => state.statecodeReducer.stccode);

  const [selectedZone, setSelectedZone] = React.useState(null);
  const [selectedState, setSelectedState] = React.useState(null);
  const [selectedStateCode, setSelectedStateCode] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  // console.log("zone---->", getzone);
  console.log("statecode---->", getStateCode);
  // console.log("states---->", getstate);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const [isLoading, setIsLoading] = useState(true);

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(
      checkaccess({
        MODULE_ID: 2,
        AR_ROLE_ID: role,
      })
    );
  }, []);

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const validateForm = (values) => {
    const err = {};
    if (!values.zone) {
      err.zone = "Zone is Required";
    }
    if (!values.state) {
      err.state = "State Name is Required";
    }
    if (!values.name) {
      err.name = "RO Name is Required";
    }
    if (!values.code) {
      err.code = "RO code is Required";
    }
    if (values.rophone > 10) {
      err.rophone = "RO Phone should be 10 digit long";
    }
    return err;
  };

  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);

  const dispatch = useDispatch();
  const getRo = useSelector((state) => state.rolist.ro);

  React.useEffect(() => {
    var rocode = sessionStorage.getItem("RO_CODE");
    var roname = sessionStorage.getItem("RO_NAME");
    if (rocode) {
      setForm({
        name: roname,
        code: rocode,
      });
    }
    sessionStorage.removeItem("RO_CODE");
    sessionStorage.removeItem("RO_NAME");

    dispatch(get_zone());
    dispatch(get_rolist());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      const newRo = {
        RO_ID: isupdateid,
        RO_ZONE: selectedZone.value,
        RO_STATE_ID: isform.state,
        STATE_NAME: isform.state,
        STATE_CODE: isform.scode,
        RO_NAME: isform.name,
        RO_CODE: isform.code,
        DISTRICT: isform.district,
        CITY: isform.city,
        PINCODE: isform.pincode,
        RO_CATEGORY: isform.rocategory,
        OTP: isform.otp,
      };
      console.log(newRo);
      dispatch(create_rolist(newRo));
    }

    if (Object.values(formError).length === 0 && Isupdate) {
      const updateRo = {
        RO_ID: isupdateid,
        RO_ZONE: selectedZone.value,
        RO_STATE_ID: isform.state,
        STATE_NAME: isform.state,
        STATE_CODE: isform.scode,
        RO_NAME: isform.name,
        RO_CODE: isform.code,
        DISTRICT: isform.district,
        CITY: isform.city,
        PINCODE: isform.pincode,
        RO_CATEGORY: isform.rocategory,
        OTP: isform.otp,
      };
      console.log(updateRo);
      dispatch(update_rolist(updateRo));
    }
  }, [formError]);

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setshowupdatebtn(true);
    setIsLoading(true);
  };

  const editvalue = (values) => {
    setForm({
      zone: values.RO_ZONE,
      state: values.RO_STATE_ID,
      scode: values.STATE_CODE,
      name: values.RO_NAME,
      code: values.RO_CODE,
      district: values.DISTRICT,
      city: values.CITY,
      pincode: values.PINCODE,
      rocategory: values.RO_CATEGORY,
      otp: values.OTP,
    });
    setupdateid(values.RO_ID);
    setzone(values.RO_ZONE);
    setshowsavebtn(true);
    setshowupdatebtn(false);
    dispatch(get_state({ ZONE_ID: values.RO_ZONE }));
    dispatch(get_statecode({ ZONE_ID: values.RO_ZONE }));
  };

  const getstatefun = (e) => {
    dispatch(get_statecode({ ZONE_ID: e.target.value }));
    dispatch(get_state({ ZONE_ID: e.target.value }));
    setzone(e.target.value);
    onChangeText(e);
  };

  const updateform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setupdate(true);
    setIsLoading(true);
  };

  const deleteform = (value) => {
    if (window.confirm("Delete the RO?")) {
      dispatch(delete_rolist(value));
    }
  };

  const checkselect = (maindata, formdata) => {
    if (maindata == formdata) return true;

    return false;
  };

  const handleZoneChange = (selectedOption) => {
    setSelectedZone(selectedOption);
    dispatch(get_state({ ZONE_ID: selectedOption.value }));
    dispatch(get_statecode({ ZONE_ID: selectedOption.value }));
    setForm({ ...isform, zone: selectedOption.value });
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setForm({ ...isform, state: selectedOption.value });
  };

  const handleStateCodeChange = (selectedOption) => {
    setSelectedStateCode(selectedOption);
    setForm({ ...isform, scode: selectedOption.value });
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setForm({ ...isform, rocategory: selectedOption.value });
  };

  const zoneOptions = getzone.map((data) => ({
    value: data.ZONE_ID,
    label: data.ZONE_NAME,
  }));

  const stateOptions = getstate.map((data) => ({
    value: data.STATE_ID,
    label: data.STATE_NAME,
  }));

  const stateCodeOptions = getStateCode.map((data) => ({
    value: data.STATE_CODE,
    label: data.STATE_CODE,
  }));

  const categoryOptions = [
    { value: "COCO", label: "COCO" },
    { value: "DODO", label: "DODO" },
    { value: "CODO", label: "CODO" },
  ];

  const Headfields = [
    { key: "SSTATE", label: "STATE NAME", _style: tablehead },
    { key: "RO_CODE", lable: "RO CODE", _style: tablehead },
    { key: "RO_NAME", lable: "RO NAME", _style: tablehead },
    { key: "PINCODE", label: "PINCODE", _style: tablehead },
  ];

  useEffect(() => {
      if (getRo) {
        setIsLoading(false);
      }
    }, [getRo]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">Manage Retail Outlet</h3>
      </div>

      <div>
        {checkacc && checkacc[0].AR_RIGHTS == 2 && (
          <CForm method="post" onSubmit={submitform}>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Zone<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <select
                    className="form-control"
                    onChange={getstatefun}
                    name="zone"
                    id="zone"
                  >
                    <option>Select Zone</option>
                    {getzone.map((data) => (
                      <option
                        value={data.ZONE_ID}
                        key={data.ZONE_ID}
                        selected={checkselect(data.ZONE_ID, isform.zone)}
                      >
                        {data.ZONE_NAME}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    id="zone"
                    options={zoneOptions}
                    value={selectedZone}
                    onChange={handleZoneChange}
                    placeholder="Select Zone"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.zone}</p>
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
                    id="state"
                    name="state"
                    value={isform.state}
                    onChange={onChangeText}
                  >
                    <option>Select State</option>
                    {getstate.map((data) => (
                      <option value={data.STATE_ID} key={data.STATE_ID}>
                        {data.STATE_NAME}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    id="state"
                    options={stateOptions}
                    value={selectedState}
                    onChange={handleStateChange}
                    placeholder="Select State"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.state}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">State Code</CLabel>
                  {/* <select
                    className="form-control"
                    id="scode"
                    name="scode"
                    value={isform.scode}
                    onChange={onChangeText}
                  >
                    <option>Select State Code</option>
                    {getStateCode.map((data) => (
                      <option value={data.STATE_CODE} key={data.ID}>
                        {data.STATE_CODE}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    id="scode"
                    options={stateCodeOptions}
                    value={selectedStateCode}
                    onChange={handleStateCodeChange}
                    placeholder="Select State Code"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.scode}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    RO Code<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    value={isform.code}
                    onChange={onChangeText}
                    id="code"
                    name="code"
                    placeholder="Enter Ro Code.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.code}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    RO Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    value={isform.name}
                    onChange={onChangeText}
                    id="name"
                    name="name"
                    placeholder="Enter Ro Name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.name}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">RO Category</CLabel>
                  {/* <select
                    className="form-control"
                    id="rocategory"
                    name="rocategory"
                    value={isform.rocategory}
                    onChange={onChangeText}
                  >
                    <option>Select RO Category</option>
                    <option value="COCO" key={1}>
                      COCO
                    </option>
                    <option value="DODO" key={2}>
                      DODO
                    </option>
                    <option value="CODO" key={3}>
                      CODO
                    </option>
                  </select> */}
                  <Select
                    id="rocategory"
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    placeholder="Select RO Category"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.rocategory}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">District</CLabel>
                  <CInput
                    type="Name"
                    value={isform.district}
                    onChange={onChangeText}
                    id="district"
                    name="district"
                    placeholder="Enter District Name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.district}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">City</CLabel>
                  <CInput
                    type="Name"
                    value={isform.city}
                    onChange={onChangeText}
                    id="city"
                    name="city"
                    placeholder="Enter City Name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.city}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Pincode</CLabel>
                  <CInput
                    type="text"
                    value={isform.pincode}
                    onChange={onChangeText}
                    id="pincode"
                    name="pincode"
                    placeholder="Enter Pincode.."
                    maxLength={6}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.pincode}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
            </CRow>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">OTP Date</CLabel>
                  <CInput
                    type="date"
                    format="mm-dd-yyyy"
                    id="otp"
                    name="otp"
                    value={isform.otp}
                    onChange={onChangeText}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.otp}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <div>
              <CButton
                color="primary mr-3"
                target="_blank"
                style={{ backgroundColor: "gray" }}
                onClick={() => setForm(initialvalue)}
              >
                Clear
              </CButton>
              <CButton
                color="primary"
                style={{
                  display: showsavebtn ? "none" : "",
                  backgroundColor: "#01a757",
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
                  backgroundColor: "#01a757",
                }}
                target="_blank"
                onClick={updateform}
              >
                Update
              </CButton>
              '
              <CRow>
                <CCol lg={11}></CCol>
                <CCol lg={3}>
                  <CButton color="light">
                    <CSVLink
                      data={getRo}
                      filename={"RO_List-Report.csv"}
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
      </div>
      <br></br>
      <div className="table text-center">
        <Datatable
          isLoading={isLoading}
          data={getRo}
          Headfields={[
            {
              key: "Modify",
              label: "MODIFY",
              sorter: false,
              filter: false,
              _style: tablehead,
            },
            { key: "Delete", label: "DELETE", _style: tablehead },
            { key: "SSTATE", label: "STATE NAME", _style: tablehead },
            { key: "RO_CODE", lable: "RO CODE", _style: tablehead },
            { key: "RO_NAME", _style: tablehead },
            { key: "PINCODE", _style: tablehead },
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
            ),
            Delete: (item) => (
              <td>
                <CButton
                  className="border border-secondary"
                  color="white"
                  onClick={() => deleteform(item)}
                  disabled={
                    checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2
                      ? false
                      : true
                  }
                >
                  Delete
                </CButton>
              </td>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default RoList;