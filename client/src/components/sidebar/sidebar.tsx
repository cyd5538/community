import React from 'react'
import { IconType } from 'react-icons/lib';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProp {
  menu: {
    name: string
    link: string | null;
    icon: IconType;
    margin?: boolean;
    onClick?: () => void
  }
  i: number
  open: boolean
}

const Sidebar: React.FC<SidebarProp> = ({ menu, i, open }) => {
  const location = useLocation();
  const url = location.pathname.slice(1);

  return (
    <li
      onClick={menu.onClick}
    >
      {menu.link ?
        <Link
          to={menu?.link}
          className={`${menu?.margin ? "mt-5" : ""} 
          ${url === "" && menu.name === "Home" ? "bg-white" : ""}
          ${url === "room" && menu.name === "Chat" ? "bg-white" : ""}
          ${url === "football" && menu.name === "League" ? "bg-white" : ""}
          ${url === "me" && menu.name === "Profile" ? "bg-white" : ""}
          ${url === "search" && menu.name === "Search" ? "bg-white" : ""}
          group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-white rounded-md`}
        >
          <div>
            {React.createElement(menu?.icon, { size: "20" })}
          </div>
          <h2
            style={{
              transitionDelay: `${i}00ms`,
            }}
            className={`whitespace-pre duration-500 font-semibold ${!open && "opacity-0 translate-x-4 overflow-hidden"}`}
          >
            {menu?.name}
          </h2>
          <h2
            className={`${open && "hidden"
              } absolute left-48 bg-green-400 font-semibold whitespace-pre
            rounded-md drop-shadow-lg px-0 text-white
             py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14
              group-hover:duration-300 group-hover:w-fit shadow-lg shadow-green-500/50  
          `}
          >
            {menu?.name}
          </h2>
        </Link> 
        : null
      }
    </li>
  )
}

export default Sidebar
