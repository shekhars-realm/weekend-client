import {
  LOADING_DATA,
  SET_LOCATIONS,
  ADD_EVENT
} from '../types';
const initialState = {
  shouts: [],
  shout: {},
  events: [],
  locations: [],
  event: {},
  loading: false
};

export default function(state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case ADD_EVENT:
      return {
        ...state,
        locations: [
          action.payload,
          ...state.locations
        ]
      }
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}
