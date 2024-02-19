import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { CiHome, CiLogin, CiLogout } from "react-icons/ci";
import { AiTwotoneProfile } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoFootballOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import useAuth from "@/store/useAuth";
import Sidebar from "./Sidebar";

const Sidebars = () => {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "Home", link: "/", icon: CiHome },
    { name: "Chat", link: "/room", icon: FiMessageSquare },
    { name: "League", link: "/football", icon: IoFootballOutline },
    { name: "Profile", link: "/me", icon: AiTwotoneProfile, margin: true },
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
        className={`bg-green-400 min-h-screen ${open ? "w-40" : "w-16"
          } duration-500 text-black px-4`}
      >
        <div className="py-3 flex justify-end">
          <CiMenuBurger
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <nav>
          <ul className="mt-4 flex flex-col gap-4 relative">
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