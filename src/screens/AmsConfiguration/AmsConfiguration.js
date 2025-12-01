import React, { useState } from 'react'
import './Style.scss'
import SideBarSecondary from './SideBarSecondary/SideBarSecondary'
//import SideBarPrimary from './SideBarPrimary/SideBarPrimary'
import SiteInformation from './SiteInformation/SiteInformation'
import CabinetOverview from './CabinetOverview/CabinetOverview'
import ManageKeys from './ManageKeys/ManageKeys'
import ManageRoles from './ManageRoles/ManageRoles'
import ManageUsers from './ManageUsers/ManageUsers'
import ManageActivities from './ManageActivities/ManageActivities'
import ManageEvents from './ManageEvents/ManageEvents'
import KeyStatus from "./KeyStatus/KeyStatus";
import { CCol, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { set_sidebar_selected_ro, search_sidebar, get_left_sidebar } from '../../actions/AmsConfig/Amsconfig_sidebar_Action'
import { checkaccess } from '../../actions/PortalmngAction/AccessManagementAction';


const AmsConfiguration = () => {

    const dispatch = useDispatch();
    let history = useHistory();
    const initialvalue = { rocode: "" };
    const [isform, setForm] = React.useState(initialvalue);
    const [isSearch, setSearch] = React.useState(false);
    const [searchDisable, setSearchDisable] = React.useState(true);

    const [selectedSecondarySidbar, setSelectedSecondarySidbar] = useState("/Ams-Configuration/Key-Status")

    const { seletedRo } = useSelector((state) => state.AmsConfigSidebar);

    const getsearchsidebar = useSelector((state) => state.AmsConfigSidebar.searchsidebar);
    //console.log('search-sidebar', getsearchsidebar);

    const amsc_sidebar = useSelector((state) => state.AmsConfigSidebar.sidebardata);
    //console.log('sidebardata', amsc_sidebar);

    React.useEffect(() => {
        bindEvent();
    });


    const onChangeText = (e) => {
        const { name, value } = e.target;
        setForm({ ...isform, [name]: value });
        setSearchDisable(false);
        console.log(e.target.value);
        if (!e.target.value) {
            setSearchDisable(true);
        }
        bindEvent();
    };

    const searchfn = (e) => {
        e.preventDefault();
        console.log('value:', isform.rocode);

        const searchconst = {
            ro: isform.rocode
        }
        dispatch(search_sidebar(searchconst));
        setSearch(true);
        bindEvent();
    }

    const dispatchSelectedRO = (value) => {
        console.log(value);
        dispatch(set_sidebar_selected_ro(value));
    }

    const role = sessionStorage.getItem('role');

    const checkacc = useSelector(
        (state) => state.AccessManagement.accesspermission
    );

    const bindEvent = () => {
        var toggler = document.getElementsByClassName("caret");
        var i;
        for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function () {
                this.parentElement
                    .querySelector(".nested")
                    .classList.toggle("active");
                this.classList.toggle("caret-down");
            });
        }
    }

    React.useEffect(() => {
        dispatch(checkaccess(
            {
                MODULE_ID: 4,
                AR_ROLE_ID: role
            }
        ));
        dispatch(get_left_sidebar());
        // bindEvent();
    }, []);


    const getComponent = () => {
        switch (selectedSecondarySidbar) {
            case "/Ams-Configuration/Key-Status":
                return <KeyStatus seletedRo={seletedRo} />;
            case "/Ams-Configuration/Site-Information":
                return <SiteInformation seletedRo={seletedRo} />
            case "/Ams-Configuration/Cabinet-Overview":
                return <CabinetOverview seletedRo={seletedRo} />
            case "/Ams-Configuration/Manage-Keys":
                return <ManageKeys seletedRo={seletedRo} />
            case "/Ams-Configuration/Manage-Events":
                return <ManageEvents seletedRo={seletedRo} />
            case "/Ams-Configuration/Manage-Users":
                return <ManageUsers seletedRo={seletedRo} />
            case "/Ams-Configuration/Manage-Activities":
                return <ManageActivities seletedRo={seletedRo} />
            default:
                console.log("Not Found")
        }
    }
    return (
        <CRow>
            <CCol md={3}>
                <div className='sidebar-container'>
                    {checkacc && checkacc[0].AR_RIGHTS == 2 &&
                        <>
                            <CRow>
                                <CCol lg={8}>
                                    <CInput id="rocode"
                                        name="rocode"
                                        value={isform.rocode}
                                        type="text"
                                        placeholder="Enter RO Code"
                                        onChange={onChangeText}></CInput>
                                </CCol>
                                <CCol lg={2}>
                                    <CButton disabled={searchDisable} className='searchbtn' onClick={searchfn}>Search</CButton>
                                </CCol>
                            </CRow>
                            <br></br>
                            <ul id="myUL">

                                {
                                    isSearch ?
                                        Object.entries(getsearchsidebar).map(([val, key]) => {
                                            return (
                                                <li>
                                                    <h4 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {val} </h4>
                                                    {
                                                        <ul className='nested' key={key}>
                                                            {key.states.map((value, index) =>
                                                            (
                                                                <li className='ml-4' >
                                                                    <h5 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {value.state}</h5>
                                                                    <ul className='site-list nested'>
                                                                        {value.ro.map((value, index) =>

                                                                            <li role="button" className={seletedRo && seletedRo.roCode === value.roCode ? "ro-text-active" : ""} onClick={() => dispatchSelectedRO(value)}>{
                                                                                value.roCode
                                                                            }
                                                                            </li>

                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }

                                                </li>


                                            )

                                        }) :
                                        Object.entries(amsc_sidebar).map(([val, key]) => {
                                            return (
                                                <li>
                                                    <h4 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {val} </h4>
                                                    {
                                                        <ul className='nested' key={key}>
                                                            {key.states.map((value, index) =>
                                                            (
                                                                <li className='ml-4' >
                                                                    <h5 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {value.state}</h5>
                                                                    <ul className='site-list nested'>
                                                                        {value.ro.map((value, index) =>
                                                                            <li role="button" className={seletedRo && seletedRo.roCode === value.roCode ? "ro-text-active" : ""} onClick={() => dispatchSelectedRO(value)}>{
                                                                                value.roCode
                                                                            }
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </li>
                                            )
                                        })
                                }

                            </ul>
                        </>
                    }
                </div>
            </CCol>
            {seletedRo && seletedRo.roCode ? <>
                <CCol className="sidebar-secondary" md={2} >
                    <SideBarSecondary selectedSecondarySidbar={selectedSecondarySidbar} setSelectedSecondarySidbar={setSelectedSecondarySidbar} />
                </CCol>
                <CCol md={9}>
                    {getComponent()}
                </CCol>
            </>
                : null
            }
        </CRow>

    )
}

export default AmsConfiguration



