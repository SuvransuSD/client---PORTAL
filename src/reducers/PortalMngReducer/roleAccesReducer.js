import { CREATEROLE, GETROLE, UPDATEROLE } from "../../actions/types";


const initialState = {
  users: []

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GETROLE:
      return {
        ...state,
        users: action.payload,
      };

    case CREATEROLE:
      return {
        ...state,
        users: state.users,
      }

    case UPDATEROLE:
      return {
        ...state,
        users: state.users,
      };


    // case DELETEROLE:
    //   return {
    //     ...state,
    //     contacts: state.contacts.filter(
    //       (contact) => contact.id != action.payload
    //     ),
    //   };
    default:
      return state;
  }
}

