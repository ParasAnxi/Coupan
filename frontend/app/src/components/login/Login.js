import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InputElements from "../form/InputElement";
import Notify from "../notification/Notify";
import "./login.css";

import { LoginContext } from "../../context/LoginContext";
import { PORT } from "../../context/Server";

function Login(props) {
	const history = useHistory();
	const [authStatus, setAuthStatus] = useState({
		message: "",
		status: "",
	});
	const [users, listofusers] = useState([]);
	useEffect(() => {
		console.log("Sign-In component In");
	}, []);

	const [formData, setformData] = useState({ username: "", password: "" });
	const inputHandler = (event) => {
		setformData({ ...formData, [event.target.name]: event.target.value });
	};

	const submitHandler = () => {
		fetch("http://localhost:" + PORT + "/users/log", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((data) => {
				return data.json();
			})
			.then((jsondata) => {
				console.log(jsondata);
				if (jsondata.length > 0) {
					setAuthStatus({
						message: "success",
						status: "success",
					});
					props.setLogin(false);
					history.push({
						pathname: "/dashboard",
						state: jsondata[0],
					});
				} else {
					setAuthStatus({
						message: "Invalid Credentails, try again!",
						status: "failure",
					});

					setTimeout(() => {
						setAuthStatus({
							message: "",
							status: "",
						});
					}, 1000);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="login-container">
			<Notify
				status={authStatus.status}
				resetNotify={() => {
					setAuthStatus({
						message: "",
						status: "",
					});
				}}
			>
				{authStatus.message}
			</Notify>
			<div className="login-label">
				<h3>Login here..</h3>
			</div>
			<InputElements
				label="Username"
				type="text"
				text="username"
				name="username"
				onChange={inputHandler}
				value={formData.username}
			/>
			<InputElements
				label="Password"
				type="password"
				text="password"
				name="password"
				onChange={inputHandler}
				value={formData.password}
			/>
			<InputElements
				label=""
				type="Submit"
				value={"Login"}
				onClick={submitHandler}
				onChange={submitHandler}
			/>
			<div className="links" onClick={props.setRegister}>
				<span>Register</span>
			</div>
		</div>
	);
}

export default Login;
