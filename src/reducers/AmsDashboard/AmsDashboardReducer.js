import {
    GET_ACTIVITY, GET_EVENT, GET_ALL_EVENT, GET_ALL_ACTIVITY, GET_USERRELATEDDATA, GET_AMSCABINETSTATUS, GET_OFFLINESITES,
    GET_DONUTCHART, GET_ZEROEVENTS, GET_ZEROACTIVITY, GET_UNAURTHORIZE_EVENT_SITE, GET_EMERGENCY, GET_UNAURTHORIZE_EVENT_SITE_POPUP,
    GET_TOPKEY, GET_EMERGENCY_POPUP, GET_ZEROPOPUP, GET_UNREGISTERED_POPUP, GET_LOGIN_ACTIVITY, GET_ONLINE_SITES, GET_OFFLINE_SITES,
    GET_TOTAL_SITES, GET_USERWITHROCODE, GET_EVENT_SITE, GET_EVENT_SITE_POPUP, GET_ACTIVITY_SITE, GET_ACTIVTIY_SITE_POPUP,
    GET_ZEROEVENT_SITE_POPUP, GET_ZEROACTIVITY_SITE_POPUP, GET_ACCESS_LIST, GET_PINACCESS_POPUP, GET_BIOACCESS_POPUP, GET_WEBACCESS_POPUP, GET_NOBOX_POPUP,
    GET_NOACTIVITY_BOX, GET_TOTALEVENTTYPE_DESC, GET_TOTALEVENT_DESC, GET_TESTACT_COUNT, GET_TESTACT_POPUP, GET_NOTESTACT_POPUP, GET_KEYSBYACT, GET_BATTERY,
    GET_PINPLUSWEBACCESS_POPUP,
} from "../../actions/types";

const initialState = {
    events: [],
    searchevents: [],
    searchactivity: [],
    activityreport: [],
    userrelateddata: [],
    cabinetstatus: [],
    offlinesites: [],
    donutchart: [],
    zeroevents: [],
    zeroactivity: [],
    unaurthorize_event_site: [],
    unaurthorize_event_site_popup: [],
    emergencydoor: [],
    emergencydoorpopup: [],
    topkey: [],
    zeropopups: [],
    unregisteredpopups: [],
    loginactivityreport: [],
    onlinesites: [],
    totalsites: [],
    userwithro: [],
    eventlists: [],
    eventlists_popup: [],
    activitylists: [],
    activitylists_popup: [],
    zeroeventlists_popup: [],
    zeroactivitylists_popup: [],
    accesslists: [],
    pinsaccess_popup: [],
    bioaccess_popup: [],
    websaccess_popup: [],
    pinwebaccess_popup: [],
    noboxs_popup: [],
    noactivityboxs: [],
    totalevent_descs: [],
    totaleventtype_descs: [],
    testact_counts: [],
    testact_popups: [],
    notestact_popups: [],
    keysbyactivity: [],
    get_batterys: []
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
                searchevents: action.payload,
            };

        case GET_ACTIVITY:
            return {
                ...state,
                activityreport: action.payload,
            };

        case GET_ALL_ACTIVITY:
            return {
                ...state,
                searchactivity: action.payload,
            };

        case GET_USERRELATEDDATA:
            return {
                ...state,
                userrelateddata: action.payload,
            };
        case GET_USERWITHROCODE:
            return {
                ...state,
                userwithro: action.payload,
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
        case GET_ZEROPOPUP:
            return {
                ...state,
                zeropopups: action.payload,
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
        case GET_UNAURTHORIZE_EVENT_SITE_POPUP:
            return {
                ...state,
                unaurthorize_event_site_popup: action.payload,
            };
        case GET_EMERGENCY:
            return {
                ...state,
                emergencydoor: action.payload,
            };
        case GET_EMERGENCY_POPUP:
            return {
                ...state,
                emergencydoorpopup: action.payload,
            };
        case GET_TOPKEY:
            return {
                ...state,
                topkey: action.payload,
            };

        case GET_UNREGISTERED_POPUP:
            return {
                ...state,
                unregisteredpopups: action.payload,
            };
        case GET_LOGIN_ACTIVITY:
            return {
                ...state,
                loginactivityreport: action.payload,
            };

        case GET_ONLINE_SITES:
            return {
                ...state,
                onlinesites: action.payload,
            };
        case GET_OFFLINE_SITES:
            return {
                ...state,
                offlinesites: action.payload,
            };
        case GET_TOTAL_SITES:
            return {
                ...state,
                totalsites: action.payload,
            };
        case GET_EVENT_SITE:
            return {
                ...state,
                eventlists: action.payload,
            };
        case GET_EVENT_SITE_POPUP:
            return {
                ...state,
                eventlists_popup: action.payload,
            };
        case GET_ACTIVITY_SITE:
            return {
                ...state,
                activitylists: action.payload,
            };
        case GET_ACTIVTIY_SITE_POPUP:
            return {
                ...state,
                activitylists_popup: action.payload,
            };
        case GET_ZEROEVENT_SITE_POPUP:
            return {
                ...state,
                zeroeventlists_popup: action.payload,
            };
        case GET_ZEROACTIVITY_SITE_POPUP:
            return {
                ...state,
                zeroactivitylists_popup: action.payload,
            };
        case GET_ACCESS_LIST:
            return {
                ...state,
                accesslists: action.payload,
            };
        case GET_PINACCESS_POPUP:
            return {
                ...state,
                pinsaccess_popup: action.payload,
            };
        case GET_BIOACCESS_POPUP:
            return {
                ...state,
                bioaccess_popup: action.payload,
            };
        case GET_WEBACCESS_POPUP:
            return {
                ...state,
                websaccess_popup: action.payload,
            };
        case GET_PINPLUSWEBACCESS_POPUP:
            return {
                ...state,
                pinwebaccess_popup: action.payload,
            };
        case GET_NOBOX_POPUP:
            return {
                ...state,
                noboxs_popup: action.payload,
            };
        case GET_NOACTIVITY_BOX:
            return {
                ...state,
                noactivityboxs: action.payload,
            };
        case GET_TOTALEVENT_DESC:
            return {
                ...state,
                totalevent_descs: action.payload,
            };
        case GET_TOTALEVENTTYPE_DESC:
            return {
                ...state,
                totaleventtype_descs: action.payload,
            };
        case GET_TESTACT_COUNT:
            return {
                ...state,
                testact_counts: action.payload,
            };
        case GET_TESTACT_POPUP:
            return {
                ...state,
                testact_popups: action.payload,
            };
        case GET_NOTESTACT_POPUP:
            return {
                ...state,
                notestact_popups: action.payload,
            };
        case GET_KEYSBYACT:
            return {
                ...state,
                keysbyactivity: action.payload,
            };
        case GET_BATTERY:
            return {
                ...state,
                get_batterys: action.payload,
            };

        default:
            return state;
    }
}

