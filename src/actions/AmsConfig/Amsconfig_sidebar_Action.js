import axiosInstance from "../../utils/axiosInstance";
import { AMS_CONFIGURATION_SIDEBAR, AMS_CONFIGURATION_SIDEBAR_SELECTED_RO, SEARCH_SIDEBAR } from "../types";
var uri = "/api/AMS_Configuration/"

// actions

export const get_left_sidebar = () => dispatch => {
  const MYURL = uri + `sidebar`;
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: AMS_CONFIGURATION_SIDEBAR,
        payload: result.data
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const search_sidebar = (body) => dispatch => {
  const MYURL = uri + `searchsidebar`;
  axiosInstance.post(MYURL, body).then((result) => {
    if (result.status) {
      dispatch({
        type: SEARCH_SIDEBAR,
        payload: result.data
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const set_sidebar_selected_ro = (data) => dispatch => {
  dispatch({
    type: AMS_CONFIGURATION_SIDEBAR_SELECTED_RO,
    payload: data
  })
}

