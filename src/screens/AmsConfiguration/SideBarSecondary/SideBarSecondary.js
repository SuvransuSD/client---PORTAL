import React from 'react'
import './Style.scss'
import { Link } from 'react-router-dom'
import { SideBarSecondaryData } from './SideBarSecondaryData'
import { useHistory } from "react-router-dom";

const SideBarSecondary = ({ selectedSecondarySidbar, setSelectedSecondarySidbar }) => {

    let history = useHistory();

    return (
        <div className='Sidebar'>
            <ul className='SidebarList'>
                {SideBarSecondaryData.map((val, key) => {
                    return (
                        <li
                            key={key}
                        >
                            <div role="button" onClick={() => setSelectedSecondarySidbar(val.link)}>

                                <h6 id={selectedSecondarySidbar == val.link ? "active" : ""}> {val.title}</h6>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SideBarSecondary