import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_STATE_LIST,
  DELETE_STATE_LIST,
  GET_STATE_LIST,
  UPDATE_STATE_LIST
}
  from "../types";

var uri = "/api/Master_Data/state-list"

// actions
export const create_statelist = (newstate) => dispatch => {
  axiosInstance.post(uri, newstate).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_STATE_LIST,
        payload: result.data,
      });
      get_statelist();
    }
  })
    .then(() => {
      alert('State created successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_statelist = (newstate) => dispatch => {
  axiosInstance.put(uri + '/' + newstate.STATE_ID, newstate).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_STATE_LIST,
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


export const get_statelist = () => dispatch => {

  axiosInstance.get(uri).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_STATE_LIST,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const delete_statelist = (newstate) => dispatch => {
  axiosInstance.delete(uri + '/' + newstate.STATE_ID, newstate).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_STATE_LIST,
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