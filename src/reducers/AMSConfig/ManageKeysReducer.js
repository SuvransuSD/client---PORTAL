import { GET_MANAGE_KEYS_FORM, UPDATE_MANAGE_KEYS_FORM } from "../../actions/types";

const initialState = {
    manageKeysForm: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MANAGE_KEYS_FORM:
            return {
                ...state,
                manageKeysForm: action.payload,
            };
        case UPDATE_MANAGE_KEYS_FORM:
            return {
                ...state,
                manageKeysForm: action.payload,
            };

        default:
            return state;
    }
}

