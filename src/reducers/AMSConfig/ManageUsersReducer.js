import { CREATE_MANAGE_USERS_FORM, GET_MANAGE_USERS_FORM, UPDATE_MANAGE_USERS_FORM } from "../../actions/types";

const initialState = {
    manageUsersForm: [],
    manageActivaty: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MANAGE_USERS_FORM:
            return {
                ...state,
                manageUsersForm: action.payload,
            };

        case CREATE_MANAGE_USERS_FORM:
            return {
                ...state,
                manageUsersForm: action.payload,
            };
        case UPDATE_MANAGE_USERS_FORM:
            return {
                ...state,
                manageUsersForm: action.payload,
            };

        default:
            return state;
    }
}

