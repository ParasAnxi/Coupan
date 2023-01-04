import React, { useEffect, useState } from "react";
import "./App.css";
import { PORT } from "./context/Server";

import { AppContext } from "./context/AppContext";
import {
	BrowserRouter as Router,
	useHistory,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import logo from "./images/logo-light.png";
import logoText from "./images/logo-text-light.jpg";
import Card from "./components/card/Card";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/search/Search";
import Backdrop from "./components/backdrop/Backdrop";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";

const brands = [
	{ type: "fashion", name: "nike", id: 1 },
	{ type: "online", name: "Amazon", id: 2 },
	{ type: "online", name: "Flipkart", id: 3 },
	{ type: "online", name: "Nyka", id: 4 },
	{ type: "online", name: "Croma", id: 5 },
];
const category = {
	1: "Electronics",
	2: "Foods & Beverages",
	3: "Clothings",
	4: "Beauty products",
	5: "Online Stores",
};

const date = new Date();

function App() {
	const history = useHistory();
	const [login, setLogin] = useState(false);
	const [register, setRegister] = useState(false);
	var [coupans, setCoupans] = useState([]);

	useEffect(() => {
		console.log("App.js " + PORT);
		fetchCoupon();
	}, []);
	function fetchCoupon() {
		fetch("http://localhost:" + PORT + "/coupons", {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((jsondata) => {
				setCoupans(jsondata);
			})
			.catch();
	}
	const filterHandler = (data) => {
		console.log(data);
	};
	function fetchCoupon() {
		fetch("http://localhost:" + PORT + "/coupons", {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((jsondata) => {
				setCoupans(jsondata);
			})
			.catch();
	}
	return (
		<Router>
			<main>
				<Switch>
					<Route path="/" exact>
						{login ? (
							<Backdrop
								closeBackdrop={() => {
									setLogin(!login);
								}}
							>
								<Login
									setRegister={() => {
										if (!register) setRegister(!register);
										else setLogin(false);
									}}
									setLogin={(status) => {
										setLogin(status);
									}}
								/>
							</Backdrop>
						) : (
							""
						)}
						{register ? (
							<Backdrop
								closeBackdrop={() => {
									setRegister(!register);
								}}
							>
								<Signup
									setLogin={() => {
										if (!login) setLogin(!login);
										else setRegister(!register);
									}}
								/>
							</Backdrop>
						) : (
							""
						)}

						<header className="header">
							<div>
								<img src={logo} alt="logo" className="logo" />
							</div>
							<div>
								<img src={logoText} alt="logo" className="logoText" />
							</div>
							{/* SignIn */}
							<div>
								<button
									className="btn btn-secondry"
									onClick={() => {
										setLogin(true);
									}}
								>
									SignIn
								</button>
							</div>
							{/* SignUp */}
							<div>
								<button
									className="btn btn-secondry"
									onClick={() => {
										setRegister(true);
									}}
								>
									Register
								</button>
							</div>
						</header>
						<section className="content-body">
							<div className="search-body">
								<Search setCoupans={setCoupans} coupans={coupans} />

								{/* <div className="filters">
										<div>
											<Category />
										</div>
										<div>
											<Brands brands={brands} />
										</div>
									</div> */}
							</div>
							<div className="content">
								{coupans.length === 0 ? "No Coupon found" : ""}
								{coupans.map((coupan) => (
									<Card
										coupan={coupan}
										key={coupan.id}
										id={coupan.id}
										loginstatus={false}
									/>
								))}
							</div>
							<div></div>
							<div className="sidebar p-4">
								<Sidebar
									brands={brands}
									category={category}
									setCoupans={setCoupans}
									coupans={coupans}
								/>
							</div>
						</section>
					</Route>
					<Route path="/dashboard" exact>
						<AppContext.Provider value={{ coupans, setCoupans, fetchCoupon }}>
							<Dashboard />
						</AppContext.Provider>
					</Route>
				</Switch>
			</main>
		</Router>
	);
}

export default App;
