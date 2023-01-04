import React from "react";
import ReactDOM from "react-dom";
import "./backdrop.css";
function Backdrop(props) {
	return ReactDOM.createPortal(
		<div className="backdrop">
			<div className="backdrop-content">
				<span onClick={props.closeBackdrop} className="times">
					&times;
				</span>
				{props.children}
			</div>
		</div>,
		document.getElementById("modal")
	);
}

export default Backdrop;
