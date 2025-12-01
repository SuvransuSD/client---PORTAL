import {
  GET_ERRORS,
  FETCH_EVENTLOGS,
  FETCH_TOP_KEYS,
  ACKNOWLEDGE_EVENTLOGS,
  UNACKNOWLEDGE_COUNT,
  FETCH_TOP_USERS
} from './types';
import qs from 'qs';
var { mainUrl } = require('../model');




export const fetchEventLog = reqData => dispatch => {
  fetch(mainUrl + 'eventLogController/list', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        dispatch({
          type: FETCH_EVENTLOGS,
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

export const fetchEventLogreport = reqData => dispatch => {
  fetch(mainUrl + 'eventLogController/listlog', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        dispatch({
          type: FETCH_EVENTLOGS,
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
    ); console.log("fetchlog-->", reqData);
};

export const acknowledge = (reqData, history) => dispatch => {
  fetch(mainUrl + 'eventLogController/acknowledge', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        console.log("-------->>>>", resData.data)
        dispatch({
          type: ACKNOWLEDGE_EVENTLOGS,
          payload: resData.data
        })
        console.log("Reqdata-->", reqData);
        console.log("History-->", history);
        history.push('/alarms');
        //window.location.reload();
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

export const fetchTopKeys = reqData => dispatch => {
  fetch(mainUrl + 'eventLogController/topKeys', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        dispatch({
          type: FETCH_TOP_KEYS,
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

export const fetchTopUsers = reqData => dispatch => {
  fetch(mainUrl + 'eventLogController/topUsers', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        dispatch({
          type: FETCH_TOP_USERS,
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

export const fetchUnacknowledge = reqData => dispatch => {
  fetch(mainUrl + 'eventLogController/ackCount', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: qs.stringify(reqData)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.status === true) {
        dispatch({
          type: UNACKNOWLEDGE_COUNT,
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













