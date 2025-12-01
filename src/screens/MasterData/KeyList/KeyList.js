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
import "./KeyList.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
//import { Headfields, usersData } from './mockKeyList'
import { useDispatch, useSelector } from "react-redux";
import {
  create_keylist,
  update_keylist,
  delete_keylist,
  get_keylist,
} from "../../../actions/MasterDataAction/KeyListAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import Select from "react-select";

function KeyList() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    kname: "",
    desc: "",
    color: "",
    door: "",
    strip: "",
    position: "",
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();

  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const dispatch = useDispatch();
  const getKey = useSelector((state) => state.keylist.keyl);

  React.useEffect(() => {
    dispatch(get_keylist());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log("create data", isform);

      const newKey = {
        KEY_ID: isupdateid,
        KEY_NAME: isform.kname,
        KEY_DESCRIPTION: isform.desc,
        KEY_COLOR: isform.color,
        // POSITION: "D" + isform.door + "-S" + isform.strip + "-P" + isform.position,
        KEY_DOOR_NO: isform.door,
        KEY_STRIP_NO: isform.strip,
        KEY_SLOT_NO: isform.position,
      };
      dispatch(create_keylist(newKey));
    }

    if (Object.values(formError).length === 0 && Isupdate) {
      console.log(isform);

      const updateKey = {
        KEY_ID: isupdateid,
        KEY_NAME: isform.kname,
        KEY_DESCRIPTION: isform.desc,
        KEY_COLOR: isform.color,
        // POSITION: "D" + isform.door + "-S" + isform.strip + "-P" + isform.position,
        KEY_DOOR_NO: isform.door,
        KEY_STRIP_NO: isform.strip,
        KEY_SLOT_NO: isform.position,
      };
      dispatch(update_keylist(updateKey));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};

    if (!values.kname) {
      err.kname = "Key Name is Required";
    }
    if (!values.desc) {
      err.desc = "Key Description is Required";
    }
    if (!values.color) {
      err.color = "Color is Required";
    }
    if (!values.door) {
      err.door = "Door is Required";
    }
    if (!values.strip) {
      err.strip = "Strip is Required";
    }
    if (!values.position) {
      err.position = "Position is Required";
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
      kname: values.KEY_NAME,
      desc: values.KEY_DESCRIPTION,
      color: values.KEY_COLOR,
      door: values.KEY_DOOR_NO,
      strip: values.KEY_STRIP_NO,
      position: values.KEY_SLOT_NO,
    });
    setupdateid(values.KEY_ID);

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
    if (window.confirm("Delete this key?")) dispatch(delete_keylist(value));
  };

  const hidetable = () => {
    if (checkacc && checkacc[0].AR_RIGHTS == 2) {
      return false;
    }
    return true;
  };

  const colorOptions = [
    { label: "Green", value: "Green" },
    { label: "Yellow", value: "Yellow" },
    { label: "LightBlue", value: "LightBlue" },
    { label: "Orange", value: "Orange" },
    { label: "DarkBlue", value: "DarkBlue" },
    { label: "Pink", value: "Pink" },
    { label: "Red", value: "Red" },
    { label: "Grey", value: "Grey" },
  ];

  const doorOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const stripOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const positionOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
  ];

  useEffect(() => {
      if (getKey) {
        setIsLoading(false);
      }
    }, [getKey]);

  return (
    <div className="Cbody">
      <div>
        <div className="Header mb-5">
          <h3 className="Header_Text">Manage Key</h3>
        </div>
        {checkacc && checkacc[0].AR_RIGHTS == 2 && (
          <CForm action="" method="post">
            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Key Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    id="kname"
                    name="kname"
                    value={isform.kname}
                    onChange={onChange}
                    placeholder="Enter Key Name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.kname}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Key Description<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    id="desc"
                    name="desc"
                    value={isform.desc}
                    onChange={onChange}
                    placeholder="Enter Key Description.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.desc}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Color<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <CSelect
                    required
                    custom
                    name="color"
                    id="color"
                    className={isform.color}
                    value={isform.color}
                    onChange={onChange}
                  >
                    <option value="">Select color</option>
                    <option value="Green" className="Green">
                      Green
                    </option>
                    <option value="Yellow" className="Yellow">
                      Yellow
                    </option>
                    <option value="LightBlue" className="LightBlue">
                      LightBlue
                    </option>
                    <option value="Orange" className="Orange">
                      Orange
                    </option>
                    <option value="DarkBlue" className="DarkBlue">
                      DarkBlue
                    </option>
                    <option value="Pink" className="Pink">
                      Pink
                    </option>
                    <option value="Red" className="Red">
                      Red
                    </option>
                    <option value="Grey" className="Grey">
                      Grey
                    </option>
                  </CSelect> */}
                  <Select
                    name="color"
                    id="color"
                    value={colorOptions.find((option) => option.value === isform.color)}
                    onChange={(selectedOption) =>
                      setForm({ ...isform, color: selectedOption.value })
                    }
                    options={colorOptions}
                    placeholder="Select Color"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.color}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CFormGroup>
              <CLabel htmlFor="nf-email">
                Key Position<i style={{ color: "red" }}>*</i>
              </CLabel>
            </CFormGroup>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  {/* <select
                    class="form-control"
                    id="door"
                    name="door"
                    value={isform.door}
                    onChange={onChange}
                  >
                    <option>Select Door</option>
                    <option>1</option>
                  </select> */}
                  <Select
                    name="door"
                    id="door"
                    value={doorOptions.find((option) => option.value === isform.door)}
                    onChange={(selectedOption) =>
                      setForm({ ...isform, door: selectedOption.value })
                    }
                    options={doorOptions}
                    placeholder="Select Door"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.door}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  {/* <select
                    class="form-control"
                    id="strip"
                    name="strip"
                    value={isform.strip}
                    onChange={onChange}
                  >
                    <option>Select Strip</option>
                    <option>1</option>
                    <option>2</option>
                  </select> */}
                  <Select
                    name="strip"
                    id="strip"
                    value={stripOptions.find((option) => option.value === isform.strip)}
                    onChange={(selectedOption) =>
                      setForm({ ...isform, strip: selectedOption.value })
                    }
                    options={stripOptions}
                    placeholder="Select Strip"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.strip}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  {/* <select
                    class="form-control"
                    id="position"
                    name="position"
                    value={isform.position}
                    onChange={onChange}
                  >
                    <option>Select Position</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                  </select> */}
                  <Select
                    name="position"
                    id="position"
                    value={positionOptions.find((option) => option.value === isform.position)}
                    onChange={(selectedOption) =>
                      setForm({ ...isform, position: selectedOption.value })
                    }
                    options={positionOptions}
                    placeholder="Select Position"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.position}</p>
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
      {/* <div className='Header mb-5'>
                <h3 className='Header_Text'>
                    Key Lists
                </h3>
            </div> */}

      <div className="table text-center">
        <Datatable
          data={getKey}
          Headfields={[
            {
              key: "Modify",
              label: "MODIFY",
              sorter: false,
              filter: false,
              _style: tablehead,
            },
            { key: "Delete", label: "DELETE", _style: tablehead },
            { key: "KEY_NAME", _style: tablehead },
            { key: "KEY_DESCRIPTION", _style: tablehead },
            { key: "KEY_COLOR", _style: tablehead },
            { key: "KEY_SLOT_NO", _style: tablehead },
            { key: "KEY_DOOR_NO", _style: tablehead },
            { key: "KEY_STRIP_NO", _style: tablehead },
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

export default KeyList;
