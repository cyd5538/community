import React from 'react'
import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';

interface SidebarProp {
  menu: {
    name: string;
    link: string;
    icon: IconType;
    margin?: boolean;
    onClick?: () => void
  }
  i: number
  open: boolean
}

const Sidebar: React.FC<SidebarProp> = ({ menu, i, open }) => {
  return (
    <li
      onClick={menu.onClick}
      key={menu.name}
    >
      <Link 
      to={menu?.link} 
      className={` ${menu?.margin && "mt-5"
        } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-green-500 rounded-md`}
      >
        <div>
          {React.createElement(menu?.icon, { size: "20" })}
        </div>
        <h2
          style={{
            transitionDelay: `${i}00ms`,
          }}
          className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-4 overflow-hidden"}`}
        >
          {menu?.name}
        </h2>
        <h2
          className={`${open && "hidden"
            } absolute left-48 bg-green-300 font-semibold whitespace-pre
             text-gray-900 rounded-md drop-shadow-lg px-0 
             py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14
              group-hover:duration-300 group-hover:w-fit  
          `}
        >
          {menu?.name}
        </h2>
      </Link>
    </li>
  )
}

export default Sidebar
