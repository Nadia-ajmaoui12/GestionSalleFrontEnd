import { combineEpics, ofType } from 'redux-observable';
import { of, from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import get from 'lodash/get';
import { push } from 'redux-first-history';
import jwt from 'jsonwebtoken';
import * as types from './actionTypes.ts';
import * as actions from './actions.ts';
import { Delete, Get, post, put } from '../services/request/request.ts';
import {
  GET_ALL_USERS_API,
  LOGIN_USER_API,
  REGISTER_USER_API,
  RESERVATION_API,
  SPOT_API,
} from '../core/constants/apiRoutes.ts';
import AccessTokenStorage from '../services/security/accessTokenStorage.ts';
import { getApi, postApi } from '../services/request/requestWithAuth.ts';
import {
  ClientRoutes,
  ManagerRoutes,
  PublicRoutes,
} from '../core/constants/routes.ts';

export const registerUserSuccessEpic = action$ =>
  action$.pipe(
    ofType(types.REGISTER_USER_SUCCESS),
    mergeMap(async () => push(PublicRoutes.LOGIN)),
  );
export const createSpotSuccessEpic = action$ =>
  action$.pipe(
    ofType(types.CREATE_SPOT_SUCCESS),
    mergeMap(async () => push(ManagerRoutes.SPOTS_MANAGER)),
  );
export const loginUserSuccessEpic = action$ =>
  action$.pipe(
    ofType(types.LOGIN_USER_SUCCESS),
    mergeMap(async () => {
      const token = AccessTokenStorage.get();
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.role === 'CLIENT') {
        return push(ClientRoutes.RESERVATIONS);
      }
      if (decodedToken && decodedToken.role === 'MANAGER') {
        return push(ManagerRoutes.CLIENTS);
      }
      return push(PublicRoutes.LOGIN);
    }),
  );

export const updateSpotSuccess = action$ =>
  action$.pipe(
    ofType(types.UPDATE_SPOT_SUCCESS, types.DELETE_SPOT_SUCCESS),
    mergeMap(async () => actions.fetchSpots()),
  );

export const updateReservationStateSuccess = action$ =>
  action$.pipe(
    ofType(types.UPDATE_RESERVATION_MANAGER_SUCCESS),
    mergeMap(async () => actions.fetchReservations()),
  );

export const cancelReservationSuccess = action$ =>
  action$.pipe(
    ofType(types.CANCEL_RESERVATION_SUCCESS),
    mergeMap(async () => actions.fetchReservationsClient()),
  );

