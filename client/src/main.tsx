import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] =
	"application/json";

ReactDOM.createRoot(
	document.getElementById("root")!
).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
