import React, { useState, useEffect } from 'react'
import { CForm, CInput, CLabel, CSwitch, CSelect, CFormText, CFormGroup, CButton, CRow, CCol } from '@coreui/react'
import "./Style.scss"
import { Datatable } from '../../../components/Datatable/Datatable'
//import { Headfields, usersData } from './mockActivityList'
import { useDispatch, useSelector } from 'react-redux';
import { get_keylist } from '../../../actions/MasterDataAction/KeyListAction';
//import { get_protalUser } from '../../../actions/PortalmngAction/PortalUserAction';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';
import { Create_manage_Activity_form, get_manage_activities_form, Update_manage_Activity_form } from '../../../actions/AmsConfig/ManageUsersAction';

const ManageActivities = () => {

    const dispatch = useDispatch();

    const tablehead = { background: '#dae3f3', color: 'grey' };
    const initialvalue = { aname: '', code: '', timelimit: '', freq: '', s1: false, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false };
    const [isform, setForm] = React.useState(initialvalue);
    const [iskey, setkey] = React.useState([]);
    const [formError, setformError] = React.useState({});
    const [Issubmit, setsubmit] = React.useState(false);
    const [isupdateid, setupdateid] = React.useState();
    const [modifyKey, setModifyKey] = useState(false)
    const getkey = useSelector((state) => state.keylist.keyl);
    // const getuser = useSelector((state) => state.portaluser.users);

    const getActivity = useSelector((state) => state.manageActivities.manageActivitiesForm);

    const { seletedRo } = useSelector((state) => state.AmsConfigSidebar);

    const checkacc = useSelector(
        (state) => state.AccessManagement.accesspermission
    );

    const role = sessionStorage.getItem('role');

    React.useEffect(() => {
        dispatch(checkaccess(
            {
                MODULE_ID: 4,
                AR_ROLE_ID: role
            }
        ));
    }, [])

    useEffect(() => {
        dispatch(get_manage_activities_form(seletedRo.roId));
        dispatch(get_keylist());
        return () => {
            setForm(initialvalue)
            setModifyKey(false)
        }
    }, [])

    useEffect(() => {
        dispatch(get_manage_activities_form(seletedRo.roId));

        return () => {
            setForm(initialvalue)
            setModifyKey(false)
        }
    }, [seletedRo])

    const resetForm = () => {
        setModifyKey(false)
        setForm(initialvalue)
        setkey({ key: '' });
    }

    const updateFormCallback = () => {
        dispatch(get_manage_activities_form(seletedRo.roId));
        resetForm();
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...isform, [name]: value });
    };

    function onChangeKeys(e) {
        console.log(e.target.selectedOptions);
        setkey({ key: Array.from(e.target.selectedOptions, (key) => key.value) });
    }

    const onchangeswitch = (e) => {
        const { name, checked } = e.target;
        setForm({ ...isform, [name]: checked });
    }


    const submitform = (event) => {
        event.preventDefault();
        const errors = validateForm(isform);
        setformError(errors);
        setsubmit(true);

        if (Object.keys(errors).length === 0) {

            if (modifyKey) {
                const updateActivity = {
                    RO_ID: seletedRo.roId,
                    ACTIVITY_NAME: isform.aname,
                    ACTIVITY_CODE: isform.code,
                    TIME_LIMIT: isform.timelimit,
                    WEEKDAYS: { s1: isform.s1, s2: isform.s2, s3: isform.s3, s4: isform.s4, s5: isform.s5, s6: isform.s6, s7: isform.s7 },
                    FREQUENCY: isform.freq,
                    // KEYS: JSON.stringify(iskey.key),
                    KEYS: iskey.key,
                    ACTIVITY_ID: isupdateid,
                }
                dispatch(Update_manage_Activity_form(updateActivity, updateFormCallback))
            } else {
                const newActivity = {
                    RO_ID: seletedRo.roId,
                    ACTIVITY_NAME: isform.aname,
                    ACTIVITY_CODE: isform.code,
                    TIME_LIMIT: isform.timelimit,
                    WEEKDAYS: { s1: isform.s1, s2: isform.s2, s3: isform.s3, s4: isform.s4, s5: isform.s5, s6: isform.s6, s7: isform.s7 },
                    FREQUENCY: isform.freq,
                    KEYS: iskey.key
                    //KEYS: JSON.stringify(iskey.key),
                }
                dispatch(Create_manage_Activity_form(newActivity, updateFormCallback))
            }

        }
    }


    const validateForm = (values) => {
        const err = {};

        if (!values.aname) {
            err.aname = "Activity Name is Required"
        }
        if (!values.code) {
            err.code = "Activity Code is Required"
        }
        if (!values.timelimit) {
            err.timelimit = "Time Limit is Required"
        }
        if (!values.freq) {
            err.freq = "Frequency is Required"
        }
        return err;
    }


    const updatefunction = (values) => {

        const ACT_WEEKDAYS = JSON.parse(values.ACT_WEEKDAYS);
        console.log(values);
        setModifyKey(true);
        setkey({ key: values.ACT_KEYS_LIST });
        setForm({
            aname: values.ACT_NAME,
            code: values.ACT_CODE,
            timelimit: values.ACT_DURATION,
            freq: values.ACT_FREQUENCY,
            //key: values.ACT_KEYS_LIST,
            s1: ACT_WEEKDAYS.s1,
            s2: ACT_WEEKDAYS.s2,
            s3: ACT_WEEKDAYS.s3,
            s4: ACT_WEEKDAYS.s4,
            s5: ACT_WEEKDAYS.s5,
            s6: ACT_WEEKDAYS.s6,
            s7: ACT_WEEKDAYS.s7,
        });
        setupdateid(values.ACTIVITY_ID)
    }


    console.log(isform);


    return (
        <div className="Cbody">

            <div className='form-border'>
                {
                    checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
                    <CForm onSubmit={submitform} method="post">
                        <CRow>
                            <CCol lg={7}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-email">Activity Name</CLabel>
                                    <CInput
                                        type="Name"
                                        id="aname"
                                        name="aname"
                                        value={isform.aname}
                                        onChange={onChange}
                                        placeholder="Enter Activity Name.."

                                    />
                                    <CFormText className="help-block text-danger">
                                        <p style={{ color: 'red' }}>{formError.aname}</p></CFormText>
                                </CFormGroup>
                            </CCol>

                            <CCol lg={7}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-email">Activity Code</CLabel>
                                    <CInput
                                        type="text"
                                        id="code"
                                        name="code"
                                        value={isform.code}
                                        onChange={onChange}
                                        placeholder="Enter Activity Code.."
                                        maxLength={2}
                                    />
                                    <CFormText className="help-block text-danger">
                                        <p style={{ color: 'red' }}>{formError.aname}</p></CFormText>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol lg={7}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-email">Time limit in minutes</CLabel>
                                    <CInput
                                        type="number"
                                        id="timelimit"
                                        name="timelimit"
                                        value={isform.timelimit}
                                        onChange={onChange}
                                        placeholder="Enter Time Limit.."
                                        maxLength={2}
                                    />
                                    <CFormText className="help-block text-danger">
                                        <p style={{ color: 'red' }}>{formError.timelimit}</p></CFormText>
                                </CFormGroup>
                            </CCol>

                            <CCol lg={7}>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-email">Frequency in a day</CLabel>
                                    <CInput
                                        type="number"
                                        id="freq"
                                        name="freq"
                                        value={isform.freq}
                                        onChange={onChange}
                                        placeholder="Enter Frequency.."
                                        maxLength={2}
                                    />
                                    <CFormText className="help-block text-danger">
                                        <p style={{ color: 'red' }}>{formError.freq}</p></CFormText>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <br></br>
                        <CFormGroup row>
                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.sunday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s1"
                                    name='s1'
                                    value={isform.s1}
                                    onChange={onchangeswitch}
                                    checked={isform.s1}
                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>SUN</CLabel>

                            </CCol>

                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.monday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s2"
                                    name='s2'
                                    value={isform.s2}
                                    onChange={onchangeswitch}
                                    checked={isform.s2}

                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>MON</CLabel>

                            </CCol>

                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.tuesday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s3"
                                    name='s3'
                                    value={isform.s3}
                                    checked={isform.s3}
                                    onChange={onchangeswitch}
                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>TUE</CLabel>

                            </CCol>

                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.wednesday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s4"
                                    name='s4'
                                    value={isform.s4}
                                    onChange={onchangeswitch}
                                    checked={isform.s4}
                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>WED</CLabel>

                            </CCol>

                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.thrusday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s5"
                                    name='s5'
                                    value={isform.s5}
                                    onChange={onchangeswitch}
                                    checked={isform.s5}
                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>THURS</CLabel>

                            </CCol>

                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.friday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s6"
                                    name='s6'
                                    value={isform.s6}
                                    onChange={onchangeswitch}
                                    checked={isform.s6}
                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>FRI</CLabel>

                            </CCol>

                            <CCol xs="1">
                                <CSwitch
                                    //onClick={this.saturday}
                                    className={'mx-1'}
                                    color={'primary'}
                                    variant={'opposite'}
                                    labelOn={'\u2713'}
                                    labelOff={'\u2715'}
                                    id="s7"
                                    name='s7'
                                    value={isform.s7}
                                    onChange={onchangeswitch}
                                    checked={isform.s7}
                                /> </CCol>
                            <CCol xs="1">
                                <CLabel>SAT</CLabel>

                            </CCol>
                        </CFormGroup>
                        <CRow>
                            <CCol xs="7">
                                <CFormGroup>
                                    <CLabel>Associate Keys</CLabel>
                                    <CSelect required custom name="key" id="key"
                                        value={iskey.key}
                                        onChange={onChangeKeys}

                                        multiple={true}>
                                        {
                                            getkey.map((data) => (
                                                <option value={data.KEY_ID} key={data.KEY_ID}>{data.KEY_NAME}</option>

                                            ))
                                        }
                                    </CSelect>
                                    <CFormText className="help-block text-danger">
                                        <p style={{ color: 'red' }}>{formError.key}</p></CFormText>
                                </CFormGroup>
                            </CCol>

                        </CRow>


                        <div>

                            <CButton color="primary mr-3" style={{ "backgroundColor": "grey" }} target="_blank" onClick={resetForm}>Reset</CButton>
                            <CButton color="primary" style={{ "backgroundColor": "#01a757" }} target="_blank" onClick={submitform}>{modifyKey ? "Update" : "Create"}</CButton>

                        </div>
                        <br></br>



                    </CForm>
                }
                <br></br>




                <div className='table text-center'>
                    <Datatable
                        data={getActivity}
                        Headfields={[
                            { key: 'Modify', label: 'MODIFY', sorter: false, filter: false, _style: tablehead },
                            // { key: 'Delete', _style: tablehead },
                            { key: 'ACT_NAME', label: 'ACTIVITY NAME', _style: tablehead },
                            { key: 'ACT_CODE', label: 'ACTIVITY CODE', _style: tablehead },
                            { key: 'ACT_DURATION', label: 'ACTIVTY DURATION', _style: tablehead },
                            { key: 'ACT_FREQUENCY', label: 'ACTIVITY FREQUENCY', _style: tablehead },
                            // { key: 'ACT_KEYS_LIST', label: 'KEYS', _style: tablehead },
                        ]}
                        scopedSlots={{
                            'Modify': (item) => (
                                <td>
                                    <CButton className="border border-secondary" color="white" onClick={() => updatefunction(item)}
                                        disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}
                                    >
                                        Modify
                                    </CButton>
                                </td>
                            ),
                            // 'Delete': (item) => (
                            //     <td>
                            //         <CButton className="border border-secondary" color="white" onClick={() => deleteform(item)} disabled={checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 ? false : true}>
                            //             Delete
                            //         </CButton>
                            //     </td>
                            // ),
                        }
                        } />
                </div>
            </div><br></br>
        </div>
    )
}

export default ManageActivities