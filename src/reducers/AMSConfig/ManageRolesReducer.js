import { GET_MANAGE_ROLES_FORM, UPDATE_MANAGE_ROLES_FORM } from "../../actions/types";

const initialState = {
    manageRolesForm: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MANAGE_ROLES_FORM:
            return {
                ...state,
                manageRolesForm: action.payload,
            };
        case UPDATE_MANAGE_ROLES_FORM:
            return {
                ...state,
                manageRolesForm: action.payload,
            };

        default:
            return state;
    }
}

