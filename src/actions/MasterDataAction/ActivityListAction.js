import axiosInstance from "../../utils/axiosInstance";
import {
  CREATE_ACTIVITY_LIST,
  DELETE_ACTIVITY_LIST,
  GET_ACTIVITY_LIST,
  UPDATE_ACTIVITY_LIST
}
  from "../types";

var uri = "/api/Master_Data/activity-list"

// actions

export const create_activitylist = (newactivity) => dispatch => {
  axiosInstance.post(uri, newactivity).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: CREATE_ACTIVITY_LIST,
        payload: result.data,
      });
      get_activitylist();
    }
  })
    .then(() => {
      alert('Activity created successfully!!');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })

}

export const update_activitylist = (newactivity) => dispatch => {
  axiosInstance.put(uri + '/' + newactivity.ACTIVITY_ID, newactivity).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: UPDATE_ACTIVITY_LIST,
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


// export const get_activitylist = () => dispatch => {

//   axiosInstance.get(uri).then((result)=>{
//     if(result.status == 201){

//       dispatch({
//            type: GET_ACTIVITY_LIST,
//           payload: result.data,
//       })
//     }

//   }).catch((err)=>{
//     console.log(err)
//   })

// } 
export const get_activitylist = () => dispatch => {

  const MYURL = uri;
  axiosInstance.get(MYURL).then((result) => {
    if (result) {
      dispatch({
        type: GET_ACTIVITY_LIST,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })
}


export const delete_activitylist = (newactivity) => dispatch => {
  axiosInstance.delete(uri + '/' + newactivity.ACTIVITY_ID, newactivity).then((result) => {
    if (result.status == 200) {
      dispatch({
        type: DELETE_ACTIVITY_LIST,
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