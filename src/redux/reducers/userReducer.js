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
  SET_USER_LOCATION,
  SET_USER_FILTER,
  SET_LOADED_USER,
  MARK_NOTIFICATIONS_READ,
  DELETE_NOTIFICATION
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    sameUserLoaded: false,
    loadedUser: {

    },
    userLocation: {

    },
    credentials: {

    },
    notifications: [],
    filter: {

    }
};

const startOfWeek = (date) => {
  //Get the start of Each week i.e. Monday
  let diff = date.getDate() - date.getDay() + (
    date.getDay() === 0
    ? -6
    : 1);
  date.setDate(diff);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0)
  date = new Date(date).getTime();
  return [date, date+86400000, date+(86400000*2), date+(86400000*3), date+(86400000*4), date+(86400000*5), date+(86400000*6)]
}

const createSchedule = (date, schedule) => {
  let newSchedule = []
  startOfWeek(date).forEach(elem => {
    let weekDay = elem;
    let events = [];
    if(schedule) {
      schedule.forEach(event => {
        if(new Date(event.startTime).getTime() >= elem && new Date(event.startTime).getTime() < elem+86400000) {
          events.push(event)
        }
      })
    }
    newSchedule.push({
      weekDay, events
    })
  })
  return newSchedule
}


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
              ...state,
              sameUserLoaded: action.payload.credentials.handle === state.loadedUser.handle ? true : false,
              authenticated: true,
              loading: false,
              credentials: action.payload.credentials,
              notifications: action.payload.notifications
            };
        case SET_LOADED_USER:
          action.payload.schedule = createSchedule(new Date(), action.payload.schedule)
          return {
            ...state,
            sameUserLoaded: action.payload.handle === state.credentials.handle ? true : false,
            loading: false,
            loadedUser: action.payload
          }
        case SET_USER_FILTER:
          return {
            ...state,
            filter: {
              ...action.payload
            }
          };
        case LOADING_USER:
          return {
            ...state,
            loading: true
          }
        case DELETE_NOTIFICATION:
          state.user.notifications = state.user.notifications.filter(noti => {
            return noti.notificationId !== action.payload
          })
          return {
            ...state
          }
        default:
            return state;
    }
}
