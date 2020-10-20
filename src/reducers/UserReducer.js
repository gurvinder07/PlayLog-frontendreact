import {
	USER_LOADING,
	USER_LOADED,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	AUTH_ERROR,
	REGISTER_FAIL,
} from "../actions/Type";

const initialState = {
	token: localStorage.getItem.token,
	isAuthenticated: null,
	isLoading: false,
	user: null,
};
export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return { ...state, isLoading: true };

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case USER_LOADED:
			return {
				...state,
				...action.payload.user,
				isAuthenticated: true,
				isLoading: false,
				token: action.payload.token,
			};

		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGOUT_SUCCESS:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			};

		default:
			return state;
	}
};
