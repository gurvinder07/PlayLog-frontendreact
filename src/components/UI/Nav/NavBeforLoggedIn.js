import React from "react";
import {NavLink } from 'react-router-dom';

const Nav = () => {
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
				<label className='item'>PlayLOG</label>
				<NavLink to='/register' className='item'>
					Regsiter 
					</NavLink>
			
					<NavLink to='/' className='item'>
					Login 
					</NavLink>
			</div>
		</div>
	);
};

export default Nav;
