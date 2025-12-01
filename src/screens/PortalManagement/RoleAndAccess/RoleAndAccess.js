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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  create_roleAccess,
  get_roleAcces,
  update_roleAcces,
} from "../../../actions/PortalmngAction/RoleMngAction";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import { Datatable } from "../../../components/Datatable/Datatable";
import "./style.scss";
import Select from "react-select";

function RoleAndAccess() {
  const initialvalue = { name: "", discription: "", role: "" };
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [IsUpdate, setupdate] = React.useState(false);
  const [issavebtn, setsavebtn] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const dispatch = useDispatch();
  const getUsers = useSelector((state) => state.roleandaccess.users);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(
      checkaccess({
        MODULE_ID: 1,
        AR_ROLE_ID: role,
      })
    );
  }, []);

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  // [] is used so that it runs just once before it re-renders
  React.useEffect(() => {
    dispatch(get_roleAcces());
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log("save");
      const newuser = {
        ROLE_NAME: isform.name,
        ROLE_DESCRIPTION: isform.discription,
        ROLE_STATUS: isform.role,
      };
      dispatch(create_roleAccess(newuser));
    }

    if (Object.values(formError).length === 0 && IsUpdate) {
      console.log("update");
      const newuser = {
        ROLE_ID: isupdateid,
        ROLE_NAME: isform.name,
        ROLE_DESCRIPTION: isform.discription,
        ROLE_STATUS: isform.role,
      };
      dispatch(update_roleAcces(newuser));
    }
  }, [formError]);

  const validateForm = (values) => {
    const err = {};
    if (!values.name) {
      err.name = "Name is Required";
    }
    if (!values.discription) {
      err.discription = "Description is Required";
    }
    if (!values.role) {
      err.role = "Role is Required";
    }
    return err;
  };

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
  };

  const updateform = () => {
    setformError(validateForm(isform));
    setupdate(true);
  };

  const updatefunction = (item) => {
    setupdateid(item.ROLE_ID);
    setForm({
      name: item.ROLE_NAME,
      discription: item.ROLE_DESCRIPTION,
      role: item.ROLE_STATUS,
    });
    setsavebtn(true);
  };

  const statusOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "Inactive" },
  ];

  return (
    <div className="Cbody">
      <div className="Header mb-5">
        <h3 className="Header_Text">Manage Role</h3>
      </div>

      <div className="m-4">
        {checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 && (
          <CForm method="post" onSubmit={submitform}>
            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Name<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="text"
                    value={isform.name}
                    onChange={onChangeText}
                    id="name"
                    name="name"
                    placeholder="Enter name.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.name}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Description<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  <CInput
                    type="text"
                    value={isform.discription}
                    onChange={onChangeText}
                    id="discription"
                    name="discription"
                    placeholder="Enter description.."
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.discription}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg={12}>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">
                    Status<i style={{ color: "red" }}>*</i>
                  </CLabel>
                  {/* <select className="form-control"
                    name='role' id="role"
                    onChange={onChangeText}
                    value={isform.role}>
                    <option >Select status</option>
                    <option value="1"  >Active</option>
                    <option value='2'  >Inactive</option>
                  </select> */}
                  <Select
                    options={statusOptions}
                    onChange={(selectedOption) =>
                      onChangeText("role", selectedOption.value)
                    }
                    value={statusOptions.find(
                      (option) => option.value === isform.role
                    )}
                    placeholder="Select Status"
                  />
                  <CFormText className="help-block text-danger">
                    <p style={{ color: "red" }}>{formError.role}</p>
                  </CFormText>
                </CFormGroup>
              </CCol>
            </CRow>

            <div>
              <CButton
                color="primary mr-3"
                target="_blank"
                style={{ backgroundColor: "grey" }}
                onClick={() => setForm(initialvalue)}
              >
                Clear
              </CButton>
              <CButton
                color="primary "
                target="_blank"
                style={{ backgroundColor: "#01a757" }}
                className={issavebtn ? "d-none" : null}
                onClick={submitform}
              >
                Save
              </CButton>
              <CButton
                color="primary "
                target="_blank"
                className={issavebtn ? null : "d-none"}
                onClick={updateform}
              >
                Update
              </CButton>
            </div>
          </CForm>
        )}
      </div>

      <br />

      <div className="table text-center">
        <Datatable
          data={getUsers}
          // loading  = {'true'}
          Headfields={[
            {
              key: "ROLE_ID",
              _style: { background: "#dae3f3", color: "grey" },
            },
            {
              key: "ROLE_NAME",
              _style: { background: "#dae3f3", color: "grey" },
            },
            {
              key: "ROLE_DESCRIPTION",
              _style: { background: "#dae3f3", color: "grey" },
            },
            {
              key: "ROLE_STATUS",
              sorter: false,
              filter: false,
              _style: { background: "#dae3f3", color: "grey" },
            },
          ]}
          scopedSlots={{
            ROLE_STATUS: (item) => (
              <td>
                <CButton
                  className="border border-secondary"
                  color="white"
                  onClick={() => updatefunction(item)}
                  disabled={
                    checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2
                      ? false
                      : true
                  }
                >
                  {item.ROLE_STATUS == "1" ? "active" : "inactive"}
                </CButton>
              </td>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default RoleAndAccess;
