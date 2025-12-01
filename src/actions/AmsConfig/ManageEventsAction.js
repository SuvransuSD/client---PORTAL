import axiosInstance from "../../utils/axiosInstance";
import {
  GET_MANAGE_EVENTS_FORM,
  DELETE_MANAGE_EVENT_FORM
} from "../types";
var uri = "/api/AMS_Configuration/"


// actions

export const create_manage_events_form = (data, callback) => dispatch => {
  const MYURL = uri + 'get-manage-events';
  axiosInstance.post(MYURL, data).then((result) => {
    if (result.status == 200) {
      callback();
      alert('Event created successfully');
    }
  })
}

export const get_manage_events_form = (selectedro) => dispatch => {
  const MYURL = uri + 'get-manage-events/' + selectedro;
  axiosInstance.get(MYURL).then((result) => {
    if (result) {
      dispatch({
        type: GET_MANAGE_EVENTS_FORM,
        payload: result.data
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })
}

export const update_manage_events_form = (data, callback) => dispatch => {
  const MYURL = uri + 'get-manage-events';
  axiosInstance.put(MYURL, data).then((result) => {
    callback();
    alert('Updated successfully');

  })

}

export const delete_eventtypes = (delevent, callback) => dispatch => {
  axiosInstance.delete(uri + '/' + delevent.ID, delevent).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_MANAGE_EVENT_FORM,
        payload: result.data,
      });
    }
  })
    .then(() => {
      callback();
      alert('Deleted successfully!!');
    })
} 