import {
	FETCH_POSTS,
	DELETE_POST,
	FETCH_COMMENTS,
	FETCH_REPLIES,
	LIKE_POST,
	POST_COMMENT,
	DELETE_COMMENT,
	POST_CREATED,
} from "./Type";

import { postsApiAuth } from "../apis/Posts";

export const createPost = (postObj) => async (dispatch) => {
	console.log(postObj);
	postsApiAuth(localStorage.getItem("token"))
		.post("/post", postObj)
		.then((res) => {
			console.log(res);
			dispatch({ type: POST_CREATED, payload: res.data });
		})
		.catch((err) => {
			console.log(err.response);
		});
};

export const fetchPosts = (id) => async (dispatch) => {
	const response = await postsApiAuth(localStorage.getItem("token")).get(
		`/posts/${id}`
	);
	dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const deletePost = (id) => async (dispatch) => {
	await postsApiAuth(localStorage.getItem("token")).delete(`/post/${id}`);
	dispatch({ type: DELETE_POST, payload: id });
};

export const likePost = (postId) => async (dispatch) => {
	await postsApiAuth(localStorage.getItem("token")).get(`/post/like/${postId}`);
	dispatch({ type: LIKE_POST, payload: postId });
};

//Todo Create Post

//comments

export const fetchComments = (postId, page) => async (dispatch) => {
	const response = await postsApiAuth(localStorage.getItem("token")).get(
		`/comments/${postId}/${page}`
	);

	dispatch({
		type: FETCH_COMMENTS,
		payload: { postId: postId, data: response.data },
	});
};

export const postComment = (postId, text, parentId) => async (dispatch) => {
	const response = await postsApiAuth(localStorage.getItem("token")).post(
		"/comment",
		{
			postId: postId,
			text: text,
			parentId: parentId,
		}
	);

	dispatch({
		type: POST_COMMENT,
		payload: { postId: postId, data: response.data.data },
	});
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
	await postsApiAuth(localStorage.getItem("token")).delete(
		`/comment/${commentId}`
	);

	dispatch({
		type: DELETE_COMMENT,
		payload: { postId: postId, commentId: commentId },
	});
};

//Comment Replies
export const fetchReplies = (commentId, postId) => async (dispatch) => {
	const response = await postsApiAuth(localStorage.getItem("token")).get(
		`/subComments/${commentId}`
	);

	console.log(response.data.data);
	dispatch({
		type: FETCH_REPLIES,
		payload: {
			commentKey: commentId,
			postKey: postId,
			data: response.data.data[0],
		},
	});
};
