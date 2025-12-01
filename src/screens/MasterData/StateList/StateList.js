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
import "./StateList.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
//import { Headfields, usersData } from './mockStateList';
import { get_statecode } from "../../../actions/AmsDashboard/GetDropDownAction";
import { useDispatch, useSelector } from "react-redux";
import {
  create_statelist,
  update_statelist,
  delete_statelist,
  get_statelist,
} from "../../../actions/MasterDataAction/StateListAction";
import { get_zone } from "../../../actions/AmsDashboard/GetDropDownAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import Select from "react-select";

function StateList() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = { name: "", zone: "", code: "" };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const [iszone, setzone] = React.useState();

  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);
  const getzone = useSelector((state) => state.Ddwreducer.Zone);
  const getStateCode = useSelector((state) => state.statecodeReducer.stccode);

  //console.log('get state code-->',getStateCode);

  const dispatch = useDispatch();
  const getStates = useSelector((state) => state.statelist.states);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );
  //console.log('checkacc',checkacc);

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

  React.useEffect(() => {
    dispatch(get_statelist());
    dispatch(get_zone());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log(isform);

      const newState = {
        STATE_ID: isupdateid,
        STATE_NAME: isform.name,
        ZONE: iszone,
        STATE_CODE: isform.code,
      };
      dispatch(create_statelist(newState));
    }

    if (Object.values(formError).length === 0 && Isupdate) {
      console.log(isform);

      const updateState = {
        STATE_ID: isupdateid,
        STATE_NAME: isform.name,
        ZONE: iszone,
        STATE_CODE: isform.code,
      };
      dispatch(update_statelist(updateState));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};

    if (!values.name) {
      err.name = "State Name is Required";
    }
    if (/\d/.test(values.name)) {
      err.name = "State Name should be in letters";
    }
    if (!values.zone) {
      err.zone = "Zone is Required";
    }
    // if (!values.code) {
    //   err.code = "State Code is Required"
    // }
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
      name: values.STATE_NAME,
      zone: values.ZONE,
      code: values.STATE_CODE,
    });
    setupdateid(values.STATE_ID);
    setzone(values.ZONE);
    setshowsavebtn(true);
    setshowupdatebtn(false);
    dispatch(get_statecode({ ZONE_ID: values.ZONE }));
  };

  const updateform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setupdate(true);
    setIsLoading(true);
  };

  const deleteform = (value) => {
    const newState = {
      STATE_ID: value.STATE_ID,
    };

    if (window.confirm("Delete this state?")) {
      dispatch(delete_statelist(newState));
    }
  };

  const getstatefun = (e) => {
    dispatch(get_statecode({ ZONE_ID: e.target.value }));
    setzone(e.target.value);
    // onChangeText(e);
  };

  const hidetable = () => {
    if (checkacc && checkacc[0].AR_RIGHTS == 2) {
      return false;
    }
    return true;
  };

  const handleZoneChange = (selectedOption) => {
    setForm({ ...isform, zone: selectedOption });
    dispatch(get_statecode({ ZONE_ID: selectedOption.value }));
  };

  const handleStateCodeChange = (selectedOption) => {
    setForm({ ...isform, code: selectedOption });
  };

  useEffect(() => {
      if (getStates) {
        setIsLoading(false);
      }
    }, [getStates]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">State Lists</h3>
      </div>

      <div>
        {checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 && (
          <CForm method="post" onSubmit={submitform}>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Zone<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <select
                    class="form-control"
                    id="zone"
                    name="zone"
                    value={isform.zone}
                    onChange={getstatefun}
                  >
                    <option>Select Zone</option>

                    {getzone.map((data) => (
                      <option value={data.ZONE_ID} key={data.ZONE_ID}>
                        {data.ZONE_NAME}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    options={getzone.map((z) => ({
                      value: z.ZONE_ID,
                      label: z.ZONE_NAME,
                    }))}
                    value={isform.zone}
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
                  <CLabel htmlFor="nf-email">State Code</CLabel>
                  {/* <CInput
                    type="Name"
                    value={isform.code}
                    onChange={onChangeText}
                    id="code"
                    name="code"
                    placeholder="Enter State Code.."
                  /> */}
                  {/* <select
                    className="form-control"
                    id="code"
                    name="code"
                    value={isform.code}
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
                    options={getStateCode.map((sc) => ({
                      value: sc.STATE_CODE,
                      label: sc.STATE_CODE,
                    }))}
                    value={isform.code}
                    onChange={handleStateCodeChange}
                    placeholder="Select State Code"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.code}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    State Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    value={isform.name}
                    onChange={onChangeText}
                    id="name"
                    name="name"
                    placeholder="Enter State Name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.name}</p>
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
          </CForm>
        )}
      </div>

      <br></br>

      <div className="table text-center">
        {checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 && (
          <Datatable
            data={getStates}
            Headfields={[
              {
                key: "Modify",
                label: "MODIFY",
                sorter: false,
                filter: false,
                _style: tablehead,
              },
              { key: "Delete", label: "DELETE", _style: tablehead },
              { key: "ZONE_NAME", _style: tablehead },
              { key: "STATE_CODE", _style: tablehead },
              { key: "STATE_NAME", _style: tablehead },
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
        )}
      </div>
    </div>
  );
}

export default StateList;
