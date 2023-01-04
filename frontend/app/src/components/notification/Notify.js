import React from "react";
import "./notify.css";
export default function Notify(props) {
	return (
		<div className={"notify " + props.status} onClick={props.resetNotify}>
			{props.children}
		</div>
	);
}
