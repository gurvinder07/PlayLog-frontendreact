import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	CLEAR_ERROR,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
} from "./Type";
import { postsApiAuth, postsApi } from "../apis/Posts";

export const loadUser = () => (dispatch) => {
	dispatch({ type: USER_LOADING });
	const token = localStorage.getItem("token");

	if (token) {
		postsApiAuth(token)
			.get("auth/user")
			.then((res) => {
				dispatch({ type: USER_LOADED, payload: res.data });
			})
			.catch(() => {
				dispatch({ type: AUTH_ERROR });
			});
	} else {
		localStorage.removeItem("token");
		dispatch({ type: AUTH_ERROR });
	}
};

export const registerUser = (name, email, password) => (dispatch) => {
	const body = JSON.stringify({ name, email, password });

	postsApi()
		.post("/user", body)
		.then((res) => {
			localStorage.setItem("token", res.data.token);
			dispatch({ type: CLEAR_ERROR });
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		})

		.catch((err) => {
			dispatch({
				type: REGISTER_FAIL,
				payload: {
					errors: err.response.data.errors,
					message: err.response.data.message,
					id: err.response.status,
				},
			});
		});
};

export const loginUser = (email, password) => (dispatch) => {
	const body = JSON.stringify({ email, password });

	postsApi()
		.post("http://localhost/posts/public/api/auth/user", body)
		.then((res) => {
			if (localStorage.getItem("token")) localStorage.removeItem("token");
			localStorage.setItem("token", res.data.token);
			dispatch({ type: CLEAR_ERROR });
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_FAIL,
				payload: {
					errors: err.response.data.errors,
					message: err.response.data.message,
					id: err.response.status,
				},
			});
		});
};

export const logoutUser = () => (dispatch) => {
	postsApiAuth(localStorage.getItem("token"))
		.get("/auth/user/logout")
		.then(() => {
			localStorage.removeItem("token");
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			dispatch({
				type: CLEAR_ERROR,
			});
		});
};
