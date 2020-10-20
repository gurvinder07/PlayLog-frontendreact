import React, { useState } from "react";
import CommentReply from "./FormCommentReply";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchComments,
	fetchReplies,
	deleteComment,
	postComment,
} from "../../actions/Index";
const levelImages = [
	"https://semantic-ui.com/images/avatar/small/matt.jpg",
	"https://semantic-ui.com/images/avatar/small/elliot.jpg",
	"https://semantic-ui.com/images/avatar/small/jenny.jpg",
	"https://semantic-ui.com/images/avatar/small/joe.jpg",
];

const generateCommentsRecursively = (
	postId,
	comments,
	level,
	loggedInUser,
	deleteButton,
	fetchMoreReplies,
	dispatch
) => {
	const padding = 20 * level;

	return comments.map((x) => {
		return (
			<div className='comment' style={{ paddingLeft: padding }} key={x.id}>
				<a className='avatar'>
					<img src={levelImages[level]} alt='profileImage' />
				</a>

				<div className='content'>
					<a href='#' className='author'>
						{x.user_name}
					</a>
				</div>
				<div className='metadata'>
					<span className='date'>{x.created_at}</span>
				</div>
				<div className='text'>{x.comment_text}</div>

				<div className='actions'>
					<button className='reply'>Reply</button>
					{x.email === loggedInUser ? (
						<button
							onClick={() => dispatch(deleteButton(postId, x.id))}
							className='reply'
						>
							delete
						</button>
					) : null}
				</div>

				{x.replies_count > 0 && level == 0 ? (
					<div
						onClick={() => dispatch(fetchMoreReplies(x.id, postId))}
						className='actions'
					>
						<button className='reply'>{x.replies_count} Replies </button>
					</div>
				) : null}
				{/* recursion */}
				{x.children != null && x.children.length > 0
					? generateCommentsRecursively(
							postId,
							x.children,
							level + 1,
							loggedInUser,
							deleteButton,
							fetchReplies,
							dispatch
					  )
					: null}
			</div>
		);
	});
};

const Comment = (props) => {
	const LEVEL_ONE_COMMENT = null;
	const { meta } = props;
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [commentVal, setCommentVal] = useState("");

	const handleSubmit = () => {
		console.log(commentVal);
		if (commentVal === null || commentVal === "") {
			alert("Please enter some text!!");
		} else {
			dispatch(postComment(props.postId, commentVal, LEVEL_ONE_COMMENT));
			setCommentVal("");
		}
	};
	return (
		<div className='ui comments'>
			<div className='ui dividing header'>
				{meta.total === 0 ? 0 : meta.total} Comments
			</div>
			{generateCommentsRecursively(
				props.postId,
				props.comments,
				0,
				user.email,
				deleteComment,
				fetchReplies,
				dispatch
			)}
			<CommentReply
				handleSubmit={() => handleSubmit}
				value={commentVal}
				style={{ display: "inline-block", width: "80%", height: "100px" }}
				classes='ui reply form'
				show={true}
				handleInputChange={(e) => {
					setCommentVal(e.target.value);
				}}
			/>
			<br></br>
			<br></br>
			{meta.has_more_comments ? (
				<button
					onClick={() =>
						dispatch(fetchComments(props.postId, parseInt(meta.page) + 1))
					}
					className='ui Grey button'
				>
					Load More
				</button>
			) : null}
		</div>
	);
};

export default Comment;
