import { IPage } from "@/types";

import { adminPages } from "@/modules/admin/routes";
import { authPages } from "@/modules/auth/routes";
import { documentPages } from "@/modules/documents/routes";
// Routes that are publicly available (only if not authenticated)
// export const authRoutes: IPage[] = [
// 	...authModuleRoutes,
// ];

// Routes that are always available (both authenticated or not authenticated)
export const publicRoutes: IPage[] = [
  ...adminPages,
  ...authPages,
  ...documentPages,
];

// Starting route
export const rootRoute = "/login";
