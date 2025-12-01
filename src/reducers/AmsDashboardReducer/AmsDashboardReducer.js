import { GET_ACTIVITY, GET_AMSCABINETSTATUS, GET_DONUTCHART, GET_EVENT, GET_OFFLINESITES, GET_UNAURTHORIZE_EVENT_SITE, GET_USERRELATEDDATA, GET_ZEROACTIVITY, GET_ZEROEVENTS, GET_ALL_EVENT } from "../../actions/types";

const initialState = {
    events: [],
    allevents: [],
    activityreport: [],
    userrelateddata: [],
    cabinetstatus: [],
    offlinesites: [],
    onlinesites: [],
    donutchart: [],
    zeroevents: [],
    zeroactivity: [],
    unaurthorize_event_site: [],
    accesspermission: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENT:
            return {
                ...state,
                events: action.payload,
            };
        case GET_ALL_EVENT:
            return {
                ...state,
                allevents: action.payload,
            };
        case GET_ACTIVITY:
            return {
                ...state,
                activityreport: action.payload,
            };
        case GET_USERRELATEDDATA:
            return {
                ...state,
                userrelateddata: action.payload,
            };

        case GET_AMSCABINETSTATUS:
            return {
                ...state,
                cabinetstatus: action.payload,
            };

        case GET_OFFLINESITES:
            return {
                ...state,
                offlinesites: action.payload,
            };
        case GET_DONUTCHART:
            return {
                ...state,
                donutchart: action.payload,
            };
        case GET_ZEROEVENTS:
            return {
                ...state,
                zeroevents: action.payload,
            };
        case GET_ZEROACTIVITY:
            return {
                ...state,
                zeroactivity: action.payload,
            };
        case GET_UNAURTHORIZE_EVENT_SITE:
            return {
                ...state,
                unaurthorize_event_site: action.payload,
            };


        default:
            return state;
    }
}

