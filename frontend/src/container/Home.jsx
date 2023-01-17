import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Routes, Route } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";

export default function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    const fetchUser = async () => {
      const [data] = await client.fetch(query);

      setUser(data);
    };
    fetchUser();
  }, [userInfo?.sub]);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-neutral-200 md:flex-row flex-col h-screen transition-height duration-75 ease-out  ">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row  ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer "
            onClick={() => {
              setToggleSidebar(true);
            }}
          />
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {user ? (
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt="user"
                className="w-9 rounded-full border-amber-700 border-double border-4 "
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="relative inline-block items-center justify-start  px-4 py-1.5 overflow-hidden font-medium transition-all bg-gradient-to-l from-slate-800 to-rose-400 rounded-full hover:bg-neutral-200 hover:ring-1  group"
            >
              <span className="absolute inset-0 border-0 group-hover:border-[20px] border-bg-neutral-200 ease-linear duration-100 transition-all rounded-full" />
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out bg-clip-text bg-gradient-to-r group-hover:text-transparent">
                Login
              </span>
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 sm:w-3/5 bg-white h-screen overflow-y-auto shadow-md z-50 animate-slide-in ">
            <div className="absolute w-full flex justify-end items-center p-2 ">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div
        className="pb-2  flex-auto h-auto overflow-y-scroll  "
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}
