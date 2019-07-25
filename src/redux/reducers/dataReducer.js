import {
  LOADING_DATA,
  SET_LOCATIONS,
  ADD_EVENT,
  SET_MEETING_POINT
} from '../types';
const initialState = {
  events: [],
  locations: [],
  event: {},
  meetingPoint: {},
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
    case SET_MEETING_POINT:
      return {
        ...state,
        meetingPoint: action.payload
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
