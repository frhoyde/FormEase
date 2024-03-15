import React from "react";

import { Routes, Route } from "react-router-dom";

// import { PublicRouteComponent } from "./public-route.component";
import { publicRoutes } from "../routes";

export const AppRouteComponent: React.FC = () => {
	return (
		<Routes>
			{publicRoutes.map((page) => {
				return (
					<Route
						key={page.name}
						path={page.link}
						element={page.content}
					/>
				);
			})}
		</Routes>
	);
};
