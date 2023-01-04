import React from "react";
import Search from "../search/Search";
import Brands from "./Brand";
import Category from "./Category";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { AppContext } from "../../context/AppContext";
const Sidebar = ({ category, brands, setCoupans, coupans }) => {
	return (
		<>
			<div className="search-body-sidebar">
				<Search setCoupans={setCoupans} coupans={coupans} />
			</div>
			{/* <div className="category">
				<h4>category</h4>
				<Category category={category} />
			</div> */}
			<div className="brands">
				<h4>brands</h4>
				<Brands brands={brands} setCoupans={setCoupans} coupans={coupans} />
			</div>
		</>
	);
};
export default Sidebar;
