import React from 'react'
import * as IoIcons from "react-icons/io"
import * as IconName from "react-icons/md";
import * as AboutMe from "react-icons/bs"
import * as Truck from "react-icons/fa"

export const SidebarData = [
    {
        title: 'Dashboard',
        path: "/WarehouseDB",
        icon: <IconName.MdDashboard />,
        cName: "nav-text"
    },
    {
        title: 'Warehouse Stock',
        path: "/stockWarehouse",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text"
    },
    {
        title: 'Fufill Order',
        path: "/fulfillOrder",
        icon: <Truck.FaTruckMoving />,
        cName: "nav-text"
    },
    {
        title: 'Add Stock',
        path: "/AddStock",
        icon: <AboutMe.BsFillEnvelopeFill />,
        cName: "nav-text"
    },
    {
        title: 'Logout!',
        path: "/",
        cName: "nav-text"
    }
]