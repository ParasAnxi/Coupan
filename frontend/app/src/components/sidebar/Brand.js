import React from "react";
import { useState } from "react";
import { PORT } from "../../context/Server";

import "./brand.css";
const Brands = ({ brands, setCoupans, coupans }) => {
	const [status, setStatus] = useState("select-brands");
	const [oldevent, setOldEvent] = useState(null);
	function onSelectClickHandler() {
		if (status === "select-brands") setStatus("select-brands active");
		else setStatus("select-brands");
	}

	function onClickHandler(event) {
		if (oldevent === null) {
			setOldEvent(event);
		} else {
			if (oldevent.target.style.backgroundColor === "") {
				oldevent.target.style.backgroundColor = "#f73f42";
				oldevent.target.style.color = "#ffffff";
			} else {
				oldevent.target.style.backgroundColor = "";
				oldevent.target.style.color = "";
				setOldEvent(event);
			}
		}
		let text = "empty";
		if (event.target.innerHTML === "All") {
			text = "empty";
		} else {
			text = event.target.innerHTML;
		}
		fetch("http://localhost:" + PORT + "/coupon/find/" + text, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((jsondata) => {
				setCoupans(jsondata);
			})
			.catch();

		if (event.target.style.backgroundColor === "") {
			event.target.style.backgroundColor = "#f73f42";
			event.target.style.color = "#ffffff";
		} else {
			event.target.style.backgroundColor = "";
			event.target.style.color = "";
		}
	}
	return (
		<div className="brand-container">
			<button className="select-label" onClick={onSelectClickHandler}>
				Select Brands
			</button>
			<ul className={status}>
				<li className="options" onClick={onClickHandler}>
					All
				</li>
				{brands.map((val) => (
					<li className="options" onClick={onClickHandler} key={val.id}>
						{val.name}
					</li>
				))}
			</ul>
		</div>
	);
};
export default Brands;
