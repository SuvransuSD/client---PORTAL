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
import moment from "moment";
import { Datatable } from "../../../components/Datatable/Datatable";
import "./Style.scss";

function Event_History() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const dispatch = useDispatch();
  const initialvalue = { rocode: "" };
  const getCab = useSelector((state) => state.Amsdashboard.userrelateddata);
  const getCabwithRo = useSelector((state) => state.Amsdashboard.userwithro);
  const getUsers = useSelector((state) => state.portaluser.users);
  const [Isclicked, setclick] = React.useState(false);
  const [isShown, setIsShown] = useState(false);
  const [formError, setformError] = React.useState({});
  const [isform, setForm] = React.useState(initialvalue);
  const [Issubmit, setsubmit] = React.useState(false);
  // console.log(getCabwithRo);

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    dispatch(getuserrelated());
    dispatch(get_protalUser());
  }, []);

  const handleClick = (event) => {
    setIsShown(true);
    setclick(true);
  };

  const webuserClick = (event) => {
    setclick(false);
    setIsShown(false);
  };

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      const newUser = {
        rocode: isform.rocode,
      };
      dispatch(getuser_withrocode(newUser));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};
    if (!values.rocode) {
      err.state = "RO Code is Required";
    }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (getCabwithRo) {
      setIsLoading(false);
    }
  }, [getCabwithRo]);

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">AMS Web Users Report</h3>
      </div>

      <br></br>

      <CRow>
        <CCol lg={4}></CCol>
        <CCol lg={6}>
          <h5>TOTAL NUMBER OF WEB USERS: {getUsers.length} </h5>
        </CCol>
        {/* <CCol lg={7}>
          
          <CButton className='border border-danger text-center p-3 ' onClick={handleClick} >TOTAL NUMBER OF CABINET USERS: {getCab.length} </CButton>
        
        </CCol>
        <CCol lg={1}></CCol> */}
      </CRow>
      <br></br>
      <CRow>
        <CCol lg={7}></CCol>
        <CCol lg={6}>
          {isShown && (
            <div>
              <CRow>
                <CCol lg={6}>
                  <CFormGroup>
                    {/* <CLabel htmlFor="nf-email">RO Code<i style={{color: 'red'}}>*</i></CLabel> */}
                    <CInput
                      type="Name"
                      id="rocode"
                      name="rocode"
                      value={isform.aname}
                      onChange={onChangeText}
                      placeholder="Enter RO Code.."
                    />
                    <CFormText className="help-block text-danger">
                      <p style={{ color: "red" }}>{formError.rocode}</p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol lg={4}>
                  <CButton
                    color="primary "
                    style={{ backgroundColor: "#01a757" }}
                    target="_blank"
                    onClick={submitform}
                  >
                    Filter
                  </CButton>
                </CCol>
              </CRow>
            </div>
          )}
        </CCol>
      </CRow>
      <br></br>

      <div className="table text-center">
        <Datatable
          data={Isclicked ? getCabwithRo : getUsers}
          isLoading={isLoading}
          Headfields={
            Isclicked
              ? [
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
                ]
              : [
                  { key: "USER_NAME", _style: tablehead },
                  { key: "USER_EMAIL", _style: tablehead },
                  { key: "USER_CONTACT_NO", _style: tablehead },
                  { key: "USER_ROLE", _style: tablehead },
                  { key: "USER_STATUS", _style: tablehead },
                  { key: "USER_LAST_LOGIN", _style: tablehead },
                ]
          }
          scopedSlots={{
            USER_IS_ACTIVE: (item) => (
              <td>{item.USER_IS_ACTIVE == 1 ? "Active" : "Inactive"}</td>
            ),
            USER_ROLE: (item) => <td>{item.ROLE_NAME}</td>,
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
            USER_VALIDITY_TO: (item) => (
              <td>
                {item.USER_VALIDITY_TO
                  ? moment(item.USER_VALIDITY_TO).format("DD-MM-YYYY HH:mm:ss")
                  : "-"}
              </td>
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

export default Event_History;
