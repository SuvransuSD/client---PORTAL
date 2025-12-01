import { CREATE_FIRMWARE, CREATE_SMTP, GET_OTA } from "../types";
import axiosInstance from "../../utils/axiosInstance";
var uri = "/api/Portal_Management/smtp"


// actions 
export const create_SmtpAccess = (smtpcall) => dispatch => {
  axiosInstance.post(uri, smtpcall).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_SMTP,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('SMTP connected successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const create_firmware = (firmwaredata, refresh) => dispatch => {
  axiosInstance.post('/api/Portal_Management/ota-firmware', firmwaredata).then((result) => {
    if (result) {
      dispatch({
        type: CREATE_FIRMWARE,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('Firmware sent successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const get_OTA = () => dispatch => {

  axiosInstance.get('/api/Portal_Management/ota-firmware').then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_OTA,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })
}


