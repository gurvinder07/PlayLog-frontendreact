import axios from "axios";

export const postsApiAuth = (token = "") => {
	return axios.create({
		baseURL: "http://localhost/posts/public/api",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
};

export const postsApi = () =>
	axios.create({
		baseURL: "http://localhost/posts/public/api",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
	});
