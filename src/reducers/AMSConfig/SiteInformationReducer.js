import { GET_SITE_INFORMATION, UPDATE_SITE_INFORMATION } from "../../actions/types";

const initialState = {
    siteInforamation: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SITE_INFORMATION:
            return {
                ...state,
                siteInforamation: action.payload,
            };
        case UPDATE_SITE_INFORMATION:
            return {
                ...state,
                siteInforamation: action.payload,
            };

        default:
            return state;
    }
}

