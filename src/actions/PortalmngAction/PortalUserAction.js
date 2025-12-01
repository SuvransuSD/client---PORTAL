import axiosInstance from "../../utils/axiosInstance";
import { CREATE_PORTAL_USER, DELETE_PORTAL_USER, GET_PORTAL_USER, UPDATE_PROTAL_USER, UPDATE_LAST_LOGIN } from "../types";

var uri = "/api/Portal_Management/portal-user"

// actions

export const create_protalUser = (newuser) => dispatch => {
  axiosInstance.post(uri, newuser).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_PORTAL_USER,
        payload: result.data,
      });
      get_protalUser();
    }
  })
    .then(() => {
      alert('User created successfully!!');
      //window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_protalUser = (newuser) => dispatch => {
  axiosInstance.put(uri + '/' + newuser.USER_ID, newuser).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_PROTAL_USER,
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


export const get_protalUser = () => dispatch => {

  axiosInstance.get(uri).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_PORTAL_USER,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const delete_protalUser = (newuser) => dispatch => {
  axiosInstance.delete(uri + '/' + newuser.USER_ID, newuser).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_PORTAL_USER,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('Deeted successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_lastlogin = (lastlogin) => dispatch => {
  axiosInstance.put(uri + '/updatelastlogin/' + lastlogin.getUser, lastlogin).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_LAST_LOGIN,
        payload: result.data,
      });
    }
  })
    .then(() => {
      //alert('Updated successfully!!');
      //window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}


