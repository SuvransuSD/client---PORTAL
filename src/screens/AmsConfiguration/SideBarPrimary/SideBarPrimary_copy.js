import React from 'react'
import './Style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { set_sidebar_selected_ro } from '../../../actions/AmsConfig/Amsconfig_sidebar_Action'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const SideBarPrimary = () => {
    const dispatch = useDispatch();

    const amsc_sidebar = useSelector((state) => state.AmsConfigSidebar.sidebardata);

    const { seletedRo } = useSelector(
        (state) => state.AmsConfigSidebar
    );


    const dispatchSelectedRO = (value) => {
        dispatch(set_sidebar_selected_ro(value));
    }


    return (
        <div className='sidebar-container'>


            {
                Object.entries(amsc_sidebar).map(([val, key]) => {
                    return (
                        <>
                            <ProSidebar style={{"backgroundColor":"#dae3f3",height:"100vh"}}>
                                <Menu iconShape="square">
                                    <SubMenu title={val}>
                                        {
                                            key.states.map((value, index) => {
                                                return (
                                                    <SubMenu title={value.state}>
                                                        {
                                                            value.ro.map((value, index) =>
                                                                <MenuItem>{value.roCode}</MenuItem>
                                                            )

                                                        }

                                                    </SubMenu>

                                                )
                                            }
                                            )
                                        }
                                    </SubMenu>
                                </Menu>
                            </ProSidebar>

                            {/* <h4>&#9650; {val} </h4>
                            {
                                key.states.map((value, index) =>
                                (
                                    <div className='ml-4' >
                                        <h5>&#9679; {value.state}</h5>
                                        {
                                            value.ro.map((value, index) =>
                                                <ul className='site-list'>
                                                    <li role="button" className={seletedRo && seletedRo.roCode === value.roCode ? "ro-text-active" : ""} onClick={() => dispatchSelectedRO(value)}>{
                                                        value.roCode
                                                    }</li>
                                                </ul>

                                            )

                                        }


                                    </div>

                                ))
                            } */}

                        </>


                    )

                })
            }


        </div>
    )
}

export default SideBarPrimary


