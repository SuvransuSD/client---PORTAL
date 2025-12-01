import axiosInstance from "../../utils/axiosInstance";
import { CHECK_ACCESS, CREATE_ACCESS, FIND_ACCESS, GET_MOULES } from "../types";

var uri = "/api/Portal_Management/get-moules"

// actions

export const get_modules = () => dispatch => {
  axiosInstance.get(uri).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: GET_MOULES,
        payload: result.data,
      });
    }
  })
    .then(() => {

    })
    .catch((err) => {
      console.log(err)
    })

}

export const createAccess = (data) => dispatch => {
  axiosInstance.post('/api/Portal_Management/create-Access', data).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_ACCESS,
        payload: [],
      });
    }
  })
    .then(() => {

    })
    .catch((err) => {
      console.log(err)
    })

}

export const FindAccess = (data) => dispatch => {
  axiosInstance.post('/api/Portal_Management/find-access', data).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: FIND_ACCESS,
        payload: result.data,
      });
    }
  })
    .then(() => {

    })
    .catch((err) => {
      console.log(err)
    })

}


export const checkaccess = (data) => dispatch => {
  axiosInstance.post('/api/Portal_Management/check-access', data).then((result) => {
    if (result.status) {
      dispatch({
        type: CHECK_ACCESS,
        payload: result.data,
      });
    }
  })
    .catch((err) => {
      dispatch({
        type: CHECK_ACCESS,
        payload: [{
          AR_RIGHTS: 0
        }],
      });
    })

}





