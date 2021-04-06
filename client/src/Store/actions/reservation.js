import * as actionTypes from "./actionTypes";
import axios from "../../axios-reservations";

export const deleteRequestModalOn = (id, name) => {
	return {
		type: actionTypes.DELETE_MODAL_SHOW,
		deleteReqId: id,
		reservName: name,
	};
};

export const deleteRequestModalClose = () => {
	return {
		type: actionTypes.DELETE_MODAL_CLOSE,
	};
};

export const requestInit = () => {
	return {
		type: actionTypes.REQUEST_INIT,
	};
};

export const fetchReservationsSuccess = (reservations) => {
	return {
		type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
		reservations: reservations,
	};
};

export const requestFailed = (error) => {
	return {
		type: actionTypes.REQUEST_FAILED,
		error: error,
	};
};

export const fetchReservations = () => {
	return async (dispatch) => {
		dispatch(requestInit());
		try {
			const response = await axios({
				url: "/reservations",
				method: "GET",
			});
			let reservationList = [];
			reservationList = [...response.data.reservations];
			dispatch(fetchReservationsSuccess(reservationList));
		} catch (err) {
			dispatch(requestFailed(err.message));
		}
	};
};

export const deleteReservationRequest = (id) => {
	return async (dispatch) => {
		dispatch(requestInit());
		try {
			await axios({
				url: `/${id}`,
				method: "DELETE",
			});
			dispatch(deleteRequestModalClose());
			dispatch(fetchReservations());
		} catch (err) {
			dispatch(requestFailed(err.message));
		}
	};
};

export const createReservationRequest = (data) => {
	return async (dispatch) => {
		dispatch(requestInit());
		try {
			await axios({
				url: "/new-reservation",
				method: "POST",
				data: data,
			});
			// dispatch(fetchReservations());
		} catch (err) {
			dispatch(requestFailed(err.message));
		}
	};
};
