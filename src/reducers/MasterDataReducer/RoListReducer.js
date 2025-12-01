import { CREATE_RO_LIST, GET_RO_LIST, UPDATE_RO_LIST, DELETE_RO_LIST } from "../../actions/types";



const initialState = {
    ro: [
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RO_LIST:
            return {
                ...state,
                ro: action.payload,
            };

        case CREATE_RO_LIST:
            return {
                ...state,
                ro: [action.payload, ...state.ro],
            };


        case UPDATE_RO_LIST:
            return {
                ...state,
                ro: state.ro.map((ro) =>
                    ro.id == action.payload.id ? action.payload : ro
                ),
            };
        case DELETE_RO_LIST:
            return {
                ...state,
                ro: state.ro.filter(
                    (ro) => ro.id != action.payload.id
                ),
            };

        default:
            return state;
    }
}