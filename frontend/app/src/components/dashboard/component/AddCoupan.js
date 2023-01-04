import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import InputElements from "../../form/InputElement";
import { AppContext } from "../../../context/AppContext";
import Notify from "../../notification/Notify";
import { PORT } from "../../../context/Server";

export default function AddCoupan({
	mode,
	setFormData,
	formData,
	defaultDate,
}) {
	var location = useLocation();
	const { coupans, setCoupans } = useContext(AppContext);
	const [addCouponStatus, setAddCouponStatus] = useState({
		message: "",
		status: "",
	});
	const columns = [
		{
			placeholder: "brand",
			type: "text",
			name: "brand",
			value: formData.brand,
			handler: null,
		},
		{
			placeholder: "label",
			type: "text",
			name: "label",
			value: formData.label,
			handler: null,
		},
		{
			placeholder: "code",
			type: "text",
			name: "coupancode",
			value: formData.coupancode,
			handler: null,
		},
		{
			type: "date",
			name: "addedDate",
			value: formData.addedDate,
			placeholder: "Added Date",
			handler: null,
		},
		{
			type: "date",
			name: "expiryDate",
			value: formData.expiryDate,
			placeholder: "Expired on",
			handler: null,
		},
		{
			type: "Submit",
			name: "submit",
			value: mode === 2 ? "Update Coupon" : "Add Coupon",
			placeholder: "",
			handler: mode === 2 ? updateCouponHandler : addCouponHandler,
		},
		{
			type: "hidden",
			name: "",
			value: "",
			placeholder: "",
			handler: null,
		},
	];

	function inputChangeHandler(event) {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}
	function addCouponHandler() {
		if (
			formData.brand.length === 0 ||
			formData.label.length === 0 ||
			formData.coupancode.length === 0
		) {
			setAddCouponStatus({
				message: "Form Error !",
				status: "failure",
			});
			setTimeout(() => {
				setAddCouponStatus({
					message: "",
					status: "",
				});
			}, 2000);
			return false;
		}
		fetch(
			"http://localhost:" +
				PORT +
				"/coupon/add?id=" +
				location.state.id +
				"&username=" +
				location.state.name,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			}
		)
			.then((response) => response.json())
			.then((jsondata) => {
				setTimeout(() => {
					setAddCouponStatus({
						message: "",
						status: "",
					});
					setFormData({
						brand: "",
						coupancode: "",
						label: "",
						addedDate: defaultDate,
						expiryDate: defaultDate,
					});
				}, 2000);
				setCoupans(jsondata);
				setAddCouponStatus({
					message: "Added to database",
					status: "success",
				});
			})
			.catch((err) => console.log(err));
	}

	function updateCouponHandler() {
		if (
			formData.brand.length === 0 ||
			formData.label.length === 0 ||
			formData.coupancode.length === 0
		) {
			setAddCouponStatus({
				message: "Form Error !",
				status: "failure",
			});
			setTimeout(() => {
				setAddCouponStatus({
					message: "",
					status: "",
				});
			}, 2000);
			return false;
		}

		fetch("http://localhost:" + PORT + "/coupon/" + formData.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((jsondata) => {
				setTimeout(() => {
					setAddCouponStatus({
						message: "",
						status: "",
					});
					setFormData({
						brand: "",
						coupancode: "",
						label: "",
						addedDate: defaultDate,
						expiryDate: defaultDate,
					});
				}, 2000);
				setCoupans(jsondata);
				setAddCouponStatus({
					message: "Record Updated",
					status: "success",
				});
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="background">
			<Notify
				status={addCouponStatus.status}
				resetNotify={() => {
					setAddCouponStatus({
						message: "",
						status: "",
					});
				}}
			>
				{addCouponStatus.message}
			</Notify>
			<div>
				{columns.map((element) => (
					<InputElements
						key={element.name}
						label={element.placeholder}
						name={element.name}
						value={element.value}
						type={element.type}
						text={element.placeholder}
						onChange={inputChangeHandler}
						onClick={element.handler}
					/>
				))}
			</div>
		</div>
	);
}
