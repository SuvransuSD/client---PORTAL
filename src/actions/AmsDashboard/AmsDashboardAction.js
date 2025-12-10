import axiosInstance from "../../utils/axiosInstance";
import {
  GET_ACTIVITY,
  GET_ALL_ACTIVITY,
  GET_AMSCABINETSTATUS,
  GET_TOPKEY,
  GET_DONUTCHART,
  GET_EVENT,
  GET_ALL_EVENT,
  GET_OFFLINESITES,
  GET_UNAURTHORIZE_EVENT_SITE,
  GET_UNAURTHORIZE_EVENT_SITE_POPUP,
  GET_USERRELATEDDATA,
  GET_ZEROACTIVITY,
  GET_ZEROEVENTS,
  GET_EMERGENCY,
  GET_EMERGENCY_POPUP,
  GET_ZEROPOPUP,
  GET_UNREGISTERED_POPUP,
  GET_LOGIN_ACTIVITY,
  GET_ONLINE_SITES,
  GET_OFFLINE_SITES,
  GET_TOTAL_SITES,
  GET_USERWITHROCODE,
  GET_EVENT_SITE,
  GET_EVENT_SITE_POPUP,
  GET_ACTIVITY_SITE,
  GET_ACTIVTIY_SITE_POPUP,
  GET_ZEROEVENT_SITE_POPUP,
  GET_ZEROACTIVITY_SITE_POPUP,
  GET_ACCESS_LIST,
  GET_PINACCESS_POPUP,
  GET_BIOACCESS_POPUP,
  GET_WEBACCESS_POPUP,
  GET_PINPLUSWEBACCESS_POPUP,
  GET_FPACCESS_POPUP,
  GET_NOBOX_POPUP,
  GET_NOACTIVITY_BOX,
  GET_TOTALEVENT_DESC,
  GET_TOTALEVENTTYPE_DESC,
  GET_TESTACT_COUNT,
  GET_TESTACT_POPUP,
  GET_NOTESTACT_POPUP,
  GET_KEYSBYACT,
  GET_BATTERY,
  CLEAR_CAPTCHA_VALUE
} from "../types";
var uri = "/api/AMS_Dashboard/"

// actions

