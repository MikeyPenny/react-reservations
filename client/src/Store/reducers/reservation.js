import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const intitalState = {
	reservations: [],
	loading: true,
	modal: false,
	deleteId: null,
};

const requestInit = (state) => {
	return updateObject(state, { loading: true });
};

const requestFailed = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const fetchReservationsSuccess = (state, action) => {
	return updateObject(state, {
		reservations: action.reservations,
		loading: false,
	});
};

const deleteReservationModalOn = (state, action) => {
	return updateObject(state, {
		modal: true,
		deleteId: action.deleteReqId,
		reservName: action.reservName,
	});
};

const deleteReservationModalOff = (state) => {
	return updateObject(state, { modal: false });
};

const deleteReservation = (state, action) => {
	return updateObject(state, { message: action.message });
};

const reducer = (state = intitalState, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_INIT:
			return requestInit(state);
		case actionTypes.REQUEST_FAILED:
			return requestFailed(state, action);
		case actionTypes.FETCH_RESERVATIONS_SUCCESS:
			return fetchReservationsSuccess(state, action);
		case actionTypes.DELETE_MODAL_SHOW:
			return deleteReservationModalOn(state, action);
		case actionTypes.DELETE_MODAL_CLOSE:
			return deleteReservationModalOff(state);
		case actionTypes.DELETE_RESERVATION:
			return deleteReservation(state, action);
		default:
			return state;
	}
};

export default reducer;
