import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, STOP_VERIFYING_LOCATION, VERIFYING_LOCATION} from '../types';

const initialState = {
    loading: false,
    errors: null,
    verifyingLocation: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ERRORS:
          console.log('finding error in reducer: ', action);
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case VERIFYING_LOCATION:
          return {
            ...state,
            verifyingLocation: true
          }
        case STOP_VERIFYING_LOCATION:
          return {
            ...state,
            verifyingLocation: false
          }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
              ...state,
              loading: false
            }
        default:
            return state;
    }
}
