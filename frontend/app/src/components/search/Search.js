import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context//AppContext";
import { PORT } from "../../context/Server";
import "./search.css";

function Search(props) {
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		// console.log("Called", props.coupans);
	}, []);

	return (
		<div className="search">
			<h4>search here..</h4>
			<div className="search-area">
				<input
					type="text"
					placeholder="input text"
					className="form-control"
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
				/>
				<button
					className="btn btn-danger"
					onClick={() => {
						const text = searchText === "" ? "empty" : searchText;
						fetch("http://localhost:" + PORT + "/coupon/find/" + text, {
							headers: {
								"Content-Type": "application/json",
							},
						})
							.then((response) => response.json())
							.then((jsondata) => {
								props.setCoupans(jsondata);
							})
							.catch();
					}}
				>
					Search
				</button>
			</div>
		</div>
	);
}
export default Search;
