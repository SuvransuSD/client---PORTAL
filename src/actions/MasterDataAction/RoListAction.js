import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_RO_LIST,
  DELETE_RO_LIST,
  GET_RO_LIST,
  UPDATE_RO_LIST,
  GET_STATE
}
  from "../types";

var uri = "/api/Master_Data/ro-list"

// actions
export const create_rolist = (newro) => dispatch => {
  axiosInstance.post(uri, newro).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_RO_LIST,
        payload: result.data,
      });
      get_rolist();
    }
  })
    .then(() => {
      alert('Ro created successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_rolist = (newro) => dispatch => {
  axiosInstance.put(uri + '/' + newro.RO_ID, newro).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_RO_LIST,
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


export const get_rolist = () => dispatch => {

  axiosInstance.get(uri).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_RO_LIST,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const delete_rolist = (newro) => dispatch => {
  axiosInstance.delete(uri + '/' + newro.RO_ID, newro).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_RO_LIST,
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

export const get_state = () => dispatch => {
  axiosInstance.get(uri + 'get_state').then((result) => {
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