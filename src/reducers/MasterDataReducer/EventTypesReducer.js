import { CREATE_EVENT_TYPES, GET_EVENT_TYPES, UPDATE_EVENT_TYPES, DELETE_EVENT_TYPES } from "../../actions/types";


const initialState = {
    event: [
        // {Event_Name: 'Activity Code Entry Timeout',Event_Type:'Alarm'},
        // {Event_Name: 'Emergency Door Open',Event_Type:'Exception'},
        // {Event_Name: 'Key Returned at Wrong Slot',Event_Type:'Alarm'},
        // {Event_Name: 'Key Returned at Correct Slot',Event_Type:'Alarm'},
        // {Event_Name: 'Wrong Key Taken	',Event_Type:'Exception'},
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENT_TYPES:
            return {
                ...state,
                event: action.payload,
            };

        case CREATE_EVENT_TYPES:
            return {
                ...state,
                event: [action.payload, ...state.event],
            };


        case UPDATE_EVENT_TYPES:
            return {
                ...state,
                event: state.event.map((event) =>
                    event.id == action.payload.id ? action.payload : event
                ),
            };
        case DELETE_EVENT_TYPES:
            return {
                ...state,
                event: state.event.filter(
                    (event) => event.id != action.payload.id
                ),
            };

        default:
            return state;
    }
}