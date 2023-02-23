import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIoArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";
const active = `flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize`;
const inActive = `flex items-center px-5 gap-3 text-gray-500 hover:text-black   transition-all duration-200 ease-in-out capitalize`;
export default function Sidebar({ user, closeToggle }) {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-neutral-300 h-full overflow-y-auto min-w-210">
      <div className="flex flex-col">
        <Link
          to="/"
          onClick={handleCloseSidebar}
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center "
        >
          <img src={logo} alt="logo" className="w-full cursor-pointer" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            onClick={handleCloseSidebar}
            className={({ isActive }) => (isActive ? active : inActive)}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, 5).map((category) => {
            return (
              <NavLink
                key={category.name}
                to={`/category/${category.name}`}
                onClick={handleCloseSidebar}
                className={({ isActive }) => (isActive ? active : inActive)}
              >
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user ? (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 items-center p-1.5 rounded-r-full  shadow-black shadow-xl mx-3"
        >
          <img
            src={user.image}
            alt="user-profile"
            className="w-10 h-10 rounded-full"
          />
          <p>{user.userName}</p>
        </Link>
      ) : (
        <Link
          to="/login"
          className="relative inline-block items-center justify-start my-5 mx-3 text-center  px-4 py-2 overflow-hidden font-medium transition-all bg-gradient-to-br from-slate-600 to-rose-400 hover:ring-1 rounded-full  group"
        >
          <span className="absolute inset-0 border-0 group-hover:border-[20px] border-neutral-300 ease-linear duration-100 transition-all rounded-full" />
          <span className="relative w-full  text-white transition-colors duration-200 ease-in-out bg-clip-text bg-gradient-to-r group-hover:text-transparent">
            Login
          </span>
        </Link>
      )}
    </div>
  );
}
