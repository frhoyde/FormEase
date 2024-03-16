import { IPage } from "@/app/types";
import { DocumentsPage } from "../pages/documents.page";

export const documentPages: IPage[] = [
	{
		name: "Documents",
		link: "/docs",
		content: <DocumentsPage />,
	},
];
