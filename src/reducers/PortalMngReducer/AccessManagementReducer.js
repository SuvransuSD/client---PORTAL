import { CHECK_ACCESS, CREATE_ACCESS, FIND_ACCESS, GET_MOULES } from "../../actions/types";
const initialState = {
  modules: [],
  access: [],
  Permission: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOULES:
      return {
        ...state,
        modules: action.payload,
      };

    case CREATE_ACCESS:
      return {
        ...state
      };

    case FIND_ACCESS:
      return {
        ...state,
        access: action.payload,
      };
    case CHECK_ACCESS:
      return {
        ...state,
        accesspermission: action.payload,
      };

    default:
      return state;
  }
}

