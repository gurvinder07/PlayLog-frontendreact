import React from "react";
export default (props) => {
	return (
		<form className={props.classes} style={props.style}>
			<div className='field'>
				<textarea
					value={props.value}
					onChange={props.handleInputChange}
				></textarea>
			</div>
			{props.show ? (
				<div
					onClick={props.handleSubmit()}
					className='ui blue labeled submit icon button'
				>
					<i className='icon edit'></i> Add Reply
				</div>
			) : (
				<h4>Enter Post Content here</h4>
			)}
		</form>
	);
};
