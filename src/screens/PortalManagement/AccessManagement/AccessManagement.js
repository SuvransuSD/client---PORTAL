import { CButton, CForm, CFormGroup, CFormText, CLabel } from "@coreui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAccess,
  FindAccess,
  get_modules,
} from "../../../actions/PortalmngAction/AccessManagementAction";
import { get_roleAcces } from "../../../actions/PortalmngAction/RoleMngAction";
import { Datatable } from "../../../components/Datatable/Datatable";
import "./Style.scss";
import { checkaccess } from "../../../actions/PortalmngAction/AccessManagementAction";
import jwt_decode from "jwt-decode";
import Select from "react-select";

function AccessManagement() {
  const getsubmodule = [];
  const initialvalue = { name: "", discription: "", role: "" };
  const [Isdispkay, setdisplay] = React.useState(false);
  const [isdisable, setdisable] = React.useState(true);
  const [Isrole, setrole] = React.useState();
  const dispatch = useDispatch();
  const getroles = useSelector((state) => state.roleandaccess.users);
  const AccessManagement = useSelector(
    (state) => state.AccessManagement.modules
  );
  const FindAccessdata = useSelector((state) => state.AccessManagement.access);

  const role = sessionStorage.getItem("role");

  React.useEffect(() => {
    dispatch(get_roleAcces());
    dispatch(get_modules());
    dispatch(
      checkaccess({
        MODULE_ID: 1,
        AR_ROLE_ID: role,
      })
    );
  }, []);

  React.useEffect(() => {
    var mytoken = sessionStorage.getItem("token");
    var decoded = jwt_decode(mytoken);
    console.log("decoded", decoded);
    if (role == 1) {
      setdisable(false);
    }
  }, []);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const ischecked = (mod, id) => {
    var accesdata = [];
    var finaldata = false;

    if (FindAccessdata.length !== 0) {
      accesdata = FindAccessdata.find(function (st) {
        return st.AR_MODULE_ID == mod ? true : false;
      });
      if (accesdata && accesdata.length !== 0) {
        if (accesdata.AR_RIGHTS == id) {
          finaldata = true;
        }
      }
    }
    return finaldata;
  };

  const onchangetext = (mid, value) => {
    const newarr = {
      ROLE_ID: Isrole,
      MODULE_ID: mid,
      RIGHTS: value,
    };
    dispatch(createAccess(newarr));
  };

  const findaccfun = (e) => {
    setrole(e.target.value);
    dispatch(FindAccess({ ROLE_ID: e.target.value }));
    setdisplay(true);
  };

  const onChangeRole = (selectedOption) => {
    setrole(selectedOption.value);
    dispatch(FindAccess({ ROLE_ID: selectedOption.value }));
    setdisplay(true);
  };

  const onChangePermission = (mod, selectedOption) => {
    const newAccess = {
      ROLE_ID: Isrole,
      MODULE_ID: mod,
      RIGHTS: selectedOption.value,
    };
    dispatch(createAccess(newAccess));
  };

  const roleOptions = getroles?.map((role) => ({
    value: role.ROLE_ID,
    label: role.ROLE_NAME,
  }));

  const permissionOptions = [
    { value: "1", label: "Read" },
    { value: "2", label: "Read And Write" },
  ];

  return (
    <div className="pr-5">
      <div className="Header mb-5">
        <h3 className="Header_Text">Manage Access</h3>
      </div>

      <div className="m-4">
        {/* {
          checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 1 && */}
        <CForm method="post" onSubmit={() => {}}>
          <CFormGroup>
            <CLabel htmlFor="nf-email">Role</CLabel>
            {/* <select className="form-control"
              name='role' id="role"
              onChange={(e) => { findaccfun(e) }}
              disabled={isdisable}
            >
              <option value="">Select Role</option>
              {
                getroles ? getroles.map((role) =>
                (
                  <option value={role.ROLE_ID} key={role.ROLE_ID} >{role.ROLE_NAME}</option>
                )
                ) : null
              }
            </select> */}
            <Select
              options={roleOptions}
              onChange={onChangeRole}
              isDisabled={isdisable}
              placeholder="Select Role"
            />
          </CFormGroup>
        </CForm>
        {/* } */}
      </div>

      {Isdispkay ? (
        <div className="table text-center">
          <table style={{ width: "100%" }}>
            <thead style={{ background: "#dae3f3", color: "grey" }}>
              <th>id</th>
              <th>Module</th>
              <th>Permission</th>
            </thead>

            <tbody>
              {AccessManagement &&
                AccessManagement.map((mod, index) => (
                  <tr key={mod.MODULE_NAME}>
                    <td>{mod.MODULE_ID}</td>
                    <td>{mod.MODULE_NAME}</td>
                    <td>
                      {/* <div className="input-group">
                        <select
                          className="custom-select"
                          onChange={(e) => {
                            onchangetext(mod.MODULE_ID, e.target.value);
                          }}
                          name={mod.MODULE_NAME + mod.MODULE_ID}
                          id={mod.MODULE_NAME + mod.MODULE_ID}
                        >
                          <option>Choose Access</option>
                          <option
                            value="1"
                            selected={ischecked(mod.MODULE_ID, 1)}
                          >
                            Read
                          </option>
                          <option
                            value="2"
                            selected={ischecked(mod.MODULE_ID, 2)}
                          >
                            Read And Write
                          </option>
                        </select>
                      </div> */}
                      <Select
                        options={permissionOptions}
                        onChange={(option) =>
                          onChangePermission(mod.MODULE_ID, option)
                        }
                        value={permissionOptions.find((option) =>
                          ischecked(mod.MODULE_ID, option.value)
                        )}
                        placeholder="Choose Access"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>

            <tfoot style={{ background: "#dae3f3", color: "grey" }}>
              <td>id</td>
              <td>Module</td>
              <td>Permission</td>
            </tfoot>
          </table>
        </div>
      ) : null}
      <br></br>
    </div>
  );
}

export default AccessManagement;
