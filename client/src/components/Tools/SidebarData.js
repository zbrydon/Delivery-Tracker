import React from 'react'
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as IconName from "react-icons/md";
import * as BookName from "react-icons/bi"
import * as AboutMe from "react-icons/bs"
import * as Truck from "react-icons/fa"

export const SidebarData = [
    {
        title: 'Dashboard',
        path: "/dashboard",
        icon: <IconName.MdDashboard />,
        cName: "nav-text"
    },
    {
        title: 'Store Stock',
        path: "/stockStore",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text"
    },
    {
        title: 'Warehouse Stock',
        path: "/warehouseStock",
        icon: <IoIcons.IoIosPaper />,
        cName: "nav-text"
    },
    {
        title: 'Create Order',
        path: "/createOrder",
        icon: <Truck.FaTruckMoving />,
        cName: "nav-text"
    },
    {
        title: 'View Orders',
        path: "/viewOrders",
        icon: <BookName.BiBookAlt />,
        cName: "nav-text"
    },
    {
        title: 'About Me',
        path: "/about",
        icon: <AboutMe.BsFillEnvelopeFill />,
        cName: "nav-text"
    }
]