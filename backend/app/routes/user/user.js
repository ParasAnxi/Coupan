const express = require("express");
const router = express.Router();
var db_users = [
	{
		id: 1,
		name: "Paras",
		pwd: "12345",
	},
	{
		id: 2,
		name: "Anxi",
		pwd: "12345",
	},
	{
		id: 3,
		name: "Shouta",
		pwd: "12345",
	},
];
router.post("/", (req, res) => {
	db_users = [...db_users, req.body];
	res.json(db_users).status(200);
});
router.post("/log", (req, res) => {
	const reqbody = req.body;
	const fetchUser = db_users.filter((user) => {
		return user.name === reqbody.username && user.pwd === reqbody.password;
	});
	if (fetchUser) {
		res.json(fetchUser).status(200);
	} else {
		res.json({ message: "Not Found" }).status(200);
	}
});

module.exports = router;
