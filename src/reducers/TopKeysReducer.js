import {
  FETCH_TOP_KEYS,

} from '../actions/types';

const initialState = {
  topKeys: [],

  // key: {},
  //  singleEvent: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_KEYS:
      return {
        ...state,
        topKeys: action.payload
      };

    // break;
    default:
      return state;
  }
}
