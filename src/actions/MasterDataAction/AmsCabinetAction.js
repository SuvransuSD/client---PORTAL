import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_AMS_CABINET,
  DELETE_AMS_CABINET,
  GET_AMS_CABINET,
  UPDATE_AMS_CABINET
}
  from "../types";

var uri = "/api/Master_Data/ams-cabinet"

// actions
export const create_amscabinet = (newcabinet) => dispatch => {
  axiosInstance.post(uri, newcabinet).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_AMS_CABINET,
        payload: result.data,
      });
      get_amscabinet();
    }
  })
    .then(() => {
      alert('Cabinet created successfully!!');
      //window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_amscabinet = (newcabinet) => dispatch => {
  axiosInstance.put(uri + '/' + newcabinet.CABINET_ID, newcabinet).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_AMS_CABINET,
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


export const get_amscabinet = () => dispatch => {

  axiosInstance.get(uri).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_AMS_CABINET,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const delete_amscabinet = (newcabinet) => dispatch => {
  axiosInstance.delete(uri + '/' + newcabinet.CABINET_ID, newcabinet).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_AMS_CABINET,
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


  // when cabinet starts communicating to central database and if the identified ip address from cabinet is not there in the registered cabinets then it's details gets inserted into unregistered cabinets