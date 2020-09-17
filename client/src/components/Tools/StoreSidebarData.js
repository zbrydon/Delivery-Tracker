import React from "react";
import * as IoIcons from "react-icons/io";
import * as IconName from "react-icons/md";
import * as BookName from "react-icons/bi";
import * as Truck from "react-icons/fa";

//these are the pages and corresponding links for store side
//to add more pase a curly brace and add a title, path, icon and cName.
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/StoreDB",
    icon: <IconName.MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "Store Stock",
    path: "/stockStore",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Create Order",
    path: "/displayWarehouses",
    icon: <Truck.FaTruckMoving />,
    cName: "nav-text",
  },
  {
    title: "View Orders",
    path: "/StoreViewOrder",
    icon: <BookName.BiBookAlt />,
    cName: "nav-text",
  },
  {
    title: "Logout!",
    path: "/",
    cName: "nav-text",
  },
];
