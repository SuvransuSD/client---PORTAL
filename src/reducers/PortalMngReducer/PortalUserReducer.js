import { CREATE_PORTAL_USER, DELETE_PORTAL_USER, GET_PORTAL_USER, UPDATE_PROTAL_USER, UPDATE_LAST_LOGIN } from "../../actions/types";
const initialState = {
  users: [

  ]

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PORTAL_USER:
      return {
        ...state,
        users: action.payload,
      };

    case CREATE_PORTAL_USER:
      return {
        ...state,
        users: state.users,
      };


    case UPDATE_PROTAL_USER:
      return {
        ...state,
        users: state.users,
      };
    case DELETE_PORTAL_USER:
      return {
        ...state,
        users: state.users,
      };
    case UPDATE_LAST_LOGIN:
      return {
        ...state,
        users: state.users,
      };

    default:
      return state;
  }
}

