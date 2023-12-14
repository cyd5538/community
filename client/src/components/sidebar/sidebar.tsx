import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { AiTwotoneProfile } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoFootballOutline } from "react-icons/io5";

const Sidebar = () => {
  const menus = [
    { name: "Home", link: "/", icon: CiHome },
    { name: "Chat", link: "/", icon: FiMessageSquare },
    { name: "League", link: "/", icon: IoFootballOutline },
    { name: "Profile", link: "/", icon: AiTwotoneProfile, margin: true },
    { name: "Setting", link: "/", icon: IoSettings },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-green-700 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <CiMenuBurger
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-green-950 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-4 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-green-300 font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;