export const get_events = (eventdata) => dispatch => {
  const MYURL = uri + 'get-events';
  axiosInstance.post(MYURL, eventdata).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_EVENT,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_all_events = (searchdata) => dispatch => {
  console.log('Rocode-', searchdata);
  const MYURL = uri + 'get-all-events';
  axiosInstance.post(MYURL, searchdata).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_ALL_EVENT,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}

export const get_activity = (eventdata) => dispatch => {
  const MYURL = uri + 'get-activity-report';
  axiosInstance.post(MYURL, eventdata).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ACTIVITY,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}


export const get_all_activity = (searchdata) => dispatch => {
  console.log('Rocode-', searchdata);
  const MYURL = uri + 'get-all-activities';
  axiosInstance.post(MYURL, searchdata).then((result) => {
    if (result.status == 201) {

      dispatch({
        type: GET_ALL_ACTIVITY,
        payload: result.data,
      })
    }

  }).catch((err) => {
    console.log(err)
  })

}


export const getuserrelated = () => dispatch => {
  const MYURL = uri + 'get-user-related-data';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_USERRELATEDDATA,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const getuser_withrocode = (eventdata) => dispatch => {
  const MYURL = uri + 'get-user-related-data';
  axiosInstance.post(MYURL, eventdata).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_USERWITHROCODE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}



export const cabinetstatus = () => dispatch => {
  const MYURL = uri + 'get-cabinet-status';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_AMSCABINETSTATUS,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}



export const offlinesites = () => dispatch => {
  const MYURL = uri + 'get-offline-sites';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_OFFLINESITES,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const zeroevents = () => dispatch => {
  const MYURL = uri + 'get-zeroevenets';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ZEROEVENTS,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const zeropopup = () => dispatch => {
  const MYURL = uri + 'get-zeropopup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ZEROPOPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}


export const zeroactivity = () => dispatch => {
  const MYURL = uri + 'get-zero-activity';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ZEROACTIVITY,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const unaurthorize_event_site = () => dispatch => {
  const MYURL = uri + 'get_unaurthorize_event_site';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_UNAURTHORIZE_EVENT_SITE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const unaurthorize_event_site_popup = () => dispatch => {
  const MYURL = uri + 'get_unaurthorize_event_site_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_UNAURTHORIZE_EVENT_SITE_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const donutchart = () => dispatch => {
  const MYURL = uri + 'get-donutchart';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_DONUTCHART,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const emergencydoor = () => dispatch => {
  const MYURL = uri + 'get-emergencydoor';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_EMERGENCY,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const emergencydoor_popup = () => dispatch => {
  const MYURL = uri + 'get_emergencydoor_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_EMERGENCY_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const topkey = () => dispatch => {
  const MYURL = uri + 'get-topkey';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_TOPKEY,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_unregistered_popup = () => dispatch => {
  const MYURL = uri + 'get_unregistered_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_UNREGISTERED_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_login_activity = (eventdata) => dispatch => {
  const MYURL = uri + 'get-login-activity-report';
  axiosInstance.post(MYURL, eventdata).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_LOGIN_ACTIVITY,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const online_sites = () => dispatch => {
  const MYURL = uri + 'get_online_sites';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ONLINE_SITES,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const offline_sites = () => dispatch => {
  const MYURL = uri + 'get_offline_sites';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_OFFLINE_SITES,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const total_sites = () => dispatch => {
  const MYURL = uri + 'get_total_sites';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_TOTAL_SITES,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const eventlist = () => dispatch => {
  const MYURL = uri + 'get_event_sites';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_EVENT_SITE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const eventlist_popup = () => dispatch => {
  const MYURL = uri + 'get_event_sites_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_EVENT_SITE_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const activitylist = () => dispatch => {
  const MYURL = uri + 'get_activity_sites';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ACTIVITY_SITE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const activitylist_popup = () => dispatch => {
  const MYURL = uri + 'get_activity_sites_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ACTIVTIY_SITE_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const zeroeventlist_popup = () => dispatch => {
  const MYURL = uri + 'get_zero_sites_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ZEROEVENT_SITE_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const zeroactivitylist_popup = () => dispatch => {
  const MYURL = uri + 'get_zero_activity_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ZEROACTIVITY_SITE_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const accesslist = () => dispatch => {
  const MYURL = uri + 'get_access_list';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_ACCESS_LIST,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const pinaccess_popup = () => dispatch => {
  const MYURL = uri + 'get_pinaccess_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_PINACCESS_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const bioaccess_popup = () => dispatch => {
  const MYURL = uri + 'get_bioaccess_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_BIOACCESS_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const webaccess_popup = () => dispatch => {
  const MYURL = uri + 'get_webaccess_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_WEBACCESS_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const pinpluswebaccess_popup = () => dispatch => {
  const MYURL = uri + 'get_pinpluswebaccess_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_PINPLUSWEBACCESS_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const fpaccess_popup = () => dispatch => {
  const MYURL = uri + 'get_fpaccess_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_FPACCESS_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const nobox_popup = () => dispatch => {
  const MYURL = uri + 'get_nobox_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_NOBOX_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const noactivitybox = () => dispatch => {
  const MYURL = uri + 'get_noactivity_box';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_NOACTIVITY_BOX,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const totalevent_desc = () => dispatch => {
  const MYURL = uri + 'get_totalevent_desc';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_TOTALEVENT_DESC,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const totaleventtype_desc = () => dispatch => {
  const MYURL = uri + 'get_totaleventtype_desc';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_TOTALEVENTTYPE_DESC,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const testact_count = () => dispatch => {
  const MYURL = uri + 'get_testact_count';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_TESTACT_COUNT,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const testact_popup = () => dispatch => {
  const MYURL = uri + 'get_testact_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_TESTACT_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const notestact_popup = () => dispatch => {
  const MYURL = uri + 'get_notestact_popup';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_NOTESTACT_POPUP,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const keybyactivity = () => dispatch => {
  const MYURL = uri + 'get_keybyactivity';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_KEYSBYACT,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const get_battery = () => dispatch => {
  const MYURL = uri + 'get_battery';
  axiosInstance.get(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: GET_BATTERY,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}

export const clearCaptcha = () => dispatch => {
  const MYURL = uri + 'clear_captcha';
  axiosInstance.post(MYURL).then((result) => {
    if (result.status) {
      dispatch({
        type: CLEAR_CAPTCHA_VALUE,
        payload: result.data,
      })
    }
  })
    .catch((err) => {
      console.log(err)
    })

}