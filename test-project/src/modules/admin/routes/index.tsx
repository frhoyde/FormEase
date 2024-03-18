import { IPage } from "@/types";
import { AdminFormPage } from "../pages/admin-form.page";
import { AdminCreateFormPage } from "../pages/admin-create-form.page";

export const adminPages: IPage[] = [
	{
		name: "Dashboard",
		link: "/admin/form",
		content: <AdminFormPage />,
	},
	{
		name: "Form",
		link: "/admin/form/create",
		content: <AdminCreateFormPage />,
	},
];
