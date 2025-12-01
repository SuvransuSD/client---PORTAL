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
import "./AmsCabinet.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
//import { Headfields, usersData } from './mockAmsCabinet'
import { useDispatch, useSelector } from "react-redux";
import {
  create_amscabinet,
  delete_amscabinet,
  update_amscabinet,
  get_amscabinet,
} from "../../../actions/MasterDataAction/AmsCabinetAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import {
  get_ro,
  get_state,
  get_zone,
} from "../../../actions/AmsDashboard/GetDropDownAction";
import Select from "react-select";

function AmsCabinet() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    location: "",
    region: "",
    r_outlet: "",
    state: "",
    gateway: "",
    ip: "",
    subnet: "",
    Cabinetcode: "",
    makecategory: "",
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();

  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);
  const [iszone, setzone] = React.useState();
  const getzone = useSelector((state) => state.Ddwreducer.Zone);
  const getstate = useSelector((state) => state.Ddwreducer.States);
  const getro = useSelector((state) => state.Ddwreducer.RO);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const [isLoading, setIsLoading] = useState(true);

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    var ipaddr = sessionStorage.getItem("CABINET_IP_ADDR");
    var rocode = sessionStorage.getItem("CABINET_CODE");
    var roname = sessionStorage.getItem("LOCATION");
    if (ipaddr) {
      var ipstr = ipaddr.split(".").map(Number);
      ipstr[3] = ipstr[3] - 14;
      var gatewayaddr = ipstr.join(".");
      // console.log('gateway---->',gateway);
      // console.log('ip array--->',ipstr);
      setForm({
        //location: roname,
        Cabinetcode: rocode,
        ip: ipaddr,
        subnet: "255.255.255.192",
        gateway: gatewayaddr,
      });
    }

    sessionStorage.removeItem("CABINET_IP_ADDR");
    sessionStorage.removeItem("CABINET_CODE");
    sessionStorage.removeItem("LOCATION");

    dispatch(
      checkaccess({
        MODULE_ID: 2,
        AR_ROLE_ID: role,
      })
    );
    dispatch(get_zone());
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const dispatch = useDispatch();
  const getCabinet = useSelector((state) => state.amscabinet.cabinet);

  React.useEffect(() => {
    dispatch(get_amscabinet());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log(isform);

      const newCabinet = {
        REGION: isform.region,
        STATE: isform.state,
        r_outlet: isform.r_outlet,
        //LOCATION: isform.location,
        CABINET_CODE: isform.Cabinetcode,
        CABINET_GATEWAY: isform.gateway,
        CABINET_IP_ADDR: isform.ip,
        CABINET_SUBNET: isform.subnet,
        MAKE: isform.makecategory,
      };
      dispatch(create_amscabinet(newCabinet));
    }

    if (Object.values(formError).length === 0 && Isupdate) {
      console.log(isform);

      const updatecabinet = {
        CABINET_ID: isupdateid,
        REGION: isform.region,
        STATE: isform.state,
        r_outlet: isform.r_outlet,
        //LOCATION: isform.location,
        CABINET_CODE: isform.Cabinetcode,
        CABINET_GATEWAY: isform.gateway,
        CABINET_IP_ADDR: isform.ip,
        CABINET_SUBNET: isform.subnet,
        MAKE: isform.makecategory,
      };
      dispatch(update_amscabinet(updatecabinet));
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
      err.r_outlet = "RO is Required";
    }
    // if (!values.location) {
    //     err.location = "Location is Required"
    // }
    if (!values.Cabinetcode) {
      err.Cabinetcode = "Cabinet code is Required";
    }
    if (!values.gateway) {
      err.gateway = "Gateway is Required";
    }
    if (!values.ip) {
      err.ip = "Ip Address is Required";
    }
    if (!values.subnet) {
      err.subnet = "Subnet is Required";
    }
    if (!values.makecategory) {
      err.makecategory = "Make is Required";
    }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setshowupdatebtn(true);
    setIsLoading(true);
  };

  const editvalue = (values) => {
    setForm({
      region: values.CABINET_ZONE,
      r_outlet: values.CABINET_RO_ID,
      state: values.CABINET_STATE,
      //location: values.CABINET_LOCATION,
      Cabinetcode: values.CABINET_CODE,
      gateway: values.CABINET_GATEWAY,
      ip: values.CABINET_IP_ADDR,
      subnet: values.CABINET_SUBNET,
      makecategory: values.MAKE,
    });
    setupdateid(values.CABINET_ID);

    setshowsavebtn(true);
    setshowupdatebtn(false);
    dispatch(get_state({ ZONE_ID: values.CABINET_ZONE }));
    setTimeout(() => {
      dispatch(
        get_ro({ ZONE_ID: values.CABINET_ZONE, STATE_ID: values.CABINET_STATE })
      );
    }, 1000);
  };

  const updateform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setupdate(true);
    setIsLoading(true);
  };

  const deleteform = (value) => {
    if (window.confirm("Delete this cabinet?")) {
      dispatch(delete_amscabinet(value));
    }
  };

  const getstatefun = (e) => {
    console.log(e.target.value);
    dispatch(get_state({ ZONE_ID: e.target.value }));
    setzone(e.target.value);
    onChange(e);
  };
  const getrofun = (e) => {
    console.log(e.target.value);
    dispatch(get_ro({ ZONE_ID: iszone, STATE_ID: e.target.value }));
    onChange(e);
  };

  const checkselect = (maindata, formdata) => {
    if (maindata == formdata) return true;
    return false;
  };

  const handleSelectChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
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

  const handleZoneChange = (selectedOption) => {
    setForm({ ...isform, region: selectedOption?.value || "" });
    setzone(selectedOption?.value || null);
    dispatch(get_state({ ZONE_ID: selectedOption?.value }));
  };

  const handleStateChange = (selectedOption) => {
    setForm({ ...isform, state: selectedOption?.value || "" });
    dispatch(get_ro({ ZONE_ID: iszone, STATE_ID: selectedOption?.value }));
  };

  const handleRoChange = (selectedOption) => {
    setForm({ ...isform, r_outlet: selectedOption?.value || "" });
  };

  useEffect(() => {
      if (getCabinet) {
        setIsLoading(false);
      }
    }, [getCabinet]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">Manage Cabinet</h3>
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
                    name="region"
                    id="region"
                    value={isform.region}
                  >
                    <option>Select Zone</option>
                    {getzone.map((data) => (
                      <option
                        value={data.ZONE_ID}
                        key={data.ZONE_ID}
                        selected={checkselect(data.ZONE_ID, isform.region)}
                      >
                        {data.ZONE_NAME}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    options={zoneOptions}
                    value={zoneOptions.find((option) => option.value === isform.region)}
                    onChange={handleZoneChange}
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
                    value={stateOptions.find((option) => option.value === isform.state)}
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
                  <CLabel htmlFor="nf-email">
                    RO Name<i style={{ color: "red" }}>*</i>
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
                    value={roOptions.find(
                      (option) => option.value === isform.r_outlet
                    )}
                    onChange={handleRoChange}
                    placeholder="Select RO Name"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.r_outlet}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    RO Code<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    id="Cabinetcode"
                    name="Cabinetcode"
                    value={isform.Cabinetcode}
                    onChange={onChange}
                    placeholder="Enter RO Code.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.Cabinetcode}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Ip Address<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="name"
                    id="ip"
                    name="ip"
                    value={isform.ip}
                    onChange={onChange}
                    placeholder="Enter Ip Address.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.ip}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Subnet Mask<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="name"
                    id="subnet"
                    name="subnet"
                    value={isform.subnet}
                    onChange={onChange}
                    placeholder="Enter Subnet Mask.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.subnet}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Gateway<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="name"
                    id="gateway"
                    name="gateway"
                    value={isform.gateway}
                    onChange={onChange}
                    placeholder="Enter Gateway.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.gateway}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Make Category<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <select
                    className="form-control"
                    id="makecategory"
                    name="makecategory"
                    value={isform.makecategory}
                    onChange={onChange}
                  >
                    <option>Select Make</option>
                    <option value='CSI' key={1}>CSI</option>
                    <option value='GALLER' key={2} >GALLER</option>
                    <option value='SENERGY' key={3}>SENERGY</option>
                  </select> */}
                  <Select
                    id="makecategory"
                    name="makecategory"
                    value={
                      isform.makecategory
                        ? {
                            label: isform.makecategory,
                            value: isform.makecategory,
                          }
                        : null
                    }
                    onChange={(option) =>
                      handleSelectChange("makecategory", option.value)
                    }
                    options={[
                      { label: "CSI", value: "CSI" },
                      { label: "GALLER", value: "GALLER" },
                      { label: "SENERGY", value: "SENERGY" },
                    ]}
                    placeholder="Select Make"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.makecategory}</p>
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
            </div>
            <br></br>
          </CForm>
        )}
      </div>
      <br></br>

      <div className="table text-center">
        <Datatable
          isLoading={isLoading}
          data={getCabinet}
          Headfields={[
            {
              key: "Modify",
              label: "MODIFY",
              sorter: false,
              filter: false,
              _style: tablehead,
            },
            { key: "Delete", label: "DELETE", _style: tablehead },
            //{ key: 'CABINET_LOCATION', _style: tablehead },
            { key: "CABINET_CODE", _style: tablehead },
            { key: "CABINET_GATEWAY", _style: tablehead },
            {
              key: "CABINET_IP_ADDR",
              label: "CABINET IP ADDRESS",
              _style: tablehead,
            },
            { key: "CABINET_SUBNET", _style: tablehead },
            { key: "MAKE", _style: tablehead },
          ]}
          scopedSlots={{
            Modify: (item) => (
              <td>
                <CButton
                  className="border border-secondary"
                  color="grey"
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
                  color="grey"
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

export default AmsCabinet;
