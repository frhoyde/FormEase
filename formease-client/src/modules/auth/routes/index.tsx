import { IPage } from "@/app/types";
import { LoginPage } from "../pages/login.page";

export const authPages: IPage[] = [
	{
		name: "Login",
		link: "/login",
		content: <LoginPage />,
	},
];
