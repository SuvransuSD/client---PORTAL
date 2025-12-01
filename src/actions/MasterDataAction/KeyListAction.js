import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_KEY_LIST,
  DELETE_KEY_LIST,
  GET_KEY_LIST,
  UPDATE_KEY_LIST
}
  from "../types";

var uri = "/api/Master_Data/key-list"

// actions
export const create_keylist = (newkey) => dispatch => {
  axiosInstance.post(uri, newkey).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_KEY_LIST,
        payload: result.data,
      });
      get_keylist();
    }
  })
    .then(() => {
      alert('Key created successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_keylist = (newkey) => dispatch => {
  axiosInstance.put(uri + '/' + newkey.KEY_ID, newkey).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_KEY_LIST,
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


export const get_keylist = () => dispatch => {

  axiosInstance.get(uri).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_KEY_LIST,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const delete_keylist = (newkey) => dispatch => {
  axiosInstance.delete(uri + '/' + newkey.KEY_ID, newkey).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_KEY_LIST,
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