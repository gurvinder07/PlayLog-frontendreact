import { createPost } from "../../actions/Index";
import React from "react";
import { connect } from "react-redux";

import FormReply from "./FormCommentReply";
import { Redirect } from "react-router";

class CreatePost extends React.Component {
	state = {
		selectedFile: null,
		text: "",
	};

	fileSelectedHandler = (event) => {
		this.setState({ selectedFile: event.target.files[0] });
	};

	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
		fd.append("description", this.state.text);

		this.props.createPost(fd);
		this.setState({
			selectedFile: null,
			text: "",
		});
	};

	inputhandler = (event) => {
		this.setState({ text: event.target.value });
		console.log(this.state.text);
	};
	render() {
		return (
			<div
				className='ui modal'
				style={{
					display: "block",
					verticalAlign: "middle",
					textAlign: "center",
					width: "60%",
					height: "500px",
					padding: "20%",
					top: "20%",
					left: "20%",
				}}
			>
				<FormReply
					value={this.state.text}
					classes='ui modal form'
					handleInputChange={(e) => {
						this.setState({ text: e.target.value });
						console.log(this.state.text);
					}}
					handleSubmit={() => {}}
					style={{
						display: "block",
						width: "80%",
						textAlign: "center",
						top: "2%",
						left: "9%",
					}}
					show={false}
				/>
				<div className='header'>Create Post</div>

				<div className='content'>
					<input
						type='file'
						onChange={this.fileSelectedHandler}
						accept='image/x-png,image/gif,image/jpeg'
					/>
				</div>
				<div onClick={this.fileUploadHandler} className='ui approve button'>
					Create
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.posts);
	return { user: state.user, posts: state.posts };
};
export default connect(mapStateToProps, { createPost })(CreatePost);
