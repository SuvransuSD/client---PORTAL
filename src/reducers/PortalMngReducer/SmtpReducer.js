import { CREATE_FIRMWARE, CREATE_SMTP, GET_OTA, UPDATE_FIRMWARE } from "../../actions/types";


const initialState = {
  users: [],
  firmwaredata: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_SMTP:
      return {
        ...state,
        users: state.users,
      }
    case GET_OTA:
      return {
        ...state,
        firmwaredata: action.payload
      }
    case CREATE_FIRMWARE:
      return {
        ...state,
      }
    case UPDATE_FIRMWARE:
      return {
        ...state,
      }




    default:
      return state;
  }
}

