import { IPage } from "@/types";

import { authPages } from "@/modules/auth/routes";
import { corePages } from "@/modules/core/routes";
export const publicRoutes: IPage[] = [
	...authPages,
	...corePages,
];
