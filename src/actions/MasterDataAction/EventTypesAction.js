import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_EVENT_TYPES,
  DELETE_EVENT_TYPES,
  GET_EVENT_TYPES,
  UPDATE_EVENT_TYPES
}
  from "../types";

var uri = "/api/Master_Data/event-type"
// actions
export const create_eventtypes = (newevent) => dispatch => {
  axiosInstance.post(uri, newevent).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_EVENT_TYPES,
        payload: result.data,
      });
      get_eventtypes();
    }
  })
    .then(() => {
      alert('Event created successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_eventtypes = (newevent) => dispatch => {
  axiosInstance.put(uri + '/' + newevent.ID, newevent).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_EVENT_TYPES,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('Updated successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}


export const get_eventtypes = () => dispatch => {

  axiosInstance.get(uri).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_EVENT_TYPES,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const delete_eventtypes = (delevent) => dispatch => {
  axiosInstance.delete(uri + '/' + delevent.ID, delevent).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_EVENT_TYPES,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('Deleted successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

} 