
import { CForm, CInput, CLabel, CFormText, CFormGroup, CButton } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create_roleAccess, get_roleAcces, update_roleAcces } from '../../../actions/PortalmngAction/RoleMngAction'
import { Datatable } from '../../../components/Datatable/Datatable'
import "./Style.scss"
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';

function ManageRoles() {

  const initialvalue = { name: '', discription: '', role: '' }
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const [IsUpdate, setupdate] = React.useState(false);
  const [issavebtn, setsavebtn] = React.useState(false);
  const [isupdateid, setupdateid] = React.useState();
  const dispatch = useDispatch();
  const getUsers = useSelector(
    (state) => state.roleandaccess.users
  );

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const role = sessionStorage.getItem('role');

  React.useEffect(() => {
    dispatch(get_roleAcces());
    dispatch(checkaccess(
      {
        MODULE_ID: 4,
        AR_ROLE_ID: role
      }
    ));
  }, []);

  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      console.log('save');
      const newuser = {
        ROLE_NAME: isform.name,
        ROLE_DESCRIPTION: isform.discription,
        ROLE_STATUS: isform.role,
      }
      dispatch(create_roleAccess(newuser));
    }

    if (Object.values(formError).length === 0 && IsUpdate) {
      console.log(';update');
      const newuser = {
        ROLE_ID: isupdateid,
        ROLE_NAME: isform.name,
        ROLE_DESCRIPTION: isform.discription,
        ROLE_STATUS: isform.role,
      }
      dispatch(update_roleAcces(newuser));
    }

  }, [formError])


  const validateForm = (values) => {
    const err = {};
    if (!values.name) {
      err.name = "Name is Required"
    }
    if (!values.discription) {
      err.discription = "description is Required"
    }
    if (!values.role) {
      err.role = "role is Required"
    }
    return err;
  }


  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
  }

  const updateform = () => {
    setformError(validateForm(isform));
    setupdate(true);
  }

  const updatefunction = (item) => {
    setupdateid(item.ROLE_ID);
    setForm({
      name: item.ROLE_NAME,
      discription: item.ROLE_DESCRIPTION,
      role: item.ROLE_STATUS,
    })
    setsavebtn(true);
  }


  return (
    <div className="c-body">
      <div className='Header'>
        <h3 className='Header_Text'>
          Manage Role
        </h3>
      </div>

      <div className='m-4'>
        {
          checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
          <CForm method="post" onSubmit={submitform}>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Name</CLabel>
              <CInput
                type="text"
                value={isform.name}
                onChange={onChangeText}
                id="name"
                name="name"
                placeholder="Enter name.."
              />
              <CFormText className="help-block text-danger" >
                <p style={{ color: 'red' }}>

                  {formError.name}
                </p>
              </CFormText>
            </CFormGroup>

            <CFormGroup>
              <CLabel htmlFor="nf-email">Description</CLabel>
              <CInput
                type="text"
                value={isform.discription}
                onChange={onChangeText}
                id="discription"
                name="discription"
                placeholder="Enter description.."
              />
              <CFormText className="help-block text-danger">{formError.discription}</CFormText>
            </CFormGroup>


            <CFormGroup>
              <CLabel htmlFor="nf-email">Status</CLabel>
              <select className="form-control"
                name='role' id="role"
                onChange={onChangeText}
                value={isform.role}>
                <option >Select status</option>
                <option value="1"  >Active</option>
                <option value='2'  >Inactive</option>
              </select>
              <CFormText className="help-block text-danger">{formError.role}</CFormText>
            </CFormGroup>

            <div>

              <CButton color="primary mr-3" target="_blank" onClick={() => setForm(initialvalue)} >Clear</CButton>
              <CButton color="primary " target="_blank" className={issavebtn ? 'd-none' : null} onClick={submitform} >Save</CButton>
              <CButton color="primary " target="_blank" className={issavebtn ? null : 'd-none'} onClick={updateform} >Update</CButton>
            </div>



          </CForm>
        }
      </div>


      <br />


      <div className='table text-center'>
        <Datatable
          data={getUsers}
          // loading  = {'true'}
          Headfields={[
            { key: 'ROLE_ID', _style: { background: '#003366', color: 'white' } },
            { key: 'ROLE_NAME', _style: { background: '#003366', color: 'white' } },
            { key: 'ROLE_DESCRIPTION', _style: { background: '#003366', color: 'white' } },
            {
              key: 'ROLE_STATUS',
              sorter: false,
              filter: false,
              _style: { background: '#003366', color: 'white' }
            }
          ]}
          scopedSlots={{
            'ROLE_STATUS':
              (item) => (
                <td>
                  <CButton className="border border-secondary" color="white" onClick={() => updatefunction(item)}
                    disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}>
                    {item.ROLE_STATUS == '1' ? 'active' : 'inactive'}
                  </CButton>
                </td>
              ),
          }} />
      </div>
      <br></br>
    </div>



  )
}

export default ManageRoles









