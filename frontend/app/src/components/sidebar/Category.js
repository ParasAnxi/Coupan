import React from "react";
import { useState } from "react";
import "./cat.css";
const Category = ({ category }) => {
	const [status, setStatus] = useState("select-cat");

	function onSelectClickHandler() {
		if (status === "select-cat") setStatus("select-cat active");
		else setStatus("select-cat");
	}

	function onClickHandler(event) {
		if (event.target.style.backgroundColor === "") {
			event.target.style.backgroundColor = "#f73f42";
			event.target.style.color = "#ffffff";
		} else {
			event.target.style.backgroundColor = "";
			event.target.style.color = "";
		}
	}

	return (
		<div className="category-container">
			<button className="select-label" onClick={onSelectClickHandler}>
				Select Categories
			</button>
			<ul className={status}>
				{Object.keys(category).map((val) => (
					<li
						className="options"
						onClick={onClickHandler}
						value={category[val]}
						key={val}
					>
						{category[val]}
					</li>
				))}
			</ul>
		</div>
	);
};
export default Category;
