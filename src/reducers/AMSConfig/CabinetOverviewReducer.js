import { GET_CABINET_OVERVIEW, UPDATE_CABINET_OVERVIEW } from "../../actions/types";

const initialState = {
    cabinetOverview: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CABINET_OVERVIEW:
            return {
                ...state,
                cabinetOverview: action.payload,
            };
        case UPDATE_CABINET_OVERVIEW:
            return {
                ...state,
                cabinetOverview: action.payload,
            };

        default:
            return state;
    }
}

