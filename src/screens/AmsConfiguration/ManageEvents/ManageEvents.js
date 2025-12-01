import React, { useState, useEffect } from 'react'
import { CForm, CInput, CLabel, CFormText, CFormGroup, CButton, CRow, CCol } from '@coreui/react'
import "./Style.scss"
import { Datatable } from '../../../components/Datatable/Datatable'
//import { Headfields, usersData } from './mockEventTypes'
import { useDispatch, useSelector } from 'react-redux';
import { create_manage_events_form, update_manage_events_form, delete_eventtypes, get_manage_events_form } from '../../../actions/AmsConfig/ManageEventsAction';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';

const ManageEvents = () => {

  const dispatch = useDispatch();

  const tablehead = { background: '#dae3f3', color: 'grey' };
  const initialvalue = { name: '', etype: '' };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const [modifyKey, setModifyKey] = useState(false)

  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const role = sessionStorage.getItem('role');

  React.useEffect(() => {
    dispatch(checkaccess(
      {
        MODULE_ID: 4,
        AR_ROLE_ID: role
      }
    ));
  }, [])


  const getEvent = useSelector((state) => state.eventtype.event);
  console.log("event", getEvent);
  const { seletedRo } = useSelector((state) => state.AmsConfigSidebar);

  useEffect(() => {
    dispatch(get_manage_events_form(seletedRo.roId));
    return () => {
      setForm(initialvalue)
      setModifyKey(false)
    }
  }, [])

  useEffect(() => {
    dispatch(get_manage_events_form(seletedRo.roId));

    return () => {
      setForm(initialvalue)
      setModifyKey(false)
    }
  }, [seletedRo])

  const resetForm = () => {
    setModifyKey(false)
    setForm(initialvalue)
  }

  const updateFormCallback = () => {
    dispatch(get_manage_events_form(seletedRo.roId));
    resetForm();
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };


  const submitform = (event) => {
    event.preventDefault();
    const errors = validateForm(isform);
    setformError(errors);
    setsubmit(true);

    if (Object.keys(errors).length === 0) {

      if (modifyKey) {
        const updateEvent = {
          ID: isupdateid,
          EVENT_NAME: isform.name,
          EVENT_TYPE: isform.etype,
        }
        dispatch(update_manage_events_form(updateEvent, updateFormCallback))
      } else {
        const newEvent = {
          ID: isupdateid,
          EVENT_NAME: isform.name,
          EVENT_TYPE: isform.etype,
        }
        dispatch(create_manage_events_form(newEvent, updateFormCallback))
      }
    }
  }


  const validateForm = (values) => {
    const err = {};

    if (!values.name) {
      err.name = "Event Name is Required"
    }
    if (!values.etype) {
      err.etype = "Event Type is Required"
    }
    return err;
  }


  const updatefunction = (values) => {
    setForm({
      name: values.EVENT_NAME,
      etype: values.EVENT_TYPE,
    })
    setupdateid(values.ID);

    setshowsavebtn(true);
    setshowupdatebtn(false);
  }

  // const updateform = (event) => {
  //   event.preventDefault();
  //   setformError(validateForm(isform));
  //   setupdate(true);
  // }

  const deleteform = (value) => {
    dispatch(delete_eventtypes(value));
  }

  // const hidetable = () => {
  //   if (checkacc && checkacc[0].AR_RIGHTS == 2) { return false }
  //   return true
  // }

  return (
    <div className="Cbody">

      <div className='Header mb-5'>
        <h3 className='Header_Text'>
          Manage Event Types
        </h3>
      </div>

      <div>
        {
          checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
          <CForm action="" method="post">
            <CRow>
              <CCol xs="7">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Event Type Name</CLabel>
                  <CInput
                    type="Name"
                    id="name"
                    name="name"
                    value={isform.name}
                    onChange={onChange}
                    placeholder="Enter Event Type.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.name}</p></CFormText>
                </CFormGroup>
              </CCol>

              <CCol xs="7">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Choose Event Type</CLabel>
                  <select class="form-control"
                    id="etype"
                    name="etype"
                    value={isform.etype}
                    onChange={onChange}>
                    <option>Select Event Type</option>
                    <option value='1'>Alarm</option>
                    <option value='2'>Exception</option>
                  </select>
                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.etype}</p></CFormText>
                </CFormGroup>
              </CCol>
            </CRow>



            <div>

              <CButton color="primary mr-3" style={{ "backgroundColor": "grey" }} target="_blank" onClick={resetForm}>Reset</CButton>
              <CButton color="primary" style={{ "backgroundColor": "#01a757" }} target="_blank" onClick={submitform}>{modifyKey ? "Update" : "Create"}</CButton>

            </div>

          </CForm>
        }
      </div><br></br>
      <div className='table text-center'>
        <Datatable
          data={getEvent}
          Headfields={[
            { key: 'Modify', label: 'MODIFY', sorter: false, filter: false, _style: tablehead },
            { key: 'Delete', label: 'DELETE', _style: tablehead },
            { key: 'EVENT_NAME', _style: tablehead },
            { key: 'EVENT_TYPE', _style: tablehead },
          ]}
          scopedSlots={{
            'Modify': (item) => (
              <td>
                <CButton className="border border-secondary" color="white" onClick={() => updatefunction(item)}
                  disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}
                >
                  Modify
                </CButton>
              </td>
            ),
            'Delete': (item) => (
              <td>
                <CButton className="border border-secondary" color="white" onClick={() => deleteform(item)}
                  disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}
                >
                  Delete
                </CButton>
              </td>
            ),
          }
          } />
      </div><br></br>
    </div>
  )
}

export default ManageEvents