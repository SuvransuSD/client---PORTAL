import React, { useState, useEffect } from 'react'
import { CForm, CInput, CLabel, CFormText, CFormGroup, CButton, CRow, CCol } from '@coreui/react'
import "./Style.scss"
import { Datatable } from '../../../components/Datatable/Datatable'
import { useDispatch, useSelector } from 'react-redux';
import { create_protalUser, delete_protalUser, get_protalUser, update_protalUser } from '../../../actions/PortalmngAction/PortalUserAction';
import { get_roleAcces } from '../../../actions/PortalmngAction/RoleMngAction';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';
import { Create_manage_users_form, delete_manage_users_form, get_manage_users_form, Update_manage_users_form } from '../../../actions/AmsConfig/ManageUsersAction';


const ManageUsers = () => {
  const tablehead = { background: '#dae3f3', color: 'grey' };
  const initialvalue = { name: '', role: '', password: '', email: '', phoneno: "", status: '', validity_from: '', validity_to: '' };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);
  const [showpassword, setshowpassword] = React.useState(true);
  const [modifyKey, setModifyKey] = useState(false)
  const dispatch = useDispatch();
  const getUsers = useSelector(
    (state) => state.manageUsers.manageUsersForm
  );
  const getroles = useSelector(
    (state) => state.roleandaccess.users
  );
  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const { seletedRo } = useSelector(
    (state) => state.AmsConfigSidebar
  );


  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  console.log("seletedRo->", seletedRo);
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    dispatch(checkaccess(
      {
        MODULE_ID: 4,
        AR_ROLE_ID: role
      }
    ));

    dispatch(get_manage_users_form(seletedRo.roId));
    dispatch(get_roleAcces());
    return () => {
      setForm(initialvalue)
      setModifyKey(false)
    }
  }, [])


  //  const _vgetroles = () =>{
  //   dispatch(get_manage_users_form(seletedRo.roId));
  //   setForm(initialvalue);
  //   setupdate(false);
  //  }

  useEffect(() => {
    dispatch(get_manage_users_form(seletedRo.roId));

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
    dispatch(get_manage_users_form(seletedRo.roId));
    resetForm()
  }


  const validateForm = (values) => {
    const err = {};
    if (!values.name) {
      err.name = "Name is Required"
    }
    if (!values.role) {
      err.role = "Role is Required"
    }
    if (!values.password) {
      err.password = "Password is Required"
    }
    if (!values.email) {
      err.email = "Email is Required"
    }
    if (!values.phoneno) {
      err.phoneno = "Phoneno is Required"
    }
    if (!values.validity_from) {
      err.validity_from = "Validity-from is Required"
    }
    if (!values.validity_to) {
      err.validity_to = "Validity-to is Required"
    }
    return err;
  }


  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setshowupdatebtn(true);
    if (Object.values(formError).length === 0) {
      if (modifyKey) {
        const newUser = {
          RO_ID: seletedRo.roId,
          USER_ID: isupdateid,
          USER_NAME: isform.name,
          USER_STATUS: isform.role,
          USER_PASSWORD: isform.password,
          USER_EMAIL: isform.email,
          USER_CONTACT_NO: isform.phoneno,
          USER_FROM_DATE: isform.validity_from,
          USER_TO_DATE: isform.validity_to,

        }

        dispatch(Update_manage_users_form(newUser, updateFormCallback))
      } else {
        var date1 = new Date(isform.validity_from);
        var date2 = new Date(isform.validity_to);
        var diffDays = date2.getDate() - date1.getDate();

        const newUser = {
          RO_ID: seletedRo.roId,
          USER_NAME: isform.name,
          USER_STATUS: isform.role,
          USER_PASSWORD: isform.password,
          USER_EMAIL: isform.email,
          USER_CONTACT_NO: isform.phoneno,
          USER_FROM_DATE: isform.validity_from,
          USER_TO_DATE: isform.validity_to,
        }
        dispatch(Create_manage_users_form(newUser, updateFormCallback))

      }

    }
  }

  const editvalue = (values) => {
    setModifyKey(true);
    setForm({
      email: values.USER_EMAIL,
      name: values.USER_NAME,
      phoneno: values.USER_MOBILE,
      role: values.USER_ROLE_ID,
      validity_from: values.USER_VALIDITY_FROM,
      validity_to: values.USER_VALIDITY_TO,
      password: values.USER_AMS_PIN
    });
    setupdateid(values.USER_ID)

    setshowsavebtn(true);
    setshowupdatebtn(false);
    setshowpassword(false)
  }

  // const updateform = (event) => {
  //   event.preventDefault();
  //   setformError(validateForm(isform));
  //   setupdate(true);
  // }

  const deleteform = (value) => {
    console.log("value", value);
    const deleteuser = {
      RO_ID: seletedRo.roId,
      USER_ID: value.USER_ID
    }
    dispatch(delete_manage_users_form(deleteuser, updateFormCallback));
  }



  return (
    <div className="Cbody">


      <div className='form-border'>
        {
          checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
          <CForm method="post" onSubmit={submitform}>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Name<i style={{ color: 'red' }}>*</i></CLabel>
              <CInput
                id="name"
                name="name"
                value={isform.name}
                onChange={onChangeText}
                placeholder="Enter name.."
              />
              <CFormText className="help-block text-danger">
                <p style={{ color: 'red' }}>{formError.name}</p></CFormText>
            </CFormGroup>

            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Role<i style={{ color: 'red' }}>*</i></CLabel>
                  <select className="form-control" onChange={onChangeText} name='role' id='role' value={isform.role}>
                    <option >Select role</option>

                    <option value={1} key={1} >Adminstrator</option>
                    <option value={2} key={2} >Supervisor</option>

                  </select>
                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.role}</p></CFormText>
                </CFormGroup>

              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="email"
                    id="email"
                    name="email"
                    value={isform.email}
                    placeholder="Enter email.."
                    onChange={onChangeText}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.email}</p></CFormText>
                </CFormGroup>

              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Mobile no.<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="phoneno"
                    name="phoneno"
                    maxLength={10}
                    value={isform.phoneno}
                    placeholder="Enter mobile no.."
                    onChange={onChangeText}
                  />

                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.phoneno}</p></CFormText>
                </CFormGroup>

              </CCol>
            </CRow>

            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Valid From<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="date"
                    id="validity_from"
                    name="validity_from"
                    value={isform.validity_from}
                    onChange={onChangeText}

                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.validity_to}</p></CFormText>
                </CFormGroup>

              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Valid to<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="date"
                    id="validity_to"
                    name="validity_to"
                    value={isform.validity_to}
                    onChange={onChangeText}
                  />

                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.validity_from}</p></CFormText>
                </CFormGroup>

              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Pin<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    maxLength={5}
                    type="Password"
                    id="password"
                    name="password"
                    placeholder="Enter password .."
                    onChange={onChangeText}
                    value={isform.password}

                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: 'red' }}>{formError.password}</p></CFormText>
                </CFormGroup>

              </CCol>
            </CRow>



            <div>

              <CButton color="primary mr-3" style={{ "backgroundColor": "grey" }} target="_blank" onClick={resetForm}>Reset</CButton>
              <CButton color="primary" style={{ "backgroundColor": "#01a757" }} target="_blank" onClick={submitform}>{modifyKey ? "Update" : "Create"}</CButton>

            </div>



          </CForm>
        }

        <br></br>
        {
          console.log(getUsers)
        }

        <div className='table text-center'>
          <Datatable
            data={getUsers}
            loading={true}
            Headfields={[
              { key: 'Modify', label: 'MODIFY', sorter: false, filter: false, _style: tablehead },
              { key: 'Delete', label: 'DELETE', _style: tablehead },
              { key: 'USER_NAME', _style: tablehead },
              // { key: 'USER_PASSWORD', _style: tablehead },
              { key: 'USER_EMAIL', _style: tablehead },
              { key: 'USER_MOBILE', _style: tablehead },
              { key: 'USER_ROLE_ID', _style: tablehead },
              // { key: 'Validity',_style :tablehead},
            ]}
            scopedSlots={{

              'USER_ROLE_ID': (item) => (
                <td>
                  {item.USER_ROLE_ID == 1 ? 'Adminstrator' : "supervisor"}
                </td>
              ),
              'Modify': (item) => (
                <td>
                  <CButton className="border border-secondary" color="white" onClick={() => editvalue(item)}
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
              'USER_ROLE': (item) => (
                <td>
                  <CButton className="border border-secondary" color="white">
                    {item.ROLE_NAME}
                  </CButton>
                </td>
              ),
              // 'Validity' : (item)=>(
              //   <td>
              //     {
              //       new Date(item.USER_FROM_DATE) - new Date(item.USER_TO_DATE)

              //      }

              //   </td>
              //   ) 

            }


            } />
        </div>
      </div>

      <br />
      <br />
      <br />

    </div>
  )
}

export default ManageUsers