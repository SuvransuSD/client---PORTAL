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
import "./Style.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
import { useDispatch, useSelector } from "react-redux";
import {
  create_protalUser,
  delete_protalUser,
  get_protalUser,
  update_protalUser,
} from "../../../actions/PortalmngAction/PortalUserAction";
import { get_roleAcces } from "../../../actions/PortalmngAction/RoleMngAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import moment from "moment";
import validator from "validator";
import Select from "react-select";

function PortalUser() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    name: "",
    role: "",
    password: "",
    email: "",
    phoneno: "",
    status: "",
    validity_from: "",
    validity_to: "",
    status: "",
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [Isupdate, setupdate] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const [showsavebtn, setshowsavebtn] = React.useState(false);
  const [showupdatebtn, setshowupdatebtn] = React.useState(true);
  const [showpassword, setshowpassword] = React.useState(true);
  const dispatch = useDispatch();
  const getUsers = useSelector((state) => state.portaluser.users);
  const getroles = useSelector((state) => state.roleandaccess.users);
  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const [isLoading, setIsLoading] = useState(true);

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(
      checkaccess({
        MODULE_ID: 1,
        AR_ROLE_ID: role,
      })
    );
    dispatch(get_protalUser());
    dispatch(get_roleAcces());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      var date1 = new Date(isform.validity_from);
      var date2 = new Date(isform.validity_to);
      var diffDays = date2.getDate() - date1.getDate();

      const newUser = {
        USER_NAME: isform.name,
        USER_ROLE: isform.role,
        USER_PASSWORD: isform.password,
        USER_EMAIL: isform.email,
        USER_CONTACT_NO: isform.phoneno,
        USER_FROM_DATE: isform.validity_from,
        USER_TO_DATE: isform.validity_to,
        USER_STATUS: isform.status,
      };
      dispatch(create_protalUser(newUser));
    }

    if (Isupdate) {
      // var date12 = new Date(isform.validity_from);
      // var date22 = new Date(isform.validity_to);
      // var diffDays2 = date22.getDate() - date12.getDate();

      const updUser = {
        USER_ID: isupdateid,
        USER_NAME: isform.name,
        USER_ROLE: parseInt(isform.role),
        //USER_PASSWORD: isform.password,
        USER_EMAIL: isform.email,
        USER_CONTACT_NO: isform.phoneno,
        USER_FROM_DATE: isform.validity_from,
        USER_TO_DATE: isform.validity_to,
        USER_STATUS: isform.status,
      };
      console.log(updUser);
      dispatch(update_protalUser(updUser));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};
    if (
      validator.isStrongPassword(values.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      console.log("Strong password");
    } else {
      err.password = "Password not strong";
    }
    if (!values.name) {
      err.name = "Name is Required";
    }
    if (/[ `!@#$ %^&*()_+\-=\[\]{};':"\\|,.<>\/? ~]/.test(values.name)) {
      err.name = "Special Characters are not allowed";
    }
    if (!values.role) {
      err.role = "Role is Required";
    }

    if (!values.password) {
      err.password = "Password is Required";
    }
    if (!values.email) {
      err.email = "Email is Required";
    }
    if (!values.phoneno) {
      err.phoneno = "Phone no. is Required";
    }
    if (!values.validity_from) {
      err.validity_from = "Valid from is Required";
    }
    if (!values.validity_to) {
      err.validity_to = "Valid to is Required";
    }
    if (!values.status) {
      err.status = "Status is Required";
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
      email: values.USER_EMAIL,
      name: values.USER_NAME,
      phoneno: values.USER_CONTACT_NO,
      role: values.USER_ROLE,
      validity_from: values.USER_FROM_DATE,
      validity_to: values.USER_TO_DATE,
      status: values.USER_STATUS,
      password: values.USER_PASSWORD,
    });
    setupdateid(values.USER_ID);
    setshowsavebtn(true);
    setshowupdatebtn(false);
    setshowpassword(false);
  };

  const updateform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setupdate(true);
    setIsLoading(true);
  };

  const statusOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "Inactive" },
  ];

  const deleteform = (value) => {
    const newUser = {
      USER_ID: value.USER_ID,
    };

    if (window.confirm("Delete this user?")) {
      dispatch(delete_protalUser(newUser));
    }
  };

  useEffect(() => {
    if (getUsers) {
      setIsLoading(false);
    }
  }, [getUsers]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">Portal User</h3>
      </div>

      <div>
        {checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 && (
          <CForm method="post" onSubmit={submitform}>
            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    id="name"
                    name="name"
                    value={isform.name}
                    onChange={onChangeText}
                    placeholder="Enter name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.name}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Role<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <select
                    className="form-control"
                    onChange={onChangeText}
                    name="role"
                    id="role"
                    value={isform.role}
                  >
                    <option>Select role</option>
                    {getroles
                      ? getroles.map((role) => (
                          <option value={role.ROLE_ID} key={role.ROLE_ID}>
                            {role.ROLE_NAME}
                          </option>
                        ))
                      : null}
                  </select>
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.role}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Email<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="email"
                    id="email"
                    name="email"
                    value={isform.email}
                    placeholder="Enter email.."
                    onChange={onChangeText}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.email}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Mobile no.<i style={{ color: "red" }}>*</i>
                  </CLabel>
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
                    <p style={{ color: "red" }}>{formError.phoneno}</p>
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
                    id="validity_from"
                    name="validity_from"
                    value={isform.validity_from}
                    onChange={onChangeText}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.validity_to}</p>
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
                    id="validity_to"
                    name="validity_to"
                    value={isform.validity_to}
                    onChange={onChangeText}
                  />

                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.validity_from}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              {showpassword ? (
                <CCol lg={4}>
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">
                      Password<i style={{ color: "red" }}>*</i>
                    </CLabel>
                    <CInput
                      type="Password"
                      id="password"
                      name="password"
                      placeholder="Enter password .."
                      onChange={onChangeText}
                      value={isform.password}
                    />
                    <CFormText className="help-block text-danger">
                      <p style={{ color: "red" }}>{formError.password}</p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
              ) : null}
              {/* <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Password</CLabel>
                <CInput
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

            </CCol> */}
            </CRow>

            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Status<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <select
                    className="form-control"
                    name="status"
                    id="status"
                    onChange={onChangeText}
                    value={isform.status}
                  >
                    <option>Select status</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </select> */}
                  <Select
                    options={statusOptions}
                    onChange={(selectedOption) =>
                      onChangeText("role", selectedOption.value)
                    }
                    value={statusOptions.find(
                      (option) => option.value === isform.status
                    )}
                    placeholder="Select Status"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.status}</p>
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
                color="primary "
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
          data={getUsers}
          Headfields={[
            { key: "Modify", sorter: false, filter: false, _style: tablehead },
            { key: "Delete", _style: tablehead },
            { key: "USER_NAME", _style: tablehead },
            // { key: 'USER_PASSWORD', _style: tablehead },
            { key: "USER_EMAIL", _style: tablehead },
            { key: "USER_CONTACT_NO", _style: tablehead },
            { key: "USER_ROLE", _style: tablehead },
            { key: "USER_STATUS", _style: tablehead },
            { key: "USER_LAST_LOGIN", _style: tablehead },
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
            USER_ROLE: (item) => (
              <td>
                <CButton className="border border-secondary" color="white">
                  {item.ROLE_NAME}
                </CButton>
              </td>
            ),
            USER_STATUS: (item) => (
              <td>{item.USER_STATUS == 1 ? "Active" : "Inactive"}</td>
            ),
            USER_LAST_LOGIN: (item) => (
              <td>
                {item.USER_LAST_LOGIN
                  ? moment(item.USER_LAST_LOGIN).format("DD-MM-YYYY HH:mm:ss")
                  : "-"}
              </td>
            ),
            // 'Validity' : (item)=>(
            //   <td>
            //     {
            //       new Date(item.USER_FROM_DATE) - new Date(item.USER_TO_DATE)

            //      }

            //   </td>
            //   )
          }}
        />
      </div>
    </div>
  );
}

export default PortalUser;