export const getAllClientsEpic = (action$: any) =>
  action$.pipe(
    ofType(types.FETCH_CLIENTS),
    mergeMap(() =>
      from(Get(`${GET_ALL_USERS_API}/clients`, {})).pipe(
        map(response => actions.fetchClientsSuccess(response.data)),
        catchError(error =>
          of(
            actions.fetchClientsFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const getAllUsersEpic = (action$: any) =>
  action$.pipe(
    ofType(types.FETCH_USERS),
    mergeMap(() =>
      from(Get(GET_ALL_USERS_API, {})).pipe(
        map(response => actions.fetchUsersSuccess(response.data)),
        catchError(error =>
          of(
            actions.fetchUsersFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const loginUserEpic = action$ =>
  action$.pipe(
    ofType(types.LOGIN_USER),
    mergeMap(action =>
      from(post(LOGIN_USER_API, { data: action.payload.LoginObj })).pipe(
        map(response => {
          const { accessToken } = response.data;
          AccessTokenStorage.set(accessToken);
          return actions.loginSuccess(response.data);
        }),
        catchError(error =>
          of(
            actions.loginFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const registerUserEpic = action$ =>
  action$.pipe(
    ofType(types.REGISTER_USER),
    mergeMap(action =>
      from(post(REGISTER_USER_API, { data: action.payload.RegsiterObj })).pipe(
        map(response => actions.registerSuccess(response.data)),
        catchError(error =>
          of(
            actions.regsiterFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const getAllReservations = (action$: any) =>
  action$.pipe(
    ofType(types.FETCH_RESERVATIONS),
    mergeMap(() =>
      from(getApi(RESERVATION_API, {})).pipe(
        map(response => actions.fetchReservationsSuccess(response.data)),
        catchError(error =>
          of(
            actions.fetchReservationsFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const getAllReservationsForClient = (action$: any) =>
  action$.pipe(
    ofType(types.FETCH_RESERVATIONS_CLIENT),
    mergeMap(() =>
      from(getApi(`${RESERVATION_API}/client`, {})).pipe(
        map(response => actions.fetchReservationsClientSuccess(response.data)),
        catchError(error =>
          of(
            actions.fetchReservationsClientFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const getAllSpots = (action$: any) =>
  action$.pipe(
    ofType(types.FETCH_SPOTS),
    mergeMap(() =>
      from(Get(SPOT_API, {})).pipe(
        map(response => actions.fetchSpotsSuccess(response.data)),
        catchError(error =>
          of(
            actions.fetchSpotsFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const createSpotEpic = action$ =>
  action$.pipe(
    ofType(types.CREATE_SPOT),
    mergeMap(action =>
      from(post(SPOT_API, { data: action.payload.SpotObj })).pipe(
        map(response => actions.createSpotSuccess(response.data)),
        catchError(error =>
          of(
            actions.createSpotFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const createReservationEpic = action$ =>
  action$.pipe(
    ofType(types.CREATE_RESERVATION),
    mergeMap(action =>
      from(
        postApi(RESERVATION_API, { data: action.payload.ReservationObj }),
      ).pipe(
        map(response => actions.createReservationSuccess(response.data)),
        catchError(error =>
          of(
            actions.createReservationFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const getAvailableSpots = action$ =>
  action$.pipe(
    ofType(types.GET_AVAILABLE_SPOTS),
    mergeMap(action =>
      from(
        Get(
          `${SPOT_API}/availableSalles/${action.payload.bookingDate}/${
            action.payload.salleType
          }`,
          {},
        ),
      ).pipe(
        map(response => actions.getAvailableSpotsSuccess(response.data)),
        catchError(error =>
          of(
            actions.getAvailableSpotsFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const cancelReservation = action$ =>
  action$.pipe(
    ofType(types.CANCEL_RESERVATION),
    mergeMap(action =>
      from(
        put(`${RESERVATION_API}/client/${action.payload.reservationId}`, {}),
      ).pipe(
        map(response => actions.cancelReservationClientSuccess(response.data)),
        catchError(error =>
          of(
            actions.cancelReservationClientFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const deleteSpot = action$ =>
  action$.pipe(
    ofType(types.DELETE_SPOT),
    mergeMap(action =>
      from(Delete(`${SPOT_API}/${action.payload.spotId}`, {})).pipe(
        map(response => actions.deleteSpotSuccess(response.data)),
        catchError(error =>
          of(
            actions.deleteSpotFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const updateSpot = action$ =>
  action$.pipe(
    ofType(types.UPDATE_SPOT),
    mergeMap(action =>
      from(
        put(`${SPOT_API}/${action.payload.spotId}`, {
          data: action.payload.spotObj,
        }),
      ).pipe(
        map(response => actions.updateSpotSuccess(response.data)),
        catchError(error =>
          of(
            actions.updateSpotFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const updateReservationManager = action$ =>
  action$.pipe(
    ofType(types.UPDATE_RESERVATION_MANAGER),
    mergeMap(action =>
      from(
        put(`${RESERVATION_API}/manager/${action.payload.reservationId}`, {
          data: action.payload,
        }),
      ).pipe(
        map(response =>
          actions.updateReservationForManagerSuccess(response.data),
        ),
        catchError(error =>
          of(
            actions.updateReservationForManagerFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const updateUserEpic = action$ =>
  action$.pipe(
    ofType(types.UPDATE_USER),
    mergeMap(action =>
      from(
        put(`${GET_ALL_USERS_API}/${action.payload.userId}`, {
          data: action.payload.userObj,
        }),
      ).pipe(
        map(response => actions.updateUserSuccess(response.data)),
        catchError(error =>
          of(
            actions.updateUserFailure({
              errors: get(error, 'response.data.errors', []),
              message: get(error, 'response.data.message', ''),
            }),
          ),
        ),
      ),
    ),
  );

export const rootEpic = combineEpics(
  registerUserEpic,
  loginUserSuccessEpic,
  getAllUsersEpic,
  loginUserEpic,
  getAllReservations,
  getAllReservationsForClient,
  getAllSpots,
  createSpotEpic,
  getAllClientsEpic,
  createReservationEpic,
  getAvailableSpots,
  cancelReservation,
  cancelReservationSuccess,
  deleteSpot,
  updateSpot,
  updateSpotSuccess,
  registerUserSuccessEpic,
  createSpotSuccessEpic,
  updateReservationManager,
  updateReservationStateSuccess,
  updateUserEpic,
);
