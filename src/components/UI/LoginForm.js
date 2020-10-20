import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/Auth";

class LoginForm extends React.Component {
	state = { email: "", password: "", isSubmitting: false };
	handleInputChange = (event) => {
		const name = event.target.name;
		this.setState({ [name]: event.target.value });
	};
	handleSubmit = (event) => {
		this.setState({ isSubmitting: true });
		event.preventDefault();
		if (this.state.email !== null && this.state.password !== null) {
			this.props.loginUser(this.state.email, this.state.password);
		} else alert("Please fill all relevant info");
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ isSubmitting: false });
		if (nextProps.errors.msg !== undefined);
		try {
			alert(nextProps.errors.msg.Invalid[0]);
		} catch (ex) {}
	}

	render() {
		return (
			<form
				className='ui form'
				style={{
					width: "50%",
					verticalAlign: "middle",
					textAlign: "center",
					border: "2px solid black",
					margin: "auto",
					marginTop: "15%",
					padding: "1.5em",
					boxShadow: "2px 2px 2px 2px",
				}}
			>
				<div className='field'>
					<label>Email </label>
					<input
						name='email'
						onChange={this.handleInputChange}
						type='text'
						placeholder='email'
					/>
				</div>
				<div className='field'>
					<label>Password</label>
					<input
						name='password'
						onChange={this.handleInputChange}
						type='password'
						placeholder='Last Name'
					/>
				</div>
				<div className='field'>
					<div className='ui '>
						<label>I Swear to some terms and conditions</label>
					</div>
				</div>

				<button
					className='ui button'
					disabled={this.state.isSubmitting}
					type='submit'
					onClick={this.handleSubmit}
				>
					Submit
				</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return { user: state.user, errors: state.errors };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
