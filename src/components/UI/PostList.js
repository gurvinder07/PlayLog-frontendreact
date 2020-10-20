import React from "react";
import { connect } from "react-redux";
import CreatePost from "./CreatePost";
import {
	fetchPosts,
	deletePost,
	fetchComments,
	fetchReplies,
	likePost,
	postComment,
	deleteComment,
} from "../../actions/Index";
import Comment from "./Comment";

class PostList extends React.Component {
	state = { page: 0 };

	componentDidMount() {
		this.props.fetchPosts(this.state.page);
	}

	loadPostData = () => {
		return this.props.posts.map((x) => {
			let item = "ui  button ";
			if (x.post_liked === 1) item = "ui red  button";
			return (
				<div key={x.id}>
					<a href='#' className='ui blue image label'>
						<img
							src='https://semantic-ui.com/images/avatar/small/joe.jpg'
							alt='userImage'
						/>
						{x.created_by}
					</a>
					<div className='ui segment'>
						<img
							className='ui centered medium image'
							src='https://mnservice.ca/images/cor1.jpg'
							alt='PostImage'
							style={{ height: "400px", width: "50%" }}
						/>
						<p>{x.description}</p>
						<div className='ui labeled button' tabIndex='0'>
							<div onClick={() => this.props.likePost(x.id)} className={item}>
								<i className='heart icon'></i> Like
							</div>
							<button className='ui basic label'>{x.likes_count}</button>
						</div>
						{this.props.user.email === x.created_by_email ? (
							<button
								className='ui grey basic button'
								onClick={() => this.props.deletePost(x.id)}
							>
								Delete
							</button>
						) : null}

						{/* <Comments
							comments={x.comments}
							meta={x.meta}
							fetchMore={this.props.fetchComments}
							fetchMoreReplies={this.props.fetchReplies}
							addReply={this.props.postComment}
							postId={x.id}
							email={this.props.user.email}
							deleteComment={this.props.deleteComment}
							deleteSubComment={() => {}}
						/> */}
						<Comment comments={x.comments} meta={x.meta} postId={x.id} />
					</div>
					<br />
				</div>
			);
		});
	};

	render() {
		const hasMorePosts = (this.state.page + 1) * 10 < this.props.totalPosts;
		return (
			<div style={{ paddingTop: "8%" }}>
				<div className='main ui container'>{this.loadPostData()}</div>
				{hasMorePosts ? (
					<button
						onClick={() => {
							this.setState({ page: this.state.page + 1 });
							this.props.fetchPosts(this.state.page + 1);
						}}
						className='ui primary button'
					>
						Load More POSTS
					</button>
				) : null}
			</div>
		);
	}
}

const mapStateToprops = (state) => {
	let postsData = Object.values(state.posts);
	const totalPosts = postsData.pop();

	return {
		posts: postsData,
		totalPosts: totalPosts,
		user: state.user,
	};
};

export default React.memo(
	connect(mapStateToprops, {
		fetchPosts,
		deletePost,
		fetchComments,
		fetchReplies,
		likePost,
		postComment,
		deleteComment,
	})(PostList)
);
