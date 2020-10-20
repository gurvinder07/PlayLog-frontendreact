import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/Auth";
class RegistrationForm extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		isLoading: false,
	};
	handleInputChange = (event) => {
		const name = event.target.name;
		this.setState({ [name]: event.target.value });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		let error = [];
		if (this.state.username === null || this.state.username.length < 3)
			error.push("User Name Length should be greater than 3 Characters");
		if (this.state.email === null || this.state.email.length < 4)
			error.push("Please Enter Valid Email");
		if (this.state.password === null || this.state.password.length < 7)
			error.push("Invalid password- Should have length greater than 7");
		if (this.state.password !== this.state.confirmPassword)
			error.push("confirm password mismatch");

		if (error.length !== 0) {
			alert(
				error.map((x) => {
					return x + " ";
				})
			);
		} else {
			this.setState({ isLoading: true });

			this.props.registerUser(
				this.state.username,
				this.state.email,
				this.state.password
			);
		}
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.renderErrors({ msg: nextProps.errors.msg, id: nextProps.errors.id });
		this.setState({ isLoading: false });
	}

	renderErrors = ({ msg, id }) => {
		let data = [];

		if (id !== undefined && id !== null) {
			if (msg === undefined && msg === null) {
				if (id !== 200) alert("server error");
			} else {
				const err = Object.values(msg);
				err.map((x) => data.push(x));
				alert(data);
			}
		}
	};
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
					marginTop: "12%",
					padding: "1.5em",
					boxShadow: "2px 2px 2px 2px",
				}}
			>
				<div className='field'>
					<label>User Name </label>
					<input
						name='username'
						onChange={this.handleInputChange}
						type='text'
						placeholder='User Name'
					/>
				</div>
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
						placeholder='Password'
					/>
				</div>

				<div className='field'>
					<label>Confirm Password</label>
					<input
						name='confirmPassword'
						onChange={this.handleInputChange}
						type='password'
						placeholder='Confirm Password'
					/>
				</div>
				<div className='field'>
					<div className='ui '>
						<label>I Swear to some terms and conditions</label>
					</div>
				</div>
				{this.state.isLoading ? (
					<button
						disabled
						className='ui button'
						type='submit'
						onClick={this.handleSubmit}
					>
						Submit
					</button>
				) : (
					<button
						className='ui button'
						type='submit'
						onClick={this.handleSubmit}
					>
						Submit
					</button>
				)}
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return { user: state.user, errors: state.errors };
};

export default connect(mapStateToProps, { registerUser })(RegistrationForm);
