import React from "react";
import { IconType } from "react-icons/lib";

export interface IPage {
  name: string;
  link: string;
  content: React.FC;
}

export interface IPageGroup {
  header: string;
  icon: IconType;
  pages: IPage[];
}

export interface IDashboard {
  dashboardName: string;
  pages: IPage[];
  sidebar: (IPageGroup | IPage)[];
}