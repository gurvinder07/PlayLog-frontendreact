import _ from "lodash";
import {
	CREATE_POST,
	FETCH_POSTS,
	DELETE_POST,
	FETCH_COMMENTS,
	FETCH_REPLIES,
	LIKE_POST,
	POST_COMMENT,
	DELETE_COMMENT,
	POST_CREATED,
} from "../actions/Type";

export default (state = {}, action) => {
	switch (action.type) {
		///Posts
		case FETCH_POSTS:
			let data = { ...state };
			if (Object.keys(data).indexOf("total_posts") > 0)
				delete data["total_posts"];
			let newdata = { ...data, ..._.mapKeys(action.payload.data, "id") };
			if (Object.keys(newdata).indexOf("total_posts") === -1) {
				newdata = { ...newdata, total_posts: action.payload.total_posts };
			} else {
				newdata.total_posts = action.payload.total_posts;
			}

			return newdata;

		case POST_CREATED:
			return { ...state, [action.payload.data.id]: action.payload.data };

		case DELETE_POST:
			return _.omit(state, action.payload);

		case LIKE_POST:
			const updatedState = { ...state };
			const stateItem = updatedState[action.payload];
			stateItem.likes_count =
				stateItem.post_liked === 0
					? stateItem.likes_count + 1
					: stateItem.likes_count - 1;
			stateItem.post_liked = stateItem.post_liked === 1 ? 0 : 1;

			return updatedState;

		//Comments
		case FETCH_COMMENTS:
			const newState = { ...state };
			action.payload.data.data.map((cmnt) => {
				return newState[action.payload.postId].comments.push(cmnt);
			});
			newState[action.payload.postId].meta.has_more_comments =
				action.payload.data.has_more_data;
			newState[action.payload.postId].meta.page = action.payload.data.page;
			return newState;

		case POST_COMMENT:
			const postCommentState = { ...state };
			console.log(action.payload.data);
			postCommentState[action.payload.postId].comments.push(
				action.payload.data
			);
			return postCommentState;

		case DELETE_COMMENT:
			const deletedState = { ...state };
			_.remove(
				deletedState[action.payload.postId].comments,
				(n) => n.id === action.payload.commentId
			);
			return deletedState;
		//console.log(deletedState[action.payload.postId].comments);

		//Commment Replies
		case FETCH_REPLIES:
			const postId = action.payload.postKey;
			const commentId = action.payload.commentKey;
			const stateReplies = { ...state };
			let comment = stateReplies[postId].comments.find((item) => {
				return item.id === commentId;
			});

			action.payload.data.children.map((x) => {
				return comment.children.push(x);
			});

			console.log(stateReplies);
			return stateReplies;

		default:
			return state;
	}
};
