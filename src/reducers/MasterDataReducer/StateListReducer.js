import { CREATE_STATE_LIST, GET_STATE_LIST, UPDATE_STATE_LIST, DELETE_STATE_LIST } from "../../actions/types";



const initialState = {
    states: [
    ]

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STATE_LIST:
            return {
                ...state,
                states: action.payload,
            };

        case CREATE_STATE_LIST:
            return {
                ...state,
                states: state.states,
            };


        case UPDATE_STATE_LIST:
            return {
                ...state,
                states: state.states,
            };
        case DELETE_STATE_LIST:
            return {
                ...state,
                states: state.states,
            }

        default:
            return state;
    }
}