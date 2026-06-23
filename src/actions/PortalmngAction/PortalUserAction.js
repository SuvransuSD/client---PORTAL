import axiosInstance from "../../utils/axiosInstance";
import { CREATE_PORTAL_USER, DELETE_PORTAL_USER, GET_PORTAL_USER, UPDATE_PROTAL_USER, UPDATE_LAST_LOGIN } from "../types";

var uri = "/api/Portal_Management/portal-user"

export const create_protalUser = (newuser) => dispatch => {
  axiosInstance.post(uri, newuser).then((result) => {
    dispatch({
      type: CREATE_PORTAL_USER,
      payload: result.data,
    });
    dispatch(get_protalUser());
  })
    .then(() => {
      alert('User created successfully!!');
    })
    .catch((err) => {
      console.log(err);
      alert('Failed to create user. Please try again.');
    })
}

export const update_protalUser = (newuser) => dispatch => {
  axiosInstance.put(uri + '/' + newuser.USER_ID, newuser).then((result) => {
    dispatch({
      type: UPDATE_PROTAL_USER,
      payload: result.data,
    });
    dispatch(get_protalUser());
  })
    .then(() => {
      alert('Updated successfully!!');
    })
    .catch((err) => {
      console.log(err);
      alert('Failed to update user. Please try again.');
    })
}

export const get_protalUser = () => dispatch => {
  axiosInstance.get(uri).then((result) => {
    dispatch({
      type: GET_PORTAL_USER,
      payload: result.data,
    })
  }).catch((err) => {
    console.log(err)
  })
}

export const delete_protalUser = (newuser) => dispatch => {
  axiosInstance.delete(uri + '/' + newuser.USER_ID).then((result) => {
    dispatch({
      type: DELETE_PORTAL_USER,
      payload: result.data,
    });
    dispatch(get_protalUser());
  })
    .then(() => {
      alert('Deleted successfully!!');
    })
    .catch((err) => {
      console.log(err);
      alert('Failed to delete user. Please try again.');
    })
}

export const update_lastlogin = (lastlogin) => dispatch => {
  axiosInstance.put(uri + '/updatelastlogin/' + lastlogin.getUser, lastlogin).then((result) => {
    dispatch({
      type: UPDATE_LAST_LOGIN,
      payload: result.data,
    });
  })
    .catch((err) => {
      console.log(err)
    })
}
