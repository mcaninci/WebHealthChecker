import {ALL_USERS, LOGIN_SUCCESS,LOGOUT_SUCCESS, DONATE_SUCCESS,LOAD_USER,UPDATE_URL} from '../actions/types';

const intialState = {
  isAuthenticated: false,
  user: null,
  userDetail:null,
  allUsers: [],
  myID: null,
  updateurl:false,
};

export default (state = intialState, {payload, type}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: false,
        };
      case DONATE_SUCCESS:  
      return {
        ...state,
        ...payload,
        donate: true,
      };
      case LOAD_USER:  
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
      case UPDATE_URL:  
      return {
        ...state,
        ...payload,
        updateurl: payload.updateurl
      };
    case ALL_USERS:
      return {
        ...state,
        allUsers: [...state.allUsers, ...payload],
      };

    case 'ADD_NEW_USER':
      const withNewUser = state.allUsers
        .filter(({email}) => email !== payload[0].email)
        .concat(payload);

      return {
        ...state,
        allUsers: withNewUser,
      };
    default:
      return state;
  }
};
