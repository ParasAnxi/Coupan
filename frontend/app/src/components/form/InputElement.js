import React from "react";

import "./inputStyle.css";
function InputElements({ label, type, text, onChange, onClick, name, value }) {
	return (
		<>
			<div className="input-group">
				<label>
					{label.charAt(0).toUpperCase() + label.slice(1)}
					<input
						type={type}
						placeholder={text}
						value={value}
						onChange={onChange}
						name={name}
						onClick={onClick}
					/>
				</label>
			</div>
		</>
	);
}
export default InputElements;
