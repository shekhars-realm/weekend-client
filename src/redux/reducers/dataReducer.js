import {
  LOADING_DATA,
  SET_LOCATIONS,
  ADD_EVENT,
  SET_MEETING_POINT,
  EVENT_ADDED,
  SET_EVENT,
  SET_USER_EVENTS,
  JOIN_EVENT,
  LEAVE_EVENT,
  ALERT_USER,
  DELETE_ALERT
} from '../types';
const initialState = {
  eventAdded: false,
  events: [],
  locations: [],
  eventObj: {},
  meetingPoint: {},
  loading: false,
  eventsJoinedInSession: [],
  alert: {}
};

export default function(state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case DELETE_ALERT:
      return {
        ...state,
        alert: {}
      }
    case ADD_EVENT:
      return {
        ...state,
        locations: [
          action.payload,
          ...state.locations
        ]
      }
    case SET_USER_EVENTS:
      return {
        ...state,
        loading: false,
        events: action.payload
      }
    case SET_EVENT:
      return {
        ...state,
        eventObj: action.payload
      }
    case EVENT_ADDED:
      return {
        ...state,
        eventAdded: true
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
    case JOIN_EVENT:
    state.locations.forEach(event => {
      if(event.eventId === action.payload) {
        event.joined=true
      }
    })
      return {
        ...state
      }
    case LEAVE_EVENT:
      state.locations.forEach(event => {
        if(event.eventId === action.payload) {
          event.joined=false
        }
      })
      return {
        ...state
      }
    case ALERT_USER:
      return {
        ...state,
        alert: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
