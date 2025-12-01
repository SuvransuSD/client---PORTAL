import React, { useEffect } from "react";
import './Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPowerOff, faTimes } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
//import keyimg from './key.png'
import { checkaccess } from '../../../actions/PortalmngAction/AccessManagementAction';
import moment from "moment";

const KeyStatus = () => {

  const dispatch = useDispatch();

  const [isServerData, setServerData] = React.useState();

  const { seletedRo } = useSelector(
    (state) => state.AmsConfigSidebar
  );

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

  React.useEffect(() => {
    const MYURL = '/api/AMS_Configuration/get-key_status';
    axiosInstance.post(MYURL, { roId: seletedRo.roId }).then((result) => {
      if (result.status) {
        setServerData(result.data);
      }
    })
      .catch((err) => {
        console.log(err)
      })

  }, [seletedRo]);

  return (

    <div className="container">
      {
        checkacc && checkacc[0] && checkacc[0].AR_RIGHTS == 2 &&
        <div className="card">
          <div className="card-body key-bg">
            <div className="keyhead">
              <h5>
                <i className="bi bi-key-fill" />
                Key Status
              </h5>
              <p>Active and in active key status view</p>
            </div>
            <div className="row rowmargin">
              {

                isServerData && isServerData.map((value, index) => {
                  if (index < 14)
                    return <div className="col">
                      <p>{isServerData[index].KEY_NAME}</p>
                    </div>
                })
              }
            </div>
            <div className="alert alert-secondary" role="alert">
              <div className="row">
                {

                  isServerData && isServerData.map((value, index) => {
                    // key present
                    if (index < 14 && isServerData[index].KEY_STATUS == 1) {
                      return <div className="col">
                        <span className="icon-stack">
                          <FontAwesomeIcon
                            icon={faPowerOff}
                            className="fa-stack fa-rotate-180 outline"
                          />
                          <FontAwesomeIcon
                            icon={faKey}
                            className={`rotate-315 fa-stack-2x key${isServerData[index].COLOR} animated`}
                          />
                        </span>
                      </div>
                    }
                    // key not present
                    else if (index < 14 && isServerData[index].KEY_STATUS == 0) {
                      return <div className="col">
                        <span className="icon-stack">
                          <FontAwesomeIcon
                            icon={faPowerOff}
                            className="fa-stack fa-rotate-180 outline"
                          />
                          <FontAwesomeIcon
                            icon={faKey}
                            className={`rotate-315 fa-stack-2x keyNoColor animated`}
                            title={`Key Taken by: ${isServerData[index].KEY_TAKEN_BY_NAME}
Key Taken at: ${moment.utc(isServerData[index].KEY_TAKEN_AT).format('DD-MM-YYYY HH:mm:ss')}`}
                          />
                        </span>
                      </div>
                    } 
                    // wrong position
                    // else if (index < 14 && isServerData[index].KEY_STATUS == 2) {
                    //   return <div className="col">
                    //     <span className="icon-stack">
                    //       <FontAwesomeIcon
                    //         icon={faTimes}
                    //         className="fa-stack fa-rotate-180 outline"
                    //       />
                    //       <FontAwesomeIcon
                    //         icon={faKey}
                    //         className={`rotate-315 fa-stack-2x keyNoColor`}
                    //       />
                    //     </span>
                    //   </div>
                    // }
                  })
                }

              </div>
            </div>
            <br /><br /><br />
            <div className="row rowmargin">
              {
                isServerData && isServerData.map((value, index) => {
                  if (index >= 14)
                    return <div className="col">
                      <p>{isServerData[index].KEY_NAME}</p>
                    </div>
                })
              }
            </div>
            <div className="alert alert-secondary" role="alert">
              <div className="row">
                {
                  isServerData && isServerData.map((value, index) => {
                    //key present
                    if (index >= 14 && isServerData[index].KEY_STATUS == 1) {
                      return <div className="col">
                        <span className="icon-stack">
                          <FontAwesomeIcon
                            icon={faPowerOff}
                            className="fa-stack fa-rotate-180 outline"
                          />
                          <FontAwesomeIcon
                            icon={faKey}
                            className={`rotate-315 fa-stack-2x key${isServerData[index].COLOR} animated`}
                          />
                        </span>
                      </div>
                    }
                    //key not present
                    else if (index >= 14 && isServerData[index].KEY_STATUS == 0) {
                      return <div className="col">
                        <span className="icon-stack">
                          <FontAwesomeIcon
                            icon={faPowerOff}
                            className="fa-stack fa-rotate-180 outline"
                            title={`Key Taken by: ${isServerData[index].KEY_TAKEN_BY_NAME}
Key Taken at: ${moment.utc(isServerData[index].KEY_TAKEN_AT).format('DD-MM-YYYY HH:mm:ss')}`}
                          />
                          <FontAwesomeIcon
                            icon={faKey}
                            className={`rotate-315 fa-stack-2x keyNoColor animated`}
                          />
                        </span>
                      </div>
                    }
                    //wrong position
                    // else if (index >= 14 && isServerData[index].KEY_STATUS == 2) {
                    //   return <div className="col">
                    //     <span className="icon-stack">
                    //       <FontAwesomeIcon
                    //         icon={faTimes}
                    //         className="fa-stack fa-rotate-180 outline"
                    //       />
                    //       <FontAwesomeIcon
                    //         icon={faKey}
                    //         className={`rotate-315 fa-stack-2x keyNoColor animated`}
                    //       />
                    //     </span>
                    //   </div>
                    // }
                  })
                }
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                {/* <div className="p-2 border bg-light">
                <strong>Key Status:</strong> Dispenser 2 Electronic Panel
                (DUEP2)Key Taken out by Patil at 09:04 AM
              </div> */}
              </div>
            </div>
            {/* <div className="row mt-3">
            <div className="col">
              <button type="button" className="btn btn-danger">
                Emergency Door Open
              </button>
            </div>
          </div> */}
          </div>
        </div>
      }
    </div>
  );
};

export default KeyStatus;