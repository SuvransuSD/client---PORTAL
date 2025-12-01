import axiosInstance from "../../utils/axiosInstance";
import { GET_MANAGE_ROLES_FORM, UPDATE_MANAGE_ROLES_FORM } from "../types";
import staticData from "./AmsConfig.json"
var uri = "/api/AMS_Configuration/"


// actions

export const get_manage_roles_form = (data) => dispatch => {
  dispatch({
    type: GET_MANAGE_ROLES_FORM,
    payload: staticData.manageRolesForm
  })

}

export const update_manage_roles_form = (data) => dispatch => {
  dispatch({
    type: UPDATE_MANAGE_ROLES_FORM,
    payload: data
  })

}