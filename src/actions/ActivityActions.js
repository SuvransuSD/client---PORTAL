import {
  RETRIEVE_ACTIVITY,
  GET_ERRORS,
  FETCH_ACTIVITY,
  DELETE_ACTIVITY,
  NEW_ACTIVITY
} from './types';
import qs from 'qs';
import { apis } from '../constants';

export const createActivity = (reqData, history) => dispatch => {
  fetch(apis.createActivity, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': JSON.parse(sessionStorage.getItem("token"))
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(body => {
      if (body.status === true) {
        dispatch({
          type: NEW_ACTIVITY,
          payload: body.message
        });
        // history.push('/settings');
        window.location.reload();
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: body.error
        });
      }
    });
};



export const fetchActivity = reqData => dispatch => {
  fetch(apis.getActivity, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      //'x-access-token': JSON.parse(sessionStorage.getItem("token"))
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        dispatch({
          type: FETCH_ACTIVITY,
          payload: resData.data
        })
      }
      else {
        dispatch({
          type: GET_ERRORS,
          payload: resData.error
        });
      }
    }
    );
};




export const retrieveActivity = dataQry => dispatch => {
  fetch(apis.retrieveActivity, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': JSON.parse(sessionStorage.getItem("token"))
    },
    method: 'POST',
    body: qs.stringify(dataQry)
  })
    .then(res => res.json())
    .then(body => {
      if (body.status === true) {
        dispatch({
          type: RETRIEVE_ACTIVITY,
          payload: body.data
        })
      }
      else {
        dispatch({
          type: GET_ERRORS,
          payload: body.error
        });
      }
    }
    );
};



export const updateActivity = (dataQry, history) => dispatch => {
  fetch(apis.updateActivity, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': JSON.parse(sessionStorage.getItem("token"))
    },
    method: 'POST',
    body: qs.stringify(dataQry)
  })
    .then(res => res.json())
    .then(body => {
      if (body.status === true) {
        history.push('/settings');
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: body.error
        });
      }
    });
};


export const deleteActivity = (reqData) => dispatch => {
  fetch(apis.deleteActivity, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': JSON.parse(sessionStorage.getItem("token"))
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(response => {

      if (response.status === true) {

        dispatch({
          type: DELETE_ACTIVITY,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.error
        });
      }
    }
    )
};
