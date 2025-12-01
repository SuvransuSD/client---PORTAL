import React, { useEffect, useState } from 'react'
import { CButton, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CCol, CInputGroupText, CInputGroup, CSpinner } from '@coreui/react'
import './Style.scss'
import { get_cabinet_overview, update_cabinet_overview, create_cabinet_overview } from '../../../actions/AmsConfig/CabinetOverviewAction';
import { useDispatch, useSelector } from 'react-redux';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';

const CabinetOverview = () => {

  const dispatch = useDispatch();

  const initialvalue = { cabinetName: '', noOfDoors: "", noOfStrips: "", alarmTimeoutForOpenDoors: '', alarmTimeoutForLowBatteries: '', ipAddress: '', subnetMask: '', gateway: '', primaryDNS: '', secondaryDNS: '' }
  const [isform, setForm] = React.useState(initialvalue);
  const [formError, setformError] = React.useState({});
  const [createCabinet, setCreateCabinet] = useState(false)
  const [Issubmit, setsubmit] = React.useState(false);

  const checkacc = useSelector(
    (state) => state.AccessManagement.accesspermission
  );

  const role = sessionStorage.getItem('role');

  React.useEffect(() => {
    dispatch(checkaccess(
      {
        MODULE_ID: 4,
        AR_ROLE_ID: role
      }))
  }, [])

  const { cabinetOverview } = useSelector(
    (state) => state.cabinetOverview
  );

  const { seletedRo } = useSelector(
    (state) => state.AmsConfigSidebar
  );



  useEffect(() => {
    dispatch(get_cabinet_overview(seletedRo.roId));

    return () => {
      setForm(initialvalue)
      setCreateCabinet(false)
    }
  }, [])

  useEffect(() => {
    if (cabinetOverview.length === 0) {
      setCreateCabinet(true)
    }
    console.log("cabinetOverview", cabinetOverview);

    if (cabinetOverview.length > 0) {
      const data = {
        cabinetName: cabinetOverview[0].CABINET_NAME,
        noOfDoors: cabinetOverview[0].DOORS,
        noOfStrips: cabinetOverview[0].STRIPS,
        //roLocation: cabinetOverview[0].RO_ADDRESS,
        alarmTimeoutForOpenDoors: cabinetOverview[0].ALARM_TIME_OUT,
        alarmTimeoutForLowBatteries: cabinetOverview[0].LOW_BATTERY,
        ipAddress: cabinetOverview[0].IPADDRESS,
        subnetMask: cabinetOverview[0].SUBNETMASK,
        gateway: cabinetOverview[0].GATEWAY,
        primaryDNS: cabinetOverview[0].PRIMARYDNS,
        secondaryDNS: cabinetOverview[0].SECONDARYDNS
      }
      setForm(data)
    }

    return () => {
      setCreateCabinet(false)
      setForm(initialvalue)
    }

  }, [cabinetOverview])

  useEffect(() => {
    dispatch(get_cabinet_overview(seletedRo.roId));

    return () => {
      setForm(initialvalue)
    }
  }, [seletedRo])



  const onChangeText = (e) => {
    const { name, value } = e.target;
    setForm({ ...isform, [name]: value });
  };

  const callback = () => {
    setForm(initialvalue)
    setCreateCabinet(false)
    dispatch(get_cabinet_overview(seletedRo.roId));
  }

  const submitform = (event) => {
    event.preventDefault();
    const errors = validateForm(isform)
    setformError(errors)
    if (Object.keys(errors).length === 0) {
      if (createCabinet) {
        const postObj = {
          CABINET_NAME: isform.cabinetName,
          DOORS: isform.noOfDoors,
          STRIPS: isform.noOfStrips,
          RO_ID: seletedRo.roId,
          ALARM_TIME_OUT: isform.alarmTimeoutForOpenDoors,
          LOW_BATTERY: isform.alarmTimeoutForLowBatteries,
          IPADDRESS: isform.ipAddress,
          SUBNETMASK: isform.subnetMask,
          GATEWAY: isform.gateway,
          PRIMARYDNS: isform.primaryDNS,
          SECONDARYDNS: isform.secondaryDNS
        }
        dispatch(create_cabinet_overview(postObj, callback))
      } else {
        const postObj = {
          CABINET_NAME: isform.cabinetName,
          CABINET_ID: cabinetOverview[0].CABINET_ID,
          DOORS: isform.noOfDoors,
          STRIPS: isform.noOfStrips,
          RO_ID: cabinetOverview[0].RO_ID,
          ALARM_TIME_OUT: isform.alarmTimeoutForOpenDoors,
          LOW_BATTERY: isform.alarmTimeoutForLowBatteries,
          IPADDRESS: isform.ipAddress,
          SUBNETMASK: isform.subnetMask,
          GATEWAY: isform.gateway,
          PRIMARYDNS: isform.primaryDNS,
          SECONDARYDNS: isform.secondaryDNS
        }
        console.log("obj===", postObj)
        dispatch(update_cabinet_overview(postObj, callback))
      }

    }
  }

  const resetForm = () => {
    setForm(initialvalue)
  }

  const validateForm = (values) => {
    const err = {};
    if (!values.cabinetName) {
      err.cabinetName = "Cabinet Name is Required"
    }
    if (!values.noOfDoors) {
      err.noOfDoors = "No. Of Doors is Required"
    }
    if (!values.noOfStrips) {
      err.noOfStrips = "No. Of Strips is Required"
    }
    // if (!values.roLocation) {
    //   err.roLocation = "Ro Location is Required"
    // }
    if (!values.alarmTimeoutForOpenDoors) {
      err.alarmTimeoutForOpenDoors = "Alarm Timeout For Open Door(s) is Required"
    }
    if (!values.alarmTimeoutForLowBatteries) {
      err.alarmTimeoutForLowBatteries = "Alarm Timeout For LowBattery(s) is Required"
    }
    if (!values.ipAddress) {
      err.ipAddress = "IP Address is Required"
    }
    if (!values.subnetMask) {
      err.subnetMask = "Subnet Mask is Required"
    }
    if (!values.gateway) {
      err.gateway = "Gateway is Required"
    }
    if (!values.primaryDNS) {
      err.primaryDNS = "Primary DNS Number is Required"
    }
    return err;
  }

  return (
    <div className="Cbody">
      <CRow>
        <CCol >
          <div className='form-border'>
            {
              checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
              <CForm action="" method="post" onSubmit={submitform} className="row">
                <CCol sm={14} >
                  <CFormGroup>
                    <CLabel htmlFor="cabinetName">Cabinet Name<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="text"
                      id="cabinetName"
                      value={isform.cabinetName}
                      name="cabinetName"
                      onChange={onChangeText}
                      placeholder="Enter Cabinet Name.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.cabinetName}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={7}>
                  <CFormGroup>
                    <CLabel htmlFor="noOfDoors">No of Doors<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="number"
                      id="noOfDoors"
                      value={isform.noOfDoors}
                      name="noOfDoors"
                      onChange={onChangeText}
                      placeholder="Enter No of Doors.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.noOfDoors}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={7}>
                  <CFormGroup>
                    <CLabel htmlFor="noOfStrips">No of Strips<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="number"
                      id="noOfStrips"
                      value={isform.noOfStrips}
                      name="noOfStrips"
                      onChange={onChangeText}
                      placeholder="Enter No of Strips.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.noOfStrips}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                {/* <CCol md={14}>
                <CFormGroup>
                  <CLabel htmlFor="roLocation">RO Location<i style={{color: 'red'}}>*</i></CLabel>
                  <CInput
                    type="text"
                    id="roLocation"
                    value={isform.roLocation}
                    name="roLocation"
                    onChange={onChangeText}
                    placeholder="Enter RO Location.."
                  />
                  <CFormText className="help-block text-danger" >
                    <p style={{ color: 'red' }}>
                      {formError.roLocation}
                    </p>
                  </CFormText>
                </CFormGroup>
              </CCol> */}
                <CCol md={7}>
                  <CFormGroup>
                    <CLabel htmlFor="alarmTimeoutForOpenDoors">Alarm Timeout For Open Door(s)<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInputGroup>
                      <CInput
                        type="number"
                        id="alarmTimeoutForOpenDoors"
                        value={isform.alarmTimeoutForOpenDoors}
                        name="alarmTimeoutForOpenDoors"
                        onChange={onChangeText}
                        placeholder="Enter Alarm Timeout For Open Door(s).."
                      />
                      <CInputGroupText id="alarmTimeoutForOpenDoors">minutes</CInputGroupText>
                    </CInputGroup>
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>

                        {formError.alarmTimeoutForOpenDoors}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={7}>
                  <CFormGroup>
                    <CLabel htmlFor="alarmTimeoutForLowBatteries">Alarm Timeout For Low Battery(s)<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInputGroup>
                      <CInput
                        type="number"
                        id="alarmTimeoutForLowBatteries"
                        value={isform.alarmTimeoutForLowBatteries}
                        name="alarmTimeoutForLowBatteries"
                        onChange={onChangeText}
                        placeholder="Enter Alarm Timeout For Low Battery(s)"
                      />
                      <CInputGroupText id="alarmTimeoutForLowBatteries">minutes</CInputGroupText>
                    </CInputGroup>
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.alarmTimeoutForLowBatteries}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={5}>
                  <CFormGroup>
                    <CLabel htmlFor="ipAddress">IP Address<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="text"
                      id="ipAddress"
                      value={isform.ipAddress}
                      name="ipAddress"
                      onChange={onChangeText}
                      placeholder="Enter IP Address.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.ipAddress}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={5}>
                  <CFormGroup>
                    <CLabel htmlFor="subnetMask">Subnet Mask<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="text"
                      id="subnetMask"
                      value={isform.subnetMask}
                      name="subnetMask"
                      onChange={onChangeText}
                      placeholder="Enter Subnet Mask.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.subnetMask}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={4}>
                  <CFormGroup>
                    <CLabel htmlFor="gateway">Gateway<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="text"
                      id="gateway"
                      value={isform.gateway}
                      name="gateway"
                      onChange={onChangeText}
                      placeholder="Enter Gateway.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.gateway}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={7}>
                  <CFormGroup>
                    <CLabel htmlFor="primaryDNS">Primary DNS<i style={{ color: 'red' }}>*</i></CLabel>
                    <CInput
                      type="text"
                      id="primaryDNS"
                      value={isform.primaryDNS}
                      name="primaryDNS"
                      onChange={onChangeText}
                      placeholder="Enter Gateway.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.primaryDNS}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol md={7}>
                  <CFormGroup>
                    <CLabel htmlFor="secondaryDNS">Secondary DNS(optional)</CLabel>
                    <CInput
                      type="text"
                      id="secondaryDNS"
                      value={isform.secondaryDNS}
                      name="secondaryDNS"
                      onChange={onChangeText}
                      placeholder="Enter Secondary DNS.."
                    />
                    <CFormText className="help-block text-danger" >
                      <p style={{ color: 'red' }}>
                        {formError.secondaryDNS}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary mr-3" style={{ "backgroundColor": "grey" }} target="_blank" onClick={resetForm}>Reset</CButton>
                  <CButton color="primary" style={{ "backgroundColor": "#01a757" }} target="_blank" onClick={submitform}>{createCabinet ? "Create" : "Update"}</CButton>
                </CCol>
              </CForm>
            }
          </div>
        </CCol>
      </CRow>
    </div >
  )
}

export default CabinetOverview