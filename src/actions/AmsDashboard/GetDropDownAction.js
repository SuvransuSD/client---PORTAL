import axiosInstance from "../../utils/axiosInstance";
import { GET_RO, GET_STATE, GET_ZONE, GET_STATE_CODE } from "../types";

var uri = "/api/AMS_Dashboard/"

// actions

export const get_zone = () => dispatch => {
  axiosInstance.get(uri + 'get-zone').then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ZONE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_state = ({ ZONE_ID }) => dispatch => {
  axiosInstance.get(uri + 'get-state/' + ZONE_ID).then((result) => {
    console.log('Action state--->', result);
    if (result.status) {
      dispatch({
        type: GET_STATE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_statecode = ({ ZONE_ID }) => dispatch => {
  axiosInstance.get(uri + 'get-state-code/' + ZONE_ID).then((result) => {
    if (result.status) {
      console.log('Action state code--->', result);
      dispatch({
        type: GET_STATE_CODE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_ro = ({ ZONE_ID, STATE_ID }) => dispatch => {
  axiosInstance.get(uri + 'get-ro/' + ZONE_ID + '/' + STATE_ID).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_RO,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}



