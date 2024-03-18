import React from "react";
import { NavLink } from "react-router-dom";

export const Header = ({ toggleMenu }) => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<i
			className="fas fa-bars fa-lg sidemenu-toggle-icon"
			onClick={toggleMenu}
		></i>
		<NavLink
			className="navbar-brand"
			to="/"
		>
			ZeroSlope v2
		</NavLink>
	</nav>
);
