import axiosInstance from "../../utils/axiosInstance";
import { GET_CABINET_OVERVIEW, UPDATE_CABINET_OVERVIEW } from "../types";
import staticData from "./AmsConfig.json"
var uri = "/api/AMS_Configuration/"

// actions

export const get_cabinet_overview = (id) => dispatch => {
  const MYURL = uri + `get-cabinet-overview?id=${id}`;
  axiosInstance.get(MYURL).then((result) => {
    if (result.status === 200) {
      dispatch({
        type: GET_CABINET_OVERVIEW,
        payload: result.data
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const create_cabinet_overview = (data, callback) => dispatch => {

  const MYURL = uri + `create-cabinet-overview`;
  axiosInstance.post(MYURL, data).then((result) => {
    if (result.status === 201) {
      alert("Created cabinet successfully!")
      //callback()
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const update_cabinet_overview = (data, callback) => dispatch => {

  const MYURL = uri + `update-cabinet-overview`;
  axiosInstance.put(MYURL, data).then((result) => {
    if (result.status === 200) {
      alert("Updated cabinet successfully!")
      //callback()
    }
  })
    .catch((err) => {
      console.log(err)
    })
}