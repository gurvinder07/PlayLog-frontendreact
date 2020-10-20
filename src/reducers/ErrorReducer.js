import {
	GET_ERRORS,
	CLEAR_ERROR,
	REGISTER_FAIL,
	LOGIN_FAIL,
	AUTH_ERROR,
} from "../actions/Type";

const initialState = { errors: {}, msg: null, id: null };
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ERRORS:
		case REGISTER_FAIL:
		case LOGIN_FAIL:
			return {
				msg: action.payload.errors,
				status: action.payload.message,
				id: action.payload.id,
			};
		case AUTH_ERROR:
		case CLEAR_ERROR:
			return {
				errors: {},
				msg: null,
				id: null,
			};

		default:
			return state;
	}
};
