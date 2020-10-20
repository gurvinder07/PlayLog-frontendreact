import { combineReducers } from "redux";
import PostReducer from "./PostReducer";
import UserReducer from "./UserReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
	posts: PostReducer,
	user: UserReducer,
	errors:ErrorReducer
});
