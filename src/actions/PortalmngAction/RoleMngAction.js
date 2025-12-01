import { mainUrl } from "../../model";
import axiosInstance from "../../utils/axiosInstance";
import { CREATEROLE, DELETEROLE, GETROLE, UPDATEROLE } from "../types";


var uri = "/api/Portal_Management/role-and-access-rights"

// actions
export const create_roleAccess = (newuser) => dispatch => {
  axiosInstance.post(uri, newuser).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATEROLE,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('Role created successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}


export const update_roleAcces = (newuser) => dispatch => {
  axiosInstance.put(uri + '/' + newuser.ROLE_ID, newuser).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATEROLE,
        payload: result.data,
      });
    }
  })
    .then(() => {
      alert('Role Updated successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}


export const get_roleAcces = () => dispatch => {
  axiosInstance.get(uri).then((result) => {

    if (result.status == 200) {
      dispatch({
        type: GETROLE,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })


}


  // delete a contact
  // export const delete_roleAcces = (id) => ({
  //   type: DELETEROLE,
  //   payload: id,
  // });


