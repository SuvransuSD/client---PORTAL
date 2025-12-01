import {

  FETCH_TOP_USERS
} from '../actions/types';

const initialState = {

  topUsers: [],

};

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCH_TOP_USERS:
      return {
        ...state,
        topUsers: action.payload
      };

    default:
      return state;
  }
}
