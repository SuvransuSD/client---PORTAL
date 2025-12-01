import { GET_STATE_CODE } from "../../actions/types";

const initialState = {
  stccode: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_STATE_CODE:
      return {
        ...state,
        stccode: action.payload,
      };

    default:
      return state;
  }
}

