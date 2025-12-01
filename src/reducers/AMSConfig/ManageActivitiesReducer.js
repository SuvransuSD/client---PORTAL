import { GET_MANAGE_ACTIVITIES_FORM, UPDATE_MANAGE_ACTIVITIES_FORM } from "../../actions/types";

const initialState = {
    manageActivitiesForm: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MANAGE_ACTIVITIES_FORM:
            return {
                ...state,
                manageActivitiesForm: action.payload,
            };
        case UPDATE_MANAGE_ACTIVITIES_FORM:
            return {
                ...state,
                manageActivitiesForm: action.payload,
            };

        default:
            return state;
    }
}

