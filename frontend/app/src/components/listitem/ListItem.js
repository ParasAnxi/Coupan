import React from "react";
import "./listitem.css";
function ListItem({ title, icon, name }) {
	return (
		<div className="item">
			<span className="icon">{icon}</span>
			<label>
				{title}
				<input type="radio" name={name} className="hidden" />
			</label>
		</div>
	);
}

export default ListItem;
