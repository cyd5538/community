import { useState } from "react";
import { CiHome, CiLogin, CiLogout } from "react-icons/ci";
import { AiTwotoneProfile } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoFootballOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import useAuth from "@/store/useAuth";
import Sidebar from "./Sidebar";

const Sidebars = () => {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false);
  
  const menus = [
    { name: "Home", link: "/", icon: CiHome },
    { name: "Chat", link: "/room", icon: FiMessageSquare },
    { name: "League", link: "/football", icon: IoFootballOutline },
    { name: "Profile", link: "/me", icon: AiTwotoneProfile },
    { name: "Search", link: "/search", icon: CiSearch, margin: true },
    { name: "Setting", link: "/", icon: IoSettings },
    { name: "Login", link: "/login", icon: CiLogin, margin: true },
    { name: "Logout", link: "/", icon: CiLogout, margin: true, onClick: logout },
    { name: "Sign up", link: "/register", icon: FaWpforms, },
  ];

  const filteredMenus = menus.filter((menu) => {
    if (menu.name === "Logout" && !user) {
      return false;
    }

    if ((menu.name === "Login" || menu.name === "Sign up") && user) {
      return false;
    }

    return true;
  });

  return (
    <header className="flex fixed top-0 left-0 z-40 gap-6">
      <div
        data-testid="sidebar"
        className={`bg-green-400 min-h-screen ${open ? "w-40" : "w-[70px]"
          } duration-500 text-black px-4 relative`}
      >
        <div
          data-testid="toggle-button"
          className={`absolute duration-500 top-6 w-8 h-8 flex justify-center 
          items-center cursor-pointer bg-white rounded-full shadow-lg shadow-green-500/50 
          ${open ? "left-36" : "left-14"}`}
          onClick={() => setOpen(!open)}
        >
          {open ?
            <IoIosArrowRoundBack 
              data-testid="arrow-roundBack-icon" 
              size={26} 
            /> 
            :
              <IoIosArrowRoundForward 
              size={26}
              data-testid="arrow-roundForward-icon" 
            />
          }
        </div>
        <nav>
          <ul className="mt-16 flex flex-col gap-4 relative">
            {filteredMenus?.map((menu, i) => (
              <Sidebar
                key={menu.name}
                menu={menu}
                open={open}
                i={i}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Sidebars;