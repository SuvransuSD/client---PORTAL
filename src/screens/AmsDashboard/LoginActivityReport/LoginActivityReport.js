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
import { get_login_activity } from "../../../actions/AmsDashboard/AmsDashboardAction"; //need to change
import { Datatable } from "../../../components/Datatable/Datatable";
import moment from "moment";
import { CSVLink } from "react-csv";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";

function LoginActivityReport() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    rocode: "",
    region: "",
    state: "",
    dt_to: "",
    dt_from: "",
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const dispatch = useDispatch();
  const gettable = useSelector(
    (state) => state.Amsdashboard.loginactivityreport
  ); //need to change
  // console.log(gettable);

  const [isLoading, setIsLoading] = useState(true);

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(
      checkaccess({
        MODULE_ID: 3,
        AR_ROLE_ID: role,
      })
    );
  }, []);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  //console.log(getsearchtbl);
  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      const newUser = {
        rocode: isform.rocode,
        dt_to: isform.dt_to,
        dt_frm: isform.dt_from,
      };
      dispatch(get_login_activity(newUser));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};
    if (!values.rocode) {
      err.rocode = "RO Code is Required";
    }
    if (!values.dt_from) {
      err.dt_from = "Date from is Required";
    }
    if (!values.dt_to) {
      err.dt_to = "Date to is Required";
    }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
    setIsLoading(true);
  };

  const exportData = gettable.map((item) => ({
    ...item,
    DIFFERENCE: item.DIFFERENCE ? item.DIFFERENCE : "-",
    KEY_TAKEN_AT: item.KEY_TAKEN_AT
      ? moment(item.KEY_TAKEN_AT).format("DD-MM-YYYY HH:mm:ss")
      : "-",
    KEY_RETURNED_AT: item.KEY_RETURNED_AT
      ? moment(item.KEY_RETURNED_AT).format("DD-MM-YYYY HH:mm:ss")
      : "-",
  }));

  useEffect(() => {
    if (gettable) {
      setIsLoading(false);
    }
  }, [gettable]);

  const Headfields = [
    { key: "RO_CODE", label: "RO CODE", _style: tablehead },
    { key: "KEY_NAME", label: "KEY NAME", _style: tablehead },
    { key: "ACT_CODE_TAKEN", label: "ACTIVITY CODE TAKEN", _style: tablehead },
    { key: "KEY_TAKEN_AT", label: "KEY TAKEN OUT", _style: tablehead },
    { key: "KEY_RETURNED_AT", label: "KEY RETURN", _style: tablehead },
    { key: "DIFFERENCE", label: "DURATION OF KEY OUT", _style: tablehead },
    { key: "USER_NAME_TAKEN", label: "TAKEN BY", _style: tablehead },
    { key: "USER_NAME_RETURN", label: "RETURNED BY", _style: tablehead },
  ];

  return (
    <div className="Cbody">
      {checkacc && checkacc[0].AR_RIGHTS == 2 && (
        <CForm method="post" onSubmit={submitform}>
          <CRow>
            <CCol lg={9}>
              <div className="Header mb-5">
                <h3 className="Header_Text">Audit Report</h3>
              </div>
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
                  id="rocode"
                  name="rocode"
                  value={isform.rocode}
                  onChange={onChangeText}
                  placeholder="Enter RO Code.."
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.rocode}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Valid From</CLabel>
                <CInput
                  type="date"
                  id="dt_from"
                  name="dt_from"
                  onChange={onChangeText}
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.dt_from}</p>
                </CFormText>
              </CFormGroup>
            </CCol>

            <CCol lg={4}>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Valid to</CLabel>
                <CInput
                  type="date"
                  id="dt_to"
                  name="dt_to"
                  onChange={onChangeText}
                />
                <CFormText className="help-block text-danger">
                  <p style={{ color: "red" }}>{formError.dt_to}</p>
                </CFormText>
              </CFormGroup>
            </CCol>
          </CRow>

          <div>
            {/* <CButton color="primary mr-3" target="_blank" onClick={() => setForm(initialvalue)} >Clear</CButton> */}
            <CButton
              color="primary "
              style={{ backgroundColor: "#01a757" }}
              target="_blank"
              onClick={submitform}
            >
              Filter
            </CButton>

            <CRow>
              <CCol lg={11}></CCol>
              <CCol lg={3}>
                <CButton color="light">
                  <CSVLink
                    data={exportData}
                    filename={"Login-Activity-Report.csv"}
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

      <div className="table text-center">
        <Datatable
          isLoading={isLoading}
          data={gettable}
          Headfields={[
            { key: "RO_CODE", label: "RO CODE", _style: tablehead },
            { key: "KEY_NAME", label: "KEY NAME", _style: tablehead },
            {
              key: "ACT_CODE_TAKEN",
              label: "ACTIVITY CODE TAKEN",
              _style: tablehead,
            },
            { key: "ACTIVITY_NAME", label: "ACTIVITY NAME", _style: tablehead },
            { key: "KEY_TAKEN_AT", label: "KEY TAKEN OUT", _style: tablehead },
            { key: "KEY_RETURNED_AT", label: "KEY RETURN", _style: tablehead },
            {
              key: "DIFFERENCE",
              label: "DURATION OF KEY OUT",
              _style: tablehead,
            },
            { key: "USER_NAME_TAKEN", label: "TAKEN BY", _style: tablehead },
            {
              key: "USER_NAME_RETURN",
              label: "RETURNED BY",
              _style: tablehead,
            },
          ]}
          scopedSlots={{
            KEY_NAME: (item) => <td>{item.KEY_NAME ? item.KEY_NAME : "-"}</td>,
            KEY_TAKEN_AT: (item) => (
              <td>
                {item.KEY_TAKEN_AT
                  ? moment(item.KEY_TAKEN_AT).format("DD-MM-YYYY HH:mm:ss")
                  : "-"}
              </td>
            ),
            KEY_RETURNED_AT: (item) => (
              <td>
                {item.KEY_RETURNED_AT
                  ? moment(item.KEY_RETURNED_AT).format("DD-MM-YYYY HH:mm:ss")
                  : "-"}
              </td>
            ),
            USER_NAME_RETURN: (item) => (
              <td>{item.USER_NAME_RETURN ? item.USER_NAME_RETURN : "-"}</td>
            ),
            USER_NAME_TAKEN: (item) => (
              <td>{item.USER_NAME_TAKEN ? item.USER_NAME_TAKEN : "-"}</td>
            ),
            DIFFERENCE: (item) => (
              <td>{item.DIFFERENCE ? item.DIFFERENCE : "-"}</td>
            ),
            ACTIVITY_NAME: (item) => (
              <td>{item.ACTIVITY_NAME ? item.ACTIVITY_NAME : "-"}</td>
            ),
          }}
        />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default LoginActivityReport;
