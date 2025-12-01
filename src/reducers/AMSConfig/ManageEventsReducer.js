import { GET_MANAGE_EVENTS_FORM, UPDATE_MANAGE_EVENTS_FORM, DELETE_MANAGE_EVENT_FORM, CREATE_MANAGE_EVENT_FORM } from "../../actions/types";

const initialState = {
    manageEventsForm: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MANAGE_EVENTS_FORM:
            return {
                ...state,
                event: [action.payload, ...state.event],
            };
        case UPDATE_MANAGE_EVENTS_FORM:
            return {
                ...state,
                event: state.event.map((event) =>
                    event.id == action.payload.id ? action.payload : event
                ),
            };
        case DELETE_MANAGE_EVENT_FORM:
            return {
                ...state,
                event: state.event.filter(
                    (event) => event.id != action.payload.id
                ),
            };
        case CREATE_MANAGE_EVENT_FORM:
            return {
                ...state,
                event: [action.payload, ...state.event],
            };

        default:
            return state;
    }
}

