import { GET_RO, GET_STATE, GET_ZONE } from "../../actions/types";

const initialState = {
  Zone: [],
  States: [],
  RO: []

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ZONE:
      return {
        ...state,
        Zone: action.payload,
      };

    case GET_STATE:
      return {
        ...state,
        States: action.payload,
      };


    case GET_RO:
      return {
        ...state,
        RO: action.payload,
      };

    default:
      return state;
  }
}

