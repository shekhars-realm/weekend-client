import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADIN_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  MARK_NOTIFICATIONS_READ,
  SET_USER_LOCATION,
  SET_USER_FILTER
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    userLocation: {

    },
    credentials: {

    },
    filter: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                credentials: action.payload
            };
        case SET_USER_FILTER:
          return {
            ...state,
            filter: action.payload
          };
        case LOADING_USER:
            return {
              ...state,
              loading: true
            }
        default:
            return state;
    }
}
