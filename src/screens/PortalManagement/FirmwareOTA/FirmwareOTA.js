import {
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CCol,
  CSelect
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  create_firmware,
  get_OTA
} from "../../../actions/PortalmngAction/SmtpAction";
import { get_rolist } from "../../../actions/MasterDataAction/RoListAction";
import { get_amscabinet } from "../../../actions/MasterDataAction/AmsCabinetAction";
import "./Style.scss";
import { Datatable } from "../../../components/Datatable/Datatable";
import moment from "moment";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";

function Firmware() {
  const tablehead = { background: "#dae3f3", color: "grey" };
  const initialvalue = {
    updatedvno: "",
    updatetime: "",
    package: "",
    cabinet: "",
    reason: ""
  };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [isVersionFile, setVersionFile] = React.useState(false);
  const dispatch = useDispatch();
  const [isCab, setCab] = React.useState([]);
  const getCabinet = useSelector((state) => state.amscabinet.cabinet);

  const getOTA = useSelector((state) => state.firmware.firmwaredata);

  //console.log(getOTA);

  //const getRo = useSelector((state) => state.rolist.ro);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const onupload = (e) => {
    setVersionFile(e.target.files[0]);
  };
  const onrefresh = () => { };

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(get_OTA());
    dispatch(
      checkaccess({
        MODULE_ID: 1,
        AR_ROLE_ID: role
      })
    );
    //dispatch(get_rolist());
    dispatch(get_amscabinet());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      let _newform = new FormData();

      _newform.append("updatedvno", isform.updatedvno);
      _newform.append("updatetime", isform.updatetime);
      _newform.append("package", isVersionFile);
      _newform.append("cabinet", isCab.key);
      _newform.append("reason", isform.reason);

      dispatch(create_firmware(_newform, onrefresh));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};
    if (!values.updatedvno) {
      err.updatedvno = "Name is Required";
    }
    if (!values.updatetime) {
      err.updatetime = "Username is Required";
    }
    if (!isVersionFile) {
      err.package = "Package is Required";
    }
    if (!isCab.key) {
      err.cabinet = "Package is Required";
    }
    if (!values.reason) {
      err.reason = "Reason is Required";
    }
    return err;
  };

  function onChangeRo(e) {
    setCab({ key: Array.from(e.target.selectedOptions, (key) => key.value) });
  }

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
  };

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">Firmware</h3>
      </div>

      <div>
        {checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 && (
          <CForm action="" method="post" onSubmit={submitform}>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Updated Version No.<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="text"
                    id="updatedvno"
                    name="updatedvno"
                    onChange={onChangeText}
                    placeholder="Enter Version no .."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.updatedvno}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Update Time<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="date"
                    id="updatetime"
                    name="updatetime"
                    onChange={onChangeText}
                    placeholder="Enter Update Time.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.updatetime}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Package<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="file"
                    id="package"
                    name="package"
                    onChange={onupload}
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.package}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Reason<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <textarea
                    className="form-control"
                    id="reason"
                    name="reason"
                    rows={4}
                    cols={40}
                    placeholder="Enter Reasons.."
                    onChange={onChangeText}
                  />

                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.reason}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol lg={4}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Select Cabinets<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CSelect
                    required
                    custom
                    name="key"
                    id="cabinet"
                    value={isCab.key}
                    onChange={onChangeRo}
                    multiple={true}
                  >
                    {getCabinet.map((data) => (
                      <option
                        value={data.CABINET_IP_ADDR}
                        key={data.CABINET_IP_ADDR}
                      >
                        {data.CABINET_CODE}
                      </option>
                    ))}
                  </CSelect>
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.cabinet}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>
            <div>
              <CButton
                color="primary mr-3"
                target="_blank"
                style={{ backgroundColor: "#01a757" }}
                onClick={submitform}
              >
                Upload
              </CButton>
              <CButton
                color="primary"
                target="_blank"
                style={{ backgroundColor: "grey" }}
                onClick={() => {
                  setForm(initialvalue);
                }}
              >
                Clear
              </CButton>
            </div>
          </CForm>
        )}
      </div>

      <br></br>

      <div className="table text-center">
        <Datatable
          data={getOTA}
          Headfields={[
            {
              key: "CABINET_CODE",
              sorter: false,
              filter: false,
              _style: tablehead,
              label: "CABINETS"
            },
            {
              key: "FIRMWARE_VERSION",
              label: "FIRMWARE VERSION",
              _style: tablehead
            }
            // { key: "MODIFIED_AT", _style: tablehead }
          ]}
          scopedSlots={{
            // MODIFIED_AT: (item) => (
            //   <td>
            //     {item.MODIFIED_AT
            //       ? moment(item.MODIFIED_AT).format("DD-MM-YYYY")
            //       : "-"}
            //   </td>
            // ),
            FIRMWARE_VERSION: (item) => (
              <td>
                {item.FIRMWARE_VERSION
                  ? item.FIRMWARE_VERSION
                  : "-"}
              </td>
            )
          }}
        />
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

export default Firmware;
