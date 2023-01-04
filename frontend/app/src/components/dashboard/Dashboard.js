import React, { useContext, useEffect, useState } from "react";
import {
	MdHome,
	MdLogout,
	MdAdd,
	MdTrackChanges,
	MdList,
	MdPersonPin,
} from "react-icons/md";
import logoText from "../../images/logo-text-light.jpg";
import "./dashboard.css";
import AddCoupon from "./component/AddCoupan";
import ListCoupan from "./component/ListCoupan";
import PriceTracker from "./component/PriceTracker";
import { useLocation, useHistory } from "react-router-dom";

import { AppContext } from "../../context/AppContext";

const Dashboard = (props) => {
	const location = useLocation();
	const history = useHistory();
	const [currentItem, setCurrentItem] = useState(2);
	const [formMode, setFormMode] = useState(1);
	var date = new Date();

	var month = "";
	var datee = "";

	if (Number(date.getMonth()) < 10) {
		month = "0" + date.getMonth();
	} else {
		month = date.getMonth();
	}

	if (Number(date.getDate()) < 10) {
		datee = "0" + date.getDate();
	} else {
		datee = date.getDate();
	}

	let defaultDate = date.getFullYear() + "-" + month + "-" + datee;
	const [formData, setFormData] = useState({
		brand: "",
		coupancode: "",
		label: "",
		addedDate: defaultDate,
		expiryDate: defaultDate,
	});

	const { coupans, setCoupans } = useContext(AppContext);
	useEffect(() => {});

	const routesoption = {
		1: (
			<AddCoupon
				mode={formMode}
				formData={formData}
				setFormData={setFormData}
				defaultDate={defaultDate}
			/>
		),
		2: (
			<ListCoupan
				setFormMode={setFormMode}
				setCurrentItem={setCurrentItem}
				setFormData={setFormData}
			/>
		),
		3: <PriceTracker />,
	};

	function currentItemHandler(data, event) {
		// setCurrentItem();
		setCurrentItem(data);
	}
	return (
		<div className="dashboard">
			<nav className="dashboard-navigation">
				<ul className="nav-header">
					<li>
						<MdHome />
						<span>Home</span>
					</li>
					<li>
						<img src={logoText} alt="logo" className="logoText-dashboard" />
					</li>
					<li>
						<ul className="nav-profile">
							<li>
								<MdPersonPin />
								<span>{location.state.name}</span>
							</li>
							<li
								onClick={() => {
									history.goBack();
									console.log(history);
								}}
							>
								<MdLogout />
								<span>Logout</span>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<div className="dashboard-body">
				<div className="dashboard-sidebar">
					<ul>
						<li
							className=""
							onClick={(event) => {
								currentItemHandler(1, event);
								setFormMode(1);
								setFormData({
									brand: "",
									coupancode: "",
									label: "",
									addedDate: defaultDate,
									expiryDate: defaultDate,
								});
							}}
						>
							<MdAdd />
							<span>Add Coupons</span>
						</li>
						<li
							className=""
							onClick={() => {
								currentItemHandler(2);
							}}
						>
							<MdList />
							<span>List Coupans</span>
						</li>
						{/* <li
							className=""
							onClick={() => {
								currentItemHandler(3);
							}}
						>
							<MdTrackChanges />
							<span>Price Tracker</span>
						</li> */}
					</ul>
				</div>
				<div className="dashboard-content">{routesoption[currentItem]}</div>
			</div>
		</div>
	);
};
export default Dashboard;
