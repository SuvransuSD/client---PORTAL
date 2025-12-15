import axiosInstance from "../../utils/axiosInstance";
import { GET_RO, GET_STATE, GET_ZONE, GET_STATE_CODE } from "../types";

var uri = "/api/AMS_Dashboard/"

// actions

export const get_zone = () => dispatch => {
  axiosInstance.get(uri + 'get-zone').then((result) => {
    if (result.status === 200) {
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

export const get_state = (params = {}) => dispatch => {
  const { ZONE_ID } = params;
  
  if (!ZONE_ID) {
    console.warn('get_state called without ZONE_ID parameter');
    dispatch({
      type: GET_STATE,
      payload: [],
    });
    return;
  }

  axiosInstance.get(uri + 'get-state/' + ZONE_ID).then((result) => {
    console.log('Action state--->', result);
    if (result.status === 200) {
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

export const get_statecode = (params = {}) => dispatch => {
  const { ZONE_ID } = params;
  
  if (!ZONE_ID) {
    console.warn('get_statecode called without ZONE_ID parameter');
    dispatch({
      type: GET_STATE_CODE,
      payload: [],
    });
    return;
  }

  axiosInstance.get(uri + 'get-state-code/' + ZONE_ID).then((result) => {
    if (result.status === 200) {
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

export const get_ro = (params = {}) => dispatch => {
  const { ZONE_ID, STATE_ID } = params;
  
  if (!ZONE_ID || !STATE_ID) {
    console.warn('get_ro called without required parameters (ZONE_ID, STATE_ID)');
    dispatch({
      type: GET_RO,
      payload: [],
    });
    return;
  }

  axiosInstance.get(uri + 'get-ro/' + ZONE_ID + '/' + STATE_ID).then((result) => {
    if (result.status === 200) {
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




