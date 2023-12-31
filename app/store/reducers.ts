/* eslint-disable no-case-declarations */
import * as types from './actionTypes.ts';
import storedToken from '../services/security/accessTokenStorage.ts';

export const INITIAL_MAIN_STATE = {
  accessToken: storedToken.get(),
  isAuthenticated: false,
  expirationTime: null,
  user: {},
  users: [],
  reservations: [],
  spots: [],
  availableSpots: [],
  clients: [],
  dialogs: {
    subscribeUser: false,
    getQuoteOfTheDay: false,
    createNewQuote: false,
  },
};

const mainReducer = (state: any = INITIAL_MAIN_STATE, action: any) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const returnedUsers = action.payload;

      return {
        ...state,
        users: returnedUsers,
      };
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
      };

    case types.LOGIN_USER_SUCCESS:
      const returnedAccessTokenValue = action.payload.LoginObj.accessToken;
      return {
        ...state,
        accessToken: returnedAccessTokenValue,
        user: action.payload,
      };

    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.UPDATE_USER_SUCCESS:
      const newUser = action.payload;
      return {
        ...state,
        user: newUser,
      };

    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.FETCH_RESERVATIONS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const retunedReservations = action.payload;

      return {
        ...state,
        reservations: retunedReservations,
      };

    case types.FETCH_RESERVATIONS_FAILURE:
      return {
        ...state,
      };

    case types.FETCH_RESERVATIONS_CLIENT_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const retunedReservationsClients = action.payload;

      return {
        ...state,
        reservations: retunedReservationsClients,
      };

    case types.FETCH_RESERVATIONS_CLIENT_FAILURE:
      return {
        ...state,
      };

    case types.FETCH_SPOTS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const retunedSpots = action.payload;

      return {
        ...state,
        spots: retunedSpots,
      };

    case types.FETCH_SPOTS_FAILURE:
      return {
        ...state,
      };

    case types.CREATE_SPOT_SUCCESS:
      return {
        ...state,
      };

    case types.CREATE_SPOT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.FETCH_CLIENTS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const returnedClients = action.payload;

      return {
        ...state,
        clients: returnedClients,
      };

    case types.FETCH_CLIENTS_FAILURE:
      return {
        ...state,
      };

    case types.CREATE_RESERVATION_SUCCESS:
      return {
        ...state,
      };

    case types.CREATE_RESERVATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.GET_AVAILABLE_SPOTS_SUCCESS:
      const returnedSpots = action.payload;
      return {
        ...state,
        availableSpots: returnedSpots,
      };

    case types.GET_AVAILABLE_SPOTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.CANCEL_RESERVATION_SUCCESS:
      return {
        ...state,
      };

    case types.CANCEL_RESERVATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.DELETE_SPOT_SUCCESS:
      return {
        ...state,
      };

    case types.DELETE_SPOT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.UPDATE_SPOT_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_SPOT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.UPDATE_RESERVATION_MANAGER_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_RESERVATION_MANAGER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.TOGGLE_DIALOG:
      // eslint-disable-next-line no-case-declarations
      const { dialogName, actionTo } = action.payload;

      return {
        ...state,
        dialogs: {
          ...state.dialogs,
          [dialogName]: actionTo,
        },
      };

    default:
      return state;
  }
};

export default {
  main: mainReducer,
};
