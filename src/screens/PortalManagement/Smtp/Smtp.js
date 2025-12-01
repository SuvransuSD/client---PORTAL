import { CButton, CForm, CFormGroup, CFormText, CInput, CLabel } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { create_SmtpAccess } from '../../../actions/PortalmngAction/SmtpAction';
import "./Style.scss"
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';

function Smtp() {
  const initialvalue = { name: '', username: '', password: '', port: '', host: '' }
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [Issubmit, setsubmit] = React.useState(false);
  const dispatch = useDispatch();

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  console.log('checkacc', checkacc);
  const role = sessionStorage.getItem('role');

  React.useEffect(() => {
    dispatch(checkaccess(
      {
        MODULE_ID: 1,
        AR_ROLE_ID: role
      }
    ));
  }, [])

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };


  React.useEffect(() => {
    if (Object.values(formError).length === 0 && Issubmit) {
      const smtpcall = {
        SMTP_NAME: isform.name.trim(),
        SMTP_HOST: isform.host.trim(),
        SMTP_USERNAME: isform.username.trim(),
        SMTP_PASSWORD: isform.password.trim(),
        SMTP_PORT: isform.port.trim(),

      }
      dispatch(create_SmtpAccess(smtpcall));
    }
  }, [formError])


  const validateForm = (values) => {
    const err = {};
    if (!values.name) {
      err.name = "Name is Required"
    }
    if (!values.username) {
      err.username = "Username is Required"
    }
    if (!values.password) {
      err.password = "Password is Required"
    }
    if (!values.port) {
      err.port = "Port is Required"
    }
    if (!values.host) {
      err.host = "Host is Required"
    }
    return err;
  }

  const submitform = (event) => {
    event.preventDefault();
    setformError(validateForm(isform));
    setsubmit(true);
  }

  return (
    <div className="Cbody">
      <div className='Header mb-5'>
        <h3 className='Header_Text'>
          Smtp
        </h3>
      </div>

      <div>
        {
          checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
          <CForm action="" method="post" onSubmit={submitform}>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Name<i style={{ color: 'red' }}>*</i></CLabel>
              <CInput
                type="Name"
                id="name"
                name="name"
                onChange={onChangeText}
                placeholder="Enter name.."
              />
              <CFormText className="help-block text-danger" >
                <p style={{ color: 'red' }}>

                  {formError.name}
                </p>
              </CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-email">UserName<i style={{ color: 'red' }}>*</i></CLabel>
              <CInput
                type="text"
                id="username"
                name="username"
                onChange={onChangeText}
                placeholder="Enter username.."
              />
              <CFormText className="help-block text-danger" >
                <p style={{ color: 'red' }}>

                  {formError.username}
                </p>
              </CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Password<i style={{ color: 'red' }}>*</i></CLabel>
              <CInput
                type="Password"
                id="password"
                name="password"
                onChange={onChangeText}
                placeholder="Enter password.."
              />
              <CFormText className="help-block text-danger" >
                <p style={{ color: 'red' }}>

                  {formError.password}
                </p>
              </CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Port<i style={{ color: 'red' }}>*</i></CLabel>
              <CInput
                type="text"
                id="port"
                name="port"
                onChange={onChangeText}
                placeholder="Enter Port.."
              />
              <CFormText className="help-block text-danger" >
                <p style={{ color: 'red' }}>

                  {formError.port}
                </p>
              </CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Host<i style={{ color: 'red' }}>*</i></CLabel>
              <CInput
                type="text"
                id="host"
                name="host"
                onChange={onChangeText}
                placeholder="Enter host.."
              />
              <CFormText className="help-block text-danger" >
                <p style={{ color: 'red' }}>

                  {formError.host}
                </p>
              </CFormText>
            </CFormGroup>


            <div>

              <CButton color="primary mr-3" target="_blank" style={{ "backgroundColor": "#01a757" }} onClick={submitform}>Save</CButton>
              <CButton color="primary" target="_blank" style={{ "backgroundColor": "grey" }} onClick={() => { setForm(initialvalue) }}>Clear</CButton>

            </div>



          </CForm>
        }
      </div>

    </div>
  )
}

export default Smtp