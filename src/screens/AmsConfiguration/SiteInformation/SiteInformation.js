import React, { useState, useEffect } from 'react'
import { CButton, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CCol } from '@coreui/react'
import './Style.scss'
import { get_state, get_zone } from '../../../actions/AmsDashboard/GetDropDownAction';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';
import { get_site_info, update_site_info, create_site_info } from '../../../actions/AmsConfig/SiteInformationAction';
import { useDispatch, useSelector } from 'react-redux';

const SiteInformation = () => {

  const dispatch = useDispatch();

  const initialvalue = { siteName: '', street: '', district: '', city: '', zone: '', state: '', areaPincode: '', siteContactNumber: '', siteRegisterNumber: '', siteSupervisorName: '', siteSupervisorEmail: '', }
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [createSiteInfo, setCreateSiteInfo] = useState(false)
  const [Issubmit, setsubmit] = React.useState(false);

  const { siteInforamation } = useSelector(
    (state) => state.siteInfo
  );

  const { seletedRo } = useSelector(
    (state) => state.AmsConfigSidebar
  );

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const getzone = useSelector((state) => state.Ddwreducer.Zone);
  const getstate = useSelector((state) => state.Ddwreducer.States);

  const getstatefun = (e) => {
    dispatch(get_state({ ZONE_ID: e.target.value }));
    onChangeText(e);
  }

  const role = sessionStorage.getItem('role');

  useEffect(() => {
    dispatch(checkaccess(
      {
        MODULE_ID: 4,
        AR_ROLE_ID: role
      }));
    dispatch(get_site_info(seletedRo.roId));
    dispatch(get_zone());

    return () => {
      setForm(initialvalue)
      setCreateSiteInfo(false)
    }
  }, [])

  useEffect(() => {
    if (siteInforamation.length === 0) {
      setCreateSiteInfo(true)
    }

    if (siteInforamation.length > 0) {
      dispatch(get_state({ ZONE_ID: siteInforamation[0].RO_ZONE }));
      const data = {
        siteName: siteInforamation[0].RO_NAME,
        street: siteInforamation[0].RO_STREET,
        district: siteInforamation[0].RO_DISTRICT,
        city: siteInforamation[0].RO_CITY,
        state: siteInforamation[0].RO_STATE_ID,
        areaPincode: siteInforamation[0].RO_PINCODE,
        siteContactNumber: siteInforamation[0].RO_SUPERVISOR_MOBILE,
        siteRegisterNumber: siteInforamation[0].RO_SITE_REGISTER_NO,
        zone: siteInforamation[0].RO_ZONE,
        siteSupervisorName: siteInforamation[0].RO_SUPERVISOR_NAME,
        siteSupervisorEmail: siteInforamation[0].RO_SUPERVISOR_EMAIL
      }
      setForm(data)
    }

    return () => {
      setForm(initialvalue)
      setCreateSiteInfo(false)
    }

  }, [siteInforamation])

  useEffect(() => {
    dispatch(get_site_info(seletedRo.roId));

    return () => {
      setForm(initialvalue)
    }
  }, [seletedRo])


  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const submitform = (event) => {
    event.preventDefault();
    const errors = validateForm(isform)
    setformError(errors)
    if (Object.keys(errors).length === 0) {
      if (createSiteInfo) {
        const postObj = {
          RO_ID: seletedRo.roId,
          RO_NAME: isform.siteName,
          RO_CODE: seletedRo.roCode,
          RO_STATE_ID: isform.state,
          RO_ZONE: isform.zone,
          RO_STREET: isform.street,
          RO_DISTRICT: isform.district,
          RO_CITY: isform.city,
          RO_PINCODE: isform.areaPincode,
          RO_SITE_REGISTER_NO: isform.siteRegisterNumber,
          RO_SUPERVISOR_MOBILE: isform.siteContactNumber,
          RO_SUPERVISOR_NAME: isform.siteSupervisorName,
          RO_SUPERVISOR_EMAIL: isform.siteSupervisorEmail
        }

        dispatch(create_site_info(postObj))
      }
      else {
        const postObj = {
          RO_ID: seletedRo.roId,
          RO_NAME: isform.siteName,
          RO_CODE: seletedRo.roCode,
          RO_ADDRESS: isform.street,
          RO_STATE_ID: isform.state,
          RO_ZONE: isform.zone,
          RO_STREET: isform.street,
          RO_DISTRICT: isform.district,
          RO_CITY: isform.city,
          RO_PINCODE: isform.areaPincode,
          RO_SITE_REGISTER_NO: isform.siteRegisterNumber,
          RO_SUPERVISOR_MOBILE: isform.siteContactNumber,
          RO_SUPERVISOR_EMAIL: isform.siteSupervisorEmail,
          RO_SUPERVISOR_NAME: isform.siteSupervisorName,
        }
        // console.info(postObj)        
        dispatch(update_site_info(postObj))
      }

    }
  }

  const resetForm = () => {
    setForm(initialvalue)
  }

  const validateForm = (values) => {
    const err = {};
    if (!values.siteName) {
      err.siteName = "RO Name is Required"
    }
    if (!values.street) {
      err.street = "Street is Required"
    }
    if (!values.district) {
      err.district = "District is Required"
    }
    if (!values.city) {
      err.city = "City is Required"
    }
    if (!values.state) {
      err.state = "State is Required"
    }
    if (!values.zone) {
      err.zone = "Zone is Required"
    }
    if (!values.areaPincode) {
      err.areaPincode = "Area Pincode is Required"
    }
    if (!values.siteContactNumber) {
      err.siteContactNumber = "Site Contact Number is Required"
    }
    if (!values.siteRegisterNumber) {
      err.siteRegisterNumber = "Site Register Number is Required"
    }
    if (!values.siteSupervisorName) {
      err.siteSupervisorName = "Site Supervisor Name is Required"
    }
    if (!values.siteSupervisorEmail) {
      err.siteSupervisorEmail = "Site Supervisor Email is Required"
    }

    return err;
  }
  return (
    <div className="Cbody">
      <CCol >
        <div className='form-border'>
          {
            checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
            <CForm action="" method="post" onSubmit={submitform} className="row">
              <CCol sm={14} >
                <CFormGroup>
                  <CLabel htmlFor="siteName">RO Name<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={isform.siteName}
                    onChange={onChangeText}
                    placeholder="Enter RO name.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.siteName}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={8}>
                <CFormGroup>
                  <CLabel htmlFor="street">Street<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="street"
                    value={isform.street}
                    name="street"
                    onChange={onChangeText}
                    placeholder="Enter street.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.street}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={6}>
                <CFormGroup>
                  <CLabel htmlFor="district">District<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="district"
                    value={isform.district}
                    name="district"
                    onChange={onChangeText}
                    placeholder="Enter district.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>

                      {formError.district}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={5}>
                <CFormGroup>
                  <CLabel htmlFor="city">City<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="city"
                    value={isform.city}
                    name="city"
                    onChange={onChangeText}
                    placeholder="Enter city.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.city}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={5}>
                <CFormGroup>
                  <CLabel htmlFor="zone">Zone<i style={{ color: 'red' }}>*</i></CLabel>
                  <select className="form-control" onChange={getstatefun} name='zone' id='zone' value={isform.zone}>
                    <option value="">Select Zone</option>
                    {
                      getzone.map((data) => (
                        <option value={data.ZONE_ID} key={data.ZONE_ID}>{data.ZONE_NAME}</option>

                      ))
                    }
                  </select>
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.zone}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={4}>
                <CFormGroup>
                  <CLabel htmlFor="state">State<i style={{ color: 'red' }}>*</i></CLabel>
                  <select onChange={onChangeText} className="form-control" name='state' id='state' value={isform.state}>
                    <option value="">Select state</option>
                    {
                      getstate.map((data) => (
                        <option value={data.STATE_ID} key={data.STATE_ID}>{data.STATE_NAME}</option>

                      ))
                    }
                  </select>
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.state}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={7}>
                <CFormGroup>
                  <CLabel htmlFor="siteContactNumber">RO Contact Number<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="number"
                    id="siteContactNumber"
                    value={isform.siteContactNumber}
                    name="siteContactNumber"
                    onChange={onChangeText}
                    placeholder="Enter Site Contact Number.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>

                      {formError.siteContactNumber}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={7}>
                <CFormGroup>
                  <CLabel htmlFor="siteRegisterNumber">RO Register Number<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="number"
                    id="siteRegisterNumber"
                    value={isform.siteRegisterNumber}
                    name="siteRegisterNumber"
                    onChange={onChangeText}
                    placeholder="Enter site Register Number.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.siteRegisterNumber}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol xs={4}>
                <CFormGroup>
                  <CLabel htmlFor="areaPincode">Pincode<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="areaPincode"
                    value={isform.areaPincode}
                    name="areaPincode"
                    onChange={onChangeText}
                    placeholder="Enter Area Pincode.."
                    maxLength={10}
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.areaPincode}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={5}>
                <CFormGroup>
                  <CLabel htmlFor="siteSupervisorName">RO Manager Name<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="siteSupervisorName"
                    value={isform.siteSupervisorName}
                    name="siteSupervisorName"
                    onChange={onChangeText}
                    placeholder="Enter Site Supervisor Name.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>

                      {formError.siteSupervisorName}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>
              <CCol md={5}>
                <CFormGroup>
                  <CLabel htmlFor="siteContactNumber">RO Email<i style={{ color: 'red' }}>*</i></CLabel>
                  <CInput
                    type="email"
                    id="siteSupervisorEmail"
                    value={isform.siteSupervisorEmail}
                    name="siteSupervisorEmail"
                    onChange={onChangeText}
                    placeholder="Enter Site Supervisor Email.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>

                      {formError.siteSupervisorEmail}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol>

              <CCol xs={12}>
                <CButton color="primary mr-3" style={{ "backgroundColor": "grey" }} target="_blank" onClick={resetForm}>Reset</CButton>
                <CButton color="primary" style={{ "backgroundColor": "#01a757" }} target="_blank" onClick={submitform}>{createSiteInfo ? "Create" : "Update"}</CButton>
              </CCol>
            </CForm>
          }
        </div>
      </CCol>
    </div>
  )
}

export default SiteInformation