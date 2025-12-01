import axiosInstance from "../../utils/axiosInstance";
import { GET_MANAGE_KEYS_FORM, UPDATE_MANAGE_KEYS_FORM } from "../types";
import staticData from "./AmsConfig.json"
var uri = "/api/AMS_Configuration/"

// actions

export const get_manage_keys_form = (id) => dispatch => {
  const MYURL = uri + `get-manage-keys?id=${id}`;
  axiosInstance.get(MYURL).then((result) => {
    if (result.status === 200) {
      dispatch({
        type: GET_MANAGE_KEYS_FORM,
        payload: result.data
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const create_manage_keys_form = (data, callback) => dispatch => {
  const MYURL = uri + `create-manage-keys`;
  axiosInstance.post(MYURL, data).then((result) => {
    if (result.status === 201) {
      alert("Key created successfully!")
      callback()
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const update_manage_keys_form = (data, callback) => dispatch => {
  const MYURL = uri + `update-manage-keys`;
  axiosInstance.put(MYURL, data).then((result) => {
    if (result.status === 200) {
      alert("Key updated successfully!")
      callback()
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const delete_manage_keys_form = (id, callback) => dispatch => {
  const MYURL = uri + `delete-manage-keys/${id}`;
  axiosInstance.delete(MYURL).then((result) => {
    if (result.status === 200) {
      alert("Key deleted successfully!")
      callback()
    }
  })
    .catch((err) => {
      console.log(err)
    })

}
