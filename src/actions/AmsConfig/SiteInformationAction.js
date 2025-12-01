import axiosInstance from "../../utils/axiosInstance";
import { GET_SITE_INFORMATION, UPDATE_SITE_INFORMATION } from "../types";
import staticData from "./AmsConfig.json"
var uri = "/api/AMS_Configuration/"


// actions

export const get_site_info = (id) => dispatch => {
  const MYURL = uri + `get-site-information/${id}`;
  axiosInstance.get(MYURL).then((result) => {
    if (result.status === 200) {
      dispatch({
        type: GET_SITE_INFORMATION,
        payload: result.data
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const create_site_info = (data) => dispatch => {
  const MYURL = uri + `create-site-information`;
  axiosInstance.post(MYURL, data).then((result) => {
    if (result.status === 201) {
      alert("Site Information created successfully!")
      dispatch({
        type: UPDATE_SITE_INFORMATION,
        payload: [data]
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const update_site_info = (data) => dispatch => {
  const MYURL = uri + `update-site-information`;
  axiosInstance.put(MYURL, data).then((result) => {
    if (result.status === 200) {
      alert("Site Information updated successfully!")
      dispatch({
        type: UPDATE_SITE_INFORMATION,
        payload: [data]
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}