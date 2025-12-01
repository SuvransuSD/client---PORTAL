import { AUTH_LOGIN, UPDATE_LOGIN_ATTEMPTS } from "../../actions/types";
const initialState = {
  user: [

  ],
  failedLoginAttempts: 1

};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_LOGIN_ATTEMPTS:
      return {
        ...state,
        failedLoginAttempts: state.failedLoginAttempts + 1, //how to increment the count by 1??
      };


    default:
      return state;
  }
}


