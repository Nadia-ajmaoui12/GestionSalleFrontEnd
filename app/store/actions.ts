import { Login } from '../core/models/Login.ts';
import { Reservation } from '../core/models/Reservations.ts';
import { Spot } from '../core/models/Spot.ts';
import * as types from './actionTypes.ts';

export const login = (LoginObj: Login) => ({
  type: types.LOGIN_USER,
  payload: { LoginObj },
});

export const loginSuccess = (LoginObj: Login) => ({
  type: types.LOGIN_USER_SUCCESS,
  payload: { LoginObj },
});

export const loginFailure = (error: any) => ({
  type: types.LOGIN_USER_FAILURE,
  payload: { ...error },
});

export const register = (RegsiterObj: any) => ({
  type: types.REGISTER_USER,
  payload: { RegsiterObj },
});

export const registerSuccess = (RegsiterObj: any) => ({
  type: types.REGISTER_USER_SUCCESS,
  payload: { RegsiterObj },
});

export const regsiterFailure = (error: any) => ({
  type: types.REGISTER_USER_FAILURE,
  payload: { ...error },
});

export const fetchUsers = () => ({
  type: types.FETCH_USERS,
});

export const fetchUsersSuccess = (responseData: any[]) => ({
  type: types.FETCH_USERS_SUCCESS,
  payload: responseData,
});

export const fetchUsersFailure = (error: any) => ({
  type: types.FETCH_USERS_FAILURE,
  payload: { ...error },
});

export const updateUser = (userId: string, userObj: any) => ({
  type: types.UPDATE_USER,
  payload: { userId, userObj },
});

export const updateUserSuccess = (responseData: any[]) => ({
  type: types.UPDATE_USER_SUCCESS,
  payload: responseData,
});

export const updateUserFailure = (error: any) => ({
  type: types.UPDATE_USER_FAILURE,
  payload: { ...error },
});

export const fetchReservations = () => ({
  type: types.FETCH_RESERVATIONS,
});

export const fetchReservationsSuccess = (responseData: any[]) => ({
  type: types.FETCH_RESERVATIONS_SUCCESS,
  payload: responseData,
});

export const fetchReservationsFailure = (error: any) => ({
  type: types.FETCH_RESERVATIONS_FAILURE,
  payload: { ...error },
});

export const fetchReservationsClient = () => ({
  type: types.FETCH_RESERVATIONS_CLIENT,
});

export const fetchReservationsClientSuccess = (responseData: any[]) => ({
  type: types.FETCH_RESERVATIONS_CLIENT_SUCCESS,
  payload: responseData,
});

export const fetchReservationsClientFailure = (error: any) => ({
  type: types.FETCH_RESERVATIONS_CLIENT_FAILURE,
  payload: { ...error },
});

export const fetchSpots = () => ({
  type: types.FETCH_SPOTS,
});

export const fetchSpotsSuccess = (responseData: any[]) => ({
  type: types.FETCH_SPOTS_SUCCESS,
  payload: responseData,
});

export const fetchSpotsFailure = (error: any) => ({
  type: types.FETCH_SPOTS_FAILURE,
  payload: { ...error },
});

export const createSpot = (SpotObj: Spot) => ({
  type: types.CREATE_SPOT,
  payload: { SpotObj },
});

export const createSpotSuccess = (SpotObj: Spot) => ({
  type: types.CREATE_SPOT_SUCCESS,
  payload: { SpotObj },
});

export const createSpotFailure = (error: any) => ({
  type: types.CREATE_SPOT_FAILURE,
  payload: { ...error },
});

export const fetchClients = () => ({
  type: types.FETCH_CLIENTS,
});

export const fetchClientsSuccess = (responseData: any[]) => ({
  type: types.FETCH_CLIENTS_SUCCESS,
  payload: responseData,
});

export const fetchClientsFailure = (error: any) => ({
  type: types.FETCH_CLIENTS_FAILURE,
  payload: { ...error },
});

export const createReservation = (ReservationObj: Reservation) => ({
  type: types.CREATE_RESERVATION,
  payload: { ReservationObj },
});

export const createReservationSuccess = (ReservationObj: Reservation) => ({
  type: types.CREATE_RESERVATION_SUCCESS,
  payload: { ReservationObj },
});

export const createReservationFailure = (error: any) => ({
  type: types.CREATE_RESERVATION_FAILURE,
  payload: { ...error },
});

export const toggleDialog = (dialogName: string, actionTo: boolean) => ({
  type: types.TOGGLE_DIALOG,
  payload: { dialogName, actionTo },
});

export const getAvailableSpots = (bookingDate: string, salleType: string) => ({
  type: types.GET_AVAILABLE_SPOTS,
  payload: { bookingDate, salleType },
});

export const getAvailableSpotsSuccess = (responseData: any[]) => ({
  type: types.GET_AVAILABLE_SPOTS_SUCCESS,
  payload: responseData,
});

export const getAvailableSpotsFailure = (error: any) => ({
  type: types.GET_AVAILABLE_SPOTS_FAILURE,
  payload: { ...error },
});

export const cancelReservationClient = (reservationId: string) => ({
  type: types.CANCEL_RESERVATION,
  payload: { reservationId },
});

export const cancelReservationClientSuccess = (responseData: any[]) => ({
  type: types.CANCEL_RESERVATION_SUCCESS,
  payload: responseData,
});

export const cancelReservationClientFailure = (error: any) => ({
  type: types.CANCEL_RESERVATION_FAILURE,
  payload: { ...error },
});

export const deleteSpot = (spotId: string) => ({
  type: types.DELETE_SPOT,
  payload: { spotId },
});

export const deleteSpotSuccess = (responseData: any[]) => ({
  type: types.DELETE_SPOT_SUCCESS,
  payload: responseData,
});

export const deleteSpotFailure = (error: any) => ({
  type: types.DELETE_SPOT_FAILURE,
  payload: { ...error },
});

export const updateSpot = (spotObj: Spot, spotId: string) => ({
  type: types.UPDATE_SPOT,
  payload: { spotId, spotObj },
});

export const updateSpotSuccess = (responseData: any[]) => ({
  type: types.UPDATE_SPOT_SUCCESS,
  payload: responseData,
});

export const updateSpotFailure = (error: any) => ({
  type: types.UPDATE_SPOT_SUCCESS,
  payload: { ...error },
});

export const updateReservationForManager = (
  reservationStatus: any,
  reservationId: string,
) => ({
  type: types.UPDATE_RESERVATION_MANAGER,
  payload: { reservationStatus, reservationId },
});

export const updateReservationForManagerSuccess = (responseData: any[]) => ({
  type: types.UPDATE_RESERVATION_MANAGER_SUCCESS,
  payload: responseData,
});

export const updateReservationForManagerFailure = (error: any) => ({
  type: types.UPDATE_RESERVATION_MANAGER_FAILURE,
  payload: { ...error },
});
