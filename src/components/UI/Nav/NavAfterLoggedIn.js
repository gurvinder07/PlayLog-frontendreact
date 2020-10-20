import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/Auth";

const NavLoggedIn = (props) => {
	const [createPost, setCreatePost] = useState(false);
	const dispatch = useDispatch();
	const customCss = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		zIndex: 100,
	};
	return (
		<div style={customCss}>
			<div className='ui three item menu '>
				<Link to='/createpost' className='item'>
					Create{" "}
				</Link>
				<Link to='/posts' className='item'>
					Posts
				</Link>
				<button onClick={() => dispatch(logoutUser())} className='item'>
					Logout
				</button>
			</div>
		</div>
	);
};

export default NavLoggedIn;
