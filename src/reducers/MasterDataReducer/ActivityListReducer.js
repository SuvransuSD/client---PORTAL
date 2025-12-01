import { CREATE_ACTIVITY_LIST, GET_ACTIVITY_LIST, UPDATE_ACTIVITY_LIST, DELETE_ACTIVITY_LIST } from "../../actions/types";



const initialState = {
    activity: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVITY_LIST:
            return {
                ...state,
                activity: action.payload,
            };

        case CREATE_ACTIVITY_LIST:
            return {
                ...state,
                activity: [action.payload, ...state.activity],
            };


        case UPDATE_ACTIVITY_LIST:
            return {
                ...state,
                activity: state.activity.map((activity) =>
                    activity.id == action.payload.id ? action.payload : activity
                ),
            };
        case DELETE_ACTIVITY_LIST:
            return {
                ...state,
                activity: state.activity.filter(
                    (activity) => activity.id != action.payload.id
                ),
            };
        default:
            return state;
    }
}