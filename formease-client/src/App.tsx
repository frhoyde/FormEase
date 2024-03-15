import { BrowserRouter } from "react-router-dom";
import { AppRouteComponent } from "./app/components/app-route.component";

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<AppRouteComponent />
			</BrowserRouter>
		</>
	);
};
