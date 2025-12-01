import React from 'react'
import './Style.scss'
import { CCol, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CButton } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux'
import { set_sidebar_selected_ro, search_sidebar } from '../../../actions/AmsConfig/Amsconfig_sidebar_Action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';
import { get_left_sidebar } from '../../../actions/AmsConfig/Amsconfig_sidebar_Action'



const SideBarPrimary = () => {
   const initialvalue = { rocode: "" };
   const [isform, setForm] = React.useState(initialvalue);
   const [formError, setformError] = React.useState({});
   const [isSearch, setSearch] = React.useState(false);
   const dispatch = useDispatch();

   const getsearchsidebar = useSelector((state) => state.AmsConfigSidebar.searchsidebar);
   console.log('search-sidebar', getsearchsidebar);

   const amsc_sidebar = useSelector((state) => state.AmsConfigSidebar.sidebardata);
   console.log('sidebardata', amsc_sidebar);

   const { seletedRo } = useSelector(
      (state) => state.AmsConfigSidebar
   );

   const onChangeText = (e) => {
      const { name, value } = e.target;
      setForm({ ...isform, [name]: value });
   };

   const searchfn = (e) => {
      e.preventDefault();
      console.log('value:', isform.rocode);
      console.log(getsearchsidebar);
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
      bindEvent();
   }, []);

   return (
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
                     <CButton className='searchbtn' onClick={searchfn}>Search</CButton>
                  </CCol>
                  <CFormText className="help-block text-danger">
                     <p style={{ color: 'red' }}>{formError.rocode}</p></CFormText>
               </CRow>
               <br></br>
               <ul id="myUL">

                  {
                     isSearch ?
                        Object.entries(getsearchsidebar).map(([val, key]) => {
                           return (
                              <li>
                                 <h4 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {val} </h4>
                                 {/* &#11208; */}
                                 {
                                    <ul className='nested' key={key}>
                                       {key.states.map((value, index) =>
                                       (
                                          <li className='ml-4' >
                                             <h5 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {value.state}</h5>
                                             {/* &#11166; */}

                                             <ul className='site-list nested'>
                                                {/* {value.ro.map((value, index) =>

                                                                    <li role="button" className={seletedRo && seletedRo.roCode === value.roCode ? "ro-text-active" : ""} onClick={() => dispatchSelectedRO(value)}>{
                                                                        value.roCode
                                                                    }
                                                                    </li>

                                                                )} */}
                                                {state.ro.sort((a, b) => a.roCode.localeCompare(b.roCode)).map((ro) => (
                                                   <li
                                                      key={ro.roCode}
                                                      role="button"
                                                      className={seletedRo && seletedRo.roCode === ro.roCode ? "ro-text-active" : ""}
                                                      onClick={() => dispatchSelectedRO(ro)}
                                                   >
                                                      {ro.roCode}
                                                   </li>
                                                ))}
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
                                 {/* &#11208; */}
                                 {
                                    <ul className='nested' key={key}>
                                       {key.states.map((value, index) =>
                                       (
                                          <li className='ml-4' >
                                             <h5 className='caret'><span><FontAwesomeIcon icon={faArrowRight} /> </span> {value.state}</h5>
                                             {/* &#11166; */}

                                             <ul className='site-list nested'>
                                                {/* {value.ro.map((value, index) =>

                                                   <li role="button" className={seletedRo && seletedRo.roCode === value.roCode ? "ro-text-active" : ""} onClick={() => dispatchSelectedRO(value)}>{
                                                      value.roCode
                                                   }
                                                   </li>

                                                )} */}
                                                {state.ro.sort((a, b) => a.roCode.localeCompare(b.roCode)).map((ro) => (
                                                   <li
                                                      key={ro.roCode}
                                                      role="button"
                                                      className={seletedRo && seletedRo.roCode === ro.roCode ? "ro-text-active" : ""}
                                                      onClick={() => dispatchSelectedRO(ro)}
                                                   >
                                                      {ro.roCode}
                                                   </li>
                                                ))}
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
   )
}

export default SideBarPrimary