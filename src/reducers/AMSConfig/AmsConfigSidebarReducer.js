import { AMS_CONFIGURATION_SIDEBAR, AMS_CONFIGURATION_SIDEBAR_SELECTED_RO, SEARCH_SIDEBAR } from "../../actions/types";

const initialState = {
    sidebardata: [],
    seletedRo: {},
    searchsidebar: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AMS_CONFIGURATION_SIDEBAR:
            return {
                ...state,
                sidebardata: action.payload,
            };
        case AMS_CONFIGURATION_SIDEBAR_SELECTED_RO:
            return {
                ...state,
                seletedRo: action.payload,
            };
        case SEARCH_SIDEBAR:
            return {
                ...state,
                searchsidebar: action.payload,
            };

        default:
            return state;
    }
}

