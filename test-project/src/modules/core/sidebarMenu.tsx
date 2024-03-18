import React from "react";
import { NavLink } from "react-router-dom";

export const SidebarMenu = ({ toggleMenu }) => (
	<div className="sidemenu">
		<div className="">
			<div className="">
				<NavLink
					to="/"
					onClick={toggleMenu}
				>
					Profile
				</NavLink>
				<NavLink
					to="/"
					onClick={toggleMenu}
				>
					Logout
				</NavLink>
			</div>
		</div>
		<NavLink
			className="link"
			to="/sample"
			onClick={toggleMenu}
		>
			Sample Page
		</NavLink>
		<NavLink
			className="link"
			to="/"
			onClick={toggleMenu}
		>
			Page 1
		</NavLink>
		<NavLink
			className="link"
			to="/"
			onClick={toggleMenu}
		>
			Page 2
		</NavLink>
		<NavLink
			className="link"
			to="/"
			onClick={toggleMenu}
		>
			Page 3
		</NavLink>
	</div>
);
