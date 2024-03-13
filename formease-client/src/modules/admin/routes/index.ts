import { IDashboard } from "@/app/types";
import { MissingPage } from "@/modules/core/pages/missing.page";


export const adminDashboard: IDashboard = {
  dashboardName: "admin",
  pages: [
    {
      name: "Dashboard",
      link: "/admin/hospital/create",
      content: MissingPage
    }
  ],

  sidebar: [
    {
      name: "User",
      link: "/admin/dashboard",
      content: MissingPage
    },

  ]
};