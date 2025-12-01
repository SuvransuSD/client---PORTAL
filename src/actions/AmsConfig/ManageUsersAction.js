import axiosInstance from "../../utils/axiosInstance";
import { GET_MANAGE_ACTIVITIES_FORM, GET_MANAGE_USERS_FORM, UPDATE_MANAGE_USERS_FORM } from "../types";
import staticData from "./AmsConfig.json"
var uri = "/api/AMS_Configuration/"



export const get_manage_users_form = (selectedro) => dispatch => {

  const MYURL = uri + `get-manage-users/` + selectedro;
  axiosInstance.get(MYURL).then((result) => {
    if (result) {
      console.log(result.data);
      dispatch({
        type: GET_MANAGE_USERS_FORM,
        payload: result.data,
      })  
}

}).catch((err) => {
  console.log(err)
})
}



export const Create_manage_users_form = (userdata,callback) => dispatch => {

  const MYURL = uri + `get-manage-users`;
  axiosInstance.post(MYURL,userdata).then((result) => {
    if (result) {
      callback();
      alert('User created successfully');
    }
})
}

export const Update_manage_users_form = (userdata,callback) => dispatch => {

  const MYURL = uri + `get-manage-users`;
  axiosInstance.put(MYURL,userdata).then((result) => {
    callback();
    alert('Updated successfully');

})
}

export const delete_manage_users_form = (userdata,callback) => dispatch => {
  console.log("userdata",userdata.USER_ID);
  const MYURL = uri + `get-manage-users` + '/' + userdata.USER_ID +'/'+userdata.RO_ID;
  axiosInstance.delete(MYURL,userdata).then((result) => {
    callback();
    alert('Deleted successfully');

})
}




export const get_manage_activities_form = (selectedro) => dispatch => {

  const MYURL = uri + `get-manage-activities/` + selectedro;
  axiosInstance.get(MYURL).then((result) => {
    if (result) {
      dispatch({
        type: GET_MANAGE_ACTIVITIES_FORM,
        payload: result.data,
      })  
}

}).catch((err) => {
  console.log(err)
})
}



export const Create_manage_Activity_form = (userdata,callback) => dispatch => {

  const MYURL = uri + `get-manage-activities`;
  axiosInstance.post(MYURL,userdata).then((result) => {
    if (result) {
      callback();
      alert('Created successfully');
    }
})
}

export const Update_manage_Activity_form = (userdata,callback) => dispatch => {
  const MYURL = uri + `get-manage-activities`;
  axiosInstance.put(MYURL,userdata).then((result) => {
    if(result){
      callback();
      alert('Updated successfully');
    }

})
}

export const delete_manage_Activity_form = (userdata,callback) => dispatch => {
  const MYURL = uri + `get-manage-users` + '/' + userdata;
  axiosInstance.delete(MYURL,userdata).then((result) => {
    callback();
    alert('Deleted successfully');

})
}

