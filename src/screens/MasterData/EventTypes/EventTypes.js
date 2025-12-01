import React, { useState, useEffect } from "react";
import {
  CForm,
  CInput,
  CLabel,
  CFormText,
  CFormGroup,
  CButton,
  CRow,
  CCol
} from "@coreui/react";
import "./EventTypes.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
//import { Headfields, usersData } from './mockEventTypes'
import { useDispatch, useSelector } from "react-redux";
import {
  create_eventtypes,
  update_eventtypes,
  delete_eventtypes,
  get_eventtypes,
} from "../../../actions/MasterDataAction/EventTypesAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import Select from "react-select";

function EventTypes() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = { name: "", etype: "" };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();

  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState(null);

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
  const getEvent = useSelector((state) => state.eventtype.event);

  React.useEffect(() => {
    dispatch(get_eventtypes());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log(isform);

      const newEvent = {
        ID: isupdateid,
        EVENT_NAME: isform.name,
        EVENT_TYPE: isform.etype,
      };
      dispatch(create_eventtypes(newEvent));
    }

    if (Object.values(formError).length === 0 && Isupdate) {
      console.log(isform);

      const updateEvent = {
        ID: isupdateid,
        EVENT_NAME: isform.name,
        EVENT_TYPE: isform.etype,
      };
      dispatch(update_eventtypes(updateEvent));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};

    if (!values.name) {
      err.name = "Event Name is Required";
    }
    if (!values.etype) {
      err.etype = "Event Type is Required";
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
      name: values.EVENT_NAME,
      etype: values.EVENT_TYPE,
    });
    setupdateid(values.ID);
    console.log(values);
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
    const delevent = {
      ID: value.ID,
    };

    if (window.confirm("Delete this event type?")) {
      dispatch(delete_eventtypes(delevent));
    }
  };

  const hidetable = () => {
    if (checkacc && checkacc[0].AR_RIGHTS == 2) {
      return false;
    }
    return true;
  };

  const etypeOptions = [
    { value: "1", label: "Alarm" },
    { value: "2", label: "Exception" },
  ];

  useEffect(() => {
      if (getEvent) {
        setIsLoading(false);
      }
    }, [getEvent]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">Manage Event Types</h3>
      </div>

      <div>
        {checkacc && checkacc[0].AR_RIGHTS && checkacc[0].AR_RIGHTS == 2 && (
          <CForm action="" method="post">
            <CRow>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Event Type Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="Name"
                    id="name"
                    name="name"
                    value={isform.name}
                    onChange={onChange}
                    placeholder="Enter Event Type.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.name}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Choose Event Type<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <select
                    class="form-control"
                    id="etype"
                    name="etype"
                    value={isform.etype}
                    onChange={onChange}
                  >
                    <option>Select Event Type</option>
                    <option value="1">Alarm</option>
                    <option value="2">Exception</option>
                  </select> */}
                  <Select
                    options={etypeOptions}
                    value={etypeOptions.find((option) => option.value === isform.etype)}
                    onChange={(selectedOption) => setForm({ ...isform, etype: selectedOption.value })}
                    placeholder="Select Event Type"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.etype}</p>
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
        <Datatable
          isLoading={isLoading}
          data={getEvent}
          Headfields={[
            {
              key: "Modify",
              label: "MODIFY",
              sorter: false,
              filter: false,
              _style: tablehead,
            },
            { key: "Delete", label: "DELETE", _style: tablehead },
            { key: "EVENT_NAME", _style: tablehead },
            { key: "EVENT_TYPE", _style: tablehead },
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
            EVENT_TYPE: (item) => (
              <td>{item.EVENT_TYPE == 1 ? "Alarm" : "Exception"}</td>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default EventTypes;
