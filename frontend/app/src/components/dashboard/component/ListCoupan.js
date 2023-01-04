import React, { useContext, useEffect, useState } from "react";
import Card from "../../card/Card";
import { AppContext } from "../../../context/AppContext";
import { useLocation } from "react-router-dom";
import { PORT } from "../../../context/Server";

export default function ListCoupan({
	setCurrentItem,
	setFormData,
	setFormMode,
}) {
	const [coupans, setCoupans] = useState([]);

	const location = useLocation();
	useEffect(() => {
		console.log(location);
		fetch("http://localhost:5000/coupons/user/" + location.state.id, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((jsondata) => {
				setCoupans(jsondata);
			})
			.catch();
	}, []);

	function deleteCardHandler(id) {
		fetch(
			"http://localhost:" +
				PORT +
				"/coupon?id=" +
				id +
				"&userid=" +
				location.state.id,
			{
				method: "DELETE",
			}
		)
			.then((response) => response.json())
			.then((jsondata) => setCoupans(jsondata))
			.catch((err) => console.log(err));
	}

	function editCardHandler(id) {
		fetch("http://localhost:" + PORT + "/coupon/" + id, { method: "GET" })
			.then((response) => response.json())
			.then((jsondata) => {
				console.log(jsondata[0]);
				setFormData(jsondata[0]);
				setCurrentItem(1);
				setFormMode(2);
			})
			.catch((err) => console.log(err));
	}

	function changeStatusHandler(coupon) {
		fetch("http://localhost:" + PORT + "/coupon/status/" + coupon.id, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userid: location.state.id }),
		})
			.then((response) => response.json())
			.then((jsondata) => setCoupans(jsondata))
			.catch((err) => console.log(err));
	}

	return (
		<div className="list-coupans">
			{coupans.map((coupan) => (
				<div key={coupan.id}>
					<Card
						coupan={coupan}
						deleteCardHandler={() => {
							deleteCardHandler(coupan.id);
						}}
						changeStatusHandler={() => {
							changeStatusHandler(coupan);
						}}
						editCardHandler={() => {
							editCardHandler(coupan.id);
						}}
						loginstatus={true}
					/>
				</div>
			))}
		</div>
	);
}
