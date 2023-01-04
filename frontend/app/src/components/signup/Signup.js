import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db_users } from "../../db/database";
import InputElements from "../form/InputElement";
import Notify from "../notification/Notify";

import "./signup.css";
function Signup(props) {
	const history = useHistory();

	const [authStatus, setAuthStatus] = useState({
		message: "",
		status: "",
	});

	const [formData, setformData] = useState({
		name: "",
		pwd: "",
		cpwd: "",
	});

	const inputHandler = (event) => {
		setformData({ ...formData, [event.target.name]: event.target.value });
	};
	const submitHandler = () => {
		const fetchUser = db_users.filter((user) => {
			return user.name === formData.name;
		});

		if (fetchUser.length > 0) {
			setAuthStatus({
				message: "User already exist",
				status: "warning",
			});
			return;
		}

		if (formData.pwd === formData.cpwd && formData.pwd !== "") {
			fetch("http://localhost:5000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: Math.random(),
					name: formData.name,
					pwd: formData.pwd,
				}),
			})
				.then((data) => {
					return data.json();
				})
				.then((jsondata) => {
					console.log(jsondata);
				})
				.catch((err) => {
					console.log(err);
				});

			setAuthStatus({
				message: "User Account Created!",
				status: "success",
			});
		} else {
			setAuthStatus({
				message: "password does not match !",
				status: "failure",
			});
			setTimeout(() => {
				setAuthStatus({
					message: "",
					status: "",
				});
			}, 1000);
		}
		setformData({ name: "", pwd: "", cpwd: "" });
	};
	return (
		<div className="signup-container">
			<Notify />
			<div className="signup-label">
				<h3>Register</h3>
			</div>
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
			<InputElements
				label="Username"
				type="text"
				text="create username"
				name="name"
				onChange={inputHandler}
				value={formData.name}
			/>
			<InputElements
				label="Password"
				type="password"
				text="create password"
				name="pwd"
				onChange={inputHandler}
				value={formData.pwd}
			/>

			<InputElements
				label="Confirm Password"
				type="password"
				text="confirm password"
				name="cpwd"
				onChange={inputHandler}
				value={formData.cpwd}
			/>
			<InputElements
				label=""
				type="Submit"
				value={"Register"}
				onClick={submitHandler}
				onChange={submitHandler}
			/>

			<div className="links" onClick={props.setLogin}>
				<span>Sign-in</span>
			</div>
		</div>
	);
}

export default Signup;
