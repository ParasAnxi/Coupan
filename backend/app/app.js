const express = require("express");
const userRoute = require("./routes/user/user");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const app = express();
const bodyparser = require("body-parser");
const date = new Date();
var coupons = [
	{
		id: 1,
		brand: "Croma",
		label: "50% off on electronics",
		coupancode: "KHHAKJS-UIYI-NHJHJNKL-MLJL",
		addedDate: "2022-10-20",
		expiryDate: "2022-10-20",
		addedById: 1,
		addedBy: "Paras",
		viewCount: 500,
		status: "Active",
		image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Croma_Logo.png",
	},
	{
		id: 4,
		brand: "Croma",
		label: "50% off on electronics",
		coupancode: "KHHAKJS-UIYI-NHJHJNKL-MLJL",
		addedDate: "2022-10-20",
		expiryDate: "2022-10-20",
		addedBy: "Paras",
		addedById: 1,
		viewCount: 500,
		status: "Active",
		image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Croma_Logo.png",
	},
	{
		id: 2,
		brand: "Amazon",
		label: "50% off on electronics",
		coupancode: "KHHAKJS-UIYI-NHJHJNKL-MLJL",
		addedDate: "2022-10-20",
		expiryDate: "2022-10-20",
		addedBy: "Paras",
		addedById: 2,
		viewCount: 120,
		status: "Expired",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20220213013322",
	},
	{
		id: 3,
		brand: "Amazon",
		label: "50% off on electronics",
		coupancode: "KHHAKJS-UIYI-NHJHJNKL-MLJL",
		addedDate:
			date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
		expiryDate:
			date.getDate() + 10 + "/" + date.getMonth() + "/" + date.getFullYear(),
		addedBy: "Paras",
		addedById: 2,
		viewCount: 120,
		status: "Active",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20220213013322",
	},
];

app.use(bodyparser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

app.use("/users", userRoute);
app.get("/", async (req, res) => {
	res.send("Hello");
});

app.get("/coupons", async (req, res) => {
	res.json(coupons).status(200);
});

app.post("/coupon/status/:id", async (req, res) => {
	let _res = coupons.map((coupon) => {
		if (coupon.id == req.params.id) {
			coupon.status =
				coupon.status.toLowerCase() == "active" ? "Expired" : "Active";
		}
		return coupon;
	});

	let __res = _res.map((coupon) => {
		if (coupon.addedById == req.body.userid) {
			return coupon;
		}
	});
	let result = __res.filter((coupon) => {
		return coupon != null;
	});

	if (result) {
		return res.json(result).status(200);
	}
	res.json({ message: "not found" }).status(201);
});

app.delete("/coupon", async (req, res) => {
	let result1 = coupons.filter((coupon) => {
		return coupon.id != req.query.id;
	});

	let _res = result1.map((coupon) => {
		if (coupon.addedById == req.query.userid) {
			return coupon;
		}
	});

	let result = _res.filter((coupon) => {
		return coupon != null;
	});

	coupons = result1;
	console.log(coupons);
	if (result) {
		return res.json(result).status(200);
	}
	res.json({ message: "not found" }).status(201);
});

app.get("/coupon/find/:searchText", async (req, res) => {
	if (req.params.searchText.toLowerCase() == "empty") {
		return res.json(coupons).status(200);
	}
	const _res = coupons.filter((coupan) => {
		const temp = coupan.label.toLowerCase() + " " + coupan.brand.toLowerCase();
		const res1 = temp.search(req.params.searchText.toLowerCase());
		if (res1 > 0) {
			return coupan;
		}
	});

	console.log(_res);
	if (_res.length > 0) {
		return res.json(_res).status(200);
	} else {
		return res.json([]).status(200);
	}
});

app.get("/coupon/:id", async (req, res) => {
	console.log(req.params.id);
	const result = coupons.filter((coupon) => {
		return coupon.id == req.params.id;
	});
	res.json(result).status(200);
});

app.put("/coupon/:id", async (req, res) => {
	console.log(req.body);
	let _res = coupons.map((coupon) => {
		if (coupon.id == req.params.id) {
			coupon = req.body;
		}
		return coupon;
	});
	coupons = _res;
	res.json(coupons).status(200);
});

app.post("/coupon/add", async (req, res) => {
	console.log(req.body);
	const output = {
		...req.body,
		id: Math.random(),
		addedById: req.query.id,
		addedBy: req.query.username,
		viewCount: 0,
		status: "Active",
	};
	coupons = [...coupons, output];
	res.json(coupons).status(200);
});

app.get("/coupons/user/:id", async (req, res) => {
	let _res = coupons.map((coupon) => {
		if (coupon.addedById == req.params.id) {
			return coupon;
		}
	});
	let result = _res.filter((coupon) => {
		return coupon != null;
	});

	if (result) {
		return res.json(result).status(200);
	}
	res.json({ message: "not found" }).status(201);
});

app.listen(5000);
mongoose
	.connect("mongodb://127.0.0.1:27017/couponArrays")
	.then((data) => {
		console.log("Connected to Database");
	})
	.catch((err) => {
		console.log("Connection Failed" + err);
	});
