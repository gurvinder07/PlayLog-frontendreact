import React from "react";
import PostList from "./UI/PostList";
import Nav from "./UI/Nav/NavBeforLoggedIn";
import NavloggedIn from "./UI/Nav/NavAfterLoggedIn";
import LoginForm from "./UI/LoginForm";
import RegistrationForm from "./UI/RegistrationForm";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/Auth";
import CreatePost from "./UI/CreatePost";

const App = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (localStorage.getItem("token") !== null && !user.isAuthenticated) {
			dispatch(loadUser());
		}
	}, []);

	return (
		<div style={{ height: "100%" }}>
			{user.isAuthenticated ? <NavloggedIn userName={user.name} /> : <Nav />}
			{user.isLoading ? null : (
				<Switch>
					<Route
						path='/register'
						exact
						strict
						render={() =>
							user.isAuthenticated ? (
								<Redirect to='/posts' />
							) : (
								<RegistrationForm />
							)
						}
					/>

					<Route
						path='/posts'
						exact
						strict
						render={() =>
							user.isAuthenticated ? <PostList /> : <Redirect to='/' />
						}
					/>

					<Route
						path='/createpost'
						exact
						strict
						render={() =>
							user.isAuthenticated ? <CreatePost /> : <LoginForm />
						}
					/>
					<Route
						path='/'
						exact
						strict
						render={() =>
							user.isAuthenticated ? <Redirect to='/posts' /> : <LoginForm />
						}
					/>
				</Switch>
			)}
		</div>
	);
};
export default App;
