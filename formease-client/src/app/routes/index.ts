import { IDashboard, IPage } from "@/app/types";
import { adminDashboard } from "@/modules/admin/routes";

// Routes that are publicly available (only if not authenticated)
// export const authRoutes: IPage[] = [...authModuleRoutes];

// Routes that are privately available (only if authenticated)
export const dashboardList: IDashboard[] = [
  adminDashboard,
];

// Routes that are always available (both authenticated or not authenticated)
export const publicRoutes: IPage[] = [];

// Starting route
export const rootRoute = "/login";