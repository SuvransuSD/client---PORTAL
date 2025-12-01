import React, { useState, useEffect } from 'react'
import { CButton, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CCol, CSelect } from '@coreui/react'
import './Style.scss'
import { get_manage_keys_form, update_manage_keys_form, create_manage_keys_form, delete_manage_keys_form } from '../../../actions/AmsConfig/ManageKeysAction';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';
import { useDispatch, useSelector } from 'react-redux';
import { Datatable } from '../../../components/Datatable/Datatable'

const ManageKeys = () => {

    const dispatch = useDispatch();

    const initialvalue = { keyID: '', cabinetID: '', keyName: '', keyDescription: '', color: '', door: '', strip: '', position: '' }
    const [isform, setForm] = React.useState(initialvalue);
    const [formError, setformError] = React.useState({});
    const [Issubmit, setsubmit] = React.useState(false);
    const [modifyKey, setModifyKey] = useState(false)
    const { manageKeysForm } = useSelector(
        (state) => state.manageKeys
    );

    const { seletedRo } = useSelector(
        (state) => state.AmsConfigSidebar
    );

    const checkacc = useSelector(
        (state) => state.AccessManagement.accesspermission
    );

    const role = sessionStorage.getItem('role');

    useEffect(() => {
        dispatch(get_manage_keys_form(seletedRo.roId));
        dispatch(checkaccess(
            {
                MODULE_ID: 4,
                AR_ROLE_ID: role
            }
        ));
        return () => {
            setForm(initialvalue)
            setModifyKey(false)
        }
    }, [])

    useEffect(() => {
        dispatch(get_manage_keys_form(seletedRo.roId));

        return () => {
            setForm(initialvalue)
            setModifyKey(false)
        }
    }, [seletedRo])

    const resetForm = () => {
        setModifyKey(false)
        setForm(initialvalue)
    }

    const updateFormCallback = () => {
        dispatch(get_manage_keys_form(seletedRo.roId));
        resetForm()

    }

    const onChangeText = (e) => {
        const { name, value } = e.target;
        setForm({ ...isform, [name]: value });
    };

    const submitform = (event) => {
        event.preventDefault();
        const errors = validateForm(isform)
        setformError(errors)
        setsubmit(true);

        if (Object.keys(errors).length === 0) {

            if (modifyKey) {
                const postObj =
                {
                    KEY_ID: isform.keyID,
                    CABINET_ID: isform.cabinetID,
                    KEY_NAME: isform.keyName,
                    KEY_DESCRIPTION: isform.keyDescription,
                    KEY_COLOR: isform.color,
                    KEY_DOOR_NO: isform.door,
                    KEY_STRIP_NO: isform.strip,
                    KEY_SLOT_NO: isform.position
                }
                dispatch(update_manage_keys_form(postObj, updateFormCallback))
            } else {
                const postObj =
                {
                    RO_ID: seletedRo.roId,
                    KEY_NAME: isform.keyName,
                    KEY_DESCRIPTION: isform.keyDescription,
                    KEY_COLOR: isform.color,
                    KEY_DOOR_NO: isform.door,
                    KEY_STRIP_NO: isform.strip,
                    KEY_SLOT_NO: isform.position
                }
                dispatch(create_manage_keys_form(postObj, updateFormCallback))
            }

        }
    }



    const validateForm = (values) => {
        const err = {};
        if (!values.keyName) {
            err.keyName = "Key Name is Required"
        }
        if (!values.keyDescription) {
            err.keyDescription = "Key Description is Required"
        }
        if (!values.color) {
            err.color = "Color is Required"
        }
        if (!values.door) {
            err.door = "Door is Required"
        }
        if (!values.strip) {
            err.strip = "Strip is Required"
        }
        if (!values.position) {
            err.position = "Position is Required"
        }

        return err;
    }

    const updatefunction = (item) => {
        setModifyKey(true)
        const data = {
            keyID: item.KEY_ID,
            cabinetID: item.CABINET_ID,
            keyName: item.KEY_NAME,
            keyDescription: item.KEY_DESCRIPTION,
            color: item.KEY_COLOR,
            door: item.KEY_DOOR_NO,
            strip: item.KEY_STRIP_NO,
            position: item.KEY_SLOT_NO,
        }
        setForm(data)
    }

    const deletefunction = (item) => {
        dispatch(delete_manage_keys_form(item.KEY_ID, updateFormCallback))

    }

    return (
        <div className="Cbody">
            <CRow>
                <CCol >

                    <div className='form-border'>
                        {
                            checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
                            <CForm action="" method="post">
                                <CFormGroup>
                                    <CLabel htmlFor="keyName">Key Name</CLabel>
                                    <CInput
                                        type="text"
                                        id="keyName"
                                        value={isform.keyName}
                                        name="keyName"
                                        onChange={onChangeText}
                                        placeholder="Enter Key Name.."
                                    />
                                    <CFormText className="help-block text-danger" >
                                        <p style={{ color: 'red' }}>
                                            {formError.keyName}
                                        </p>
                                    </CFormText>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="keyDescription">Key Description</CLabel>
                                    <CInput
                                        type="text"
                                        id="keyDescription"
                                        value={isform.keyDescription}
                                        onChange={onChangeText}
                                        name="keyDescription"
                                        placeholder="Enter Key Description.."
                                    />
                                    <CFormText className="help-block text-danger" >
                                        <p style={{ color: 'red' }}>
                                            {formError.keyDescription}
                                        </p>
                                    </CFormText>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="color">Color</CLabel>
                                    <CSelect required custom name="color" id="color" className={isform.color} value={isform.color} onChange={onChangeText}>
                                        <option value="">Select color</option>
                                        <option value="Green" className="Green">Green</option>
                                        <option value="Yellow" className="Yellow">Yellow</option>
                                        <option value="LightBlue" className="LightBlue">LightBlue</option>
                                        <option value="Orange" className="Orange">Orange</option>
                                        <option value="DarkBlue" className="DarkBlue">DarkBlue</option>
                                        <option value="Pink" className="Pink">Pink</option>
                                        <option value="Red" className="Red">Red</option>
                                        <option value="Grey" className="Grey">Grey</option>
                                    </CSelect>
                                    <CFormText className="help-block text-danger">
                                        <p style={{ color: 'red' }}>{formError.color}</p></CFormText>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel >Key Position</CLabel>
                                </CFormGroup>
                                <CRow>
                                    <CCol md={4}>
                                        <CFormGroup>
                                            <select onChange={onChangeText} name='door' value={isform.door} className="form-control">
                                                <option value="">Select Door</option>
                                                <option value="1" >1</option>
                                            </select>
                                            <CFormText className="help-block text-danger" >
                                                <p style={{ color: 'red' }}>
                                                    {formError.door}
                                                </p>
                                            </CFormText>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md={4}>
                                        <CFormGroup>
                                            <select onChange={onChangeText} name='strip' value={isform.strip} className="form-control">
                                                <option value="">Select Strip</option>
                                                <option value="1" >1</option>
                                                <option value="2">2</option>
                                            </select>
                                            <CFormText className="help-block text-danger" >
                                                <p style={{ color: 'red' }}>
                                                    {formError.strip}
                                                </p>
                                            </CFormText>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md={4}>
                                        <CFormGroup>
                                            <select onChange={onChangeText} name='position' value={isform.position} className="form-control">
                                                <option value="">Select Position</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                            </select>
                                            <CFormText className="help-block text-danger" >
                                                <p style={{ color: 'red' }}>
                                                    {formError.position}
                                                </p>
                                            </CFormText>
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <div>
                                    <CButton color="primary mr-3" style={{ "backgroundColor": "grey" }} target="_blank" onClick={resetForm}>Reset</CButton>
                                    <CButton color="primary" style={{ "backgroundColor": "#01a757" }} target="_blank" onClick={submitform}>{modifyKey ? "Update" : "Create"}</CButton>
                                </div>
                                <br></br>
                                <div className='table text-center'>
                                    <Datatable
                                        data={manageKeysForm}
                                        // loading  = {'true'}
                                        Headfields={[
                                            {
                                                key: 'MODIFY',
                                                //label: "Modify",
                                                sorter: false,
                                                filter: false,
                                                _style: { background: '#dae3f3', color: 'grey' }
                                            },
                                            {
                                                key: 'DELETE',
                                                //label: "Delete",
                                                sorter: false,
                                                filter: false,
                                                _style: { background: '#dae3f3', color: 'grey' }
                                            },
                                            { key: 'KEY_NAME', label: "NAME", _style: { background: '#dae3f3', color: 'grey' } },
                                            { key: 'KEY_DESCRIPTION', label: "DESCRIPTION", _style: { background: '#dae3f3', color: 'grey' } },
                                            { key: 'KEY_COLOR', label: "COLOR", _style: { background: '#dae3f3', color: 'grey' } },
                                            {
                                                key: 'KEY_POSITION',
                                                label: "KEY POSITION",
                                                sorter: false,
                                                filter: false,
                                                _style: { background: '#dae3f3', color: 'grey' }
                                            }
                                        ]}
                                        scopedSlots={{
                                            'MODIFY':
                                                (item) => (
                                                    <td>
                                                        <CButton className="border border-secondary" color="white" onClick={() => updatefunction(item)}
                                                            disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}>
                                                            Modify
                                                        </CButton>
                                                    </td>
                                                ),

                                            'DELETE':
                                                (item) => (
                                                    <td>
                                                        <CButton className="border border-secondary" color="white" onClick={() => deletefunction(item)}
                                                            disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}>
                                                            Delete
                                                        </CButton>
                                                    </td>
                                                ),
                                            'KEY_POSITION':
                                                (item) => (
                                                    <td>
                                                        <p>D{item.KEY_DOOR_NO}-S{item.KEY_STRIP_NO}-P{item.KEY_SLOT_NO}</p>
                                                    </td>
                                                ),
                                        }} />
                                </div>
                            </CForm>
                        }
                    </div><br></br>
                </CCol>
            </CRow>
        </div>
    )
}

export default ManageKeys
