import React from "react";
import {
	StatusActive,
	ViewCount,
	StatusExpired,
	AddedBy,
	AddedOn,
	ExpireOn,
} from "../../shared/Icons";

import { MdEdit, MdDelete, MdHideSource, MdVisibility } from "react-icons/md";

import vcode from "../../images/icons/voucher.png";
import "./card.css";
function Card({
	coupan,
	deleteCardHandler,
	editCardHandler,
	changeStatusHandler,
	loginstatus,
}) {
	function copycodeHandler(event) {
		navigator.clipboard.writeText(event.target.innerText);
	}
	return (
		<div className="coupan-card">
			<div className="coupan-header">
				<div className="coupan-image">
					{loginstatus && (
						<div className="coupan-footers ">
							<div className="actionButtons">
								<button onClick={editCardHandler}>
									<MdEdit />
								</button>
								<button onClick={deleteCardHandler}>
									<MdDelete />
								</button>
								<button onClick={changeStatusHandler}>
									{coupan.status.toLowerCase() === "active" ? (
										<MdHideSource />
									) : (
										<MdVisibility />
									)}
								</button>
							</div>
						</div>
					)}
					<img
						src={
							"https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www." +
							coupan.brand +
							".com&size=50"
						}
						alt={coupan.label}
					/>
				</div>
				<div className="coupan-title">
					<span className="coupan-label">
						<span>{coupan.brand} - </span>
						{coupan.label}
					</span>
					<div>
						{coupan.status.toLowerCase() === "active" ? (
							<button className="btn">
								<StatusActive /> &nbsp;
								{coupan.status.charAt(0).toUpperCase() + coupan.status.slice(1)}
							</button>
						) : (
							<button className="btn">
								<StatusExpired />
								&nbsp;
								{coupan.status}
							</button>
						)}
						<button className="btn btn-secondry">
							<ViewCount />
							&nbsp;
							{coupan.viewCount}
						</button>
					</div>
					<div className="coupan-code">
						<button className="btn">
							<img src={vcode} alt="voucher code" height={25} />
							&nbsp;
							<span
								className={
									coupan.status.toLowerCase() === "active"
										? ""
										: "coupon-code-value"
								}
								onClick={copycodeHandler}
							>
								{coupan.coupancode}
							</span>
						</button>
					</div>
				</div>
				<div className="coupan-side">
					<div className="coupan-info">
						<ul>
							<li>
								<AddedBy />
								&nbsp;
								<span>Added by&nbsp;</span>
								{coupan.addedBy}
							</li>
							<li>
								<AddedOn />
								&nbsp;
								<span>Added on&nbsp;</span>
								{coupan.addedDate}
							</li>
							<li>
								<ExpireOn />
								&nbsp;
								<span>Expire on &nbsp;</span>
								{coupan.expiryDate}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Card;
