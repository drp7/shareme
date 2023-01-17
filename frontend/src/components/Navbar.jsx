import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
export default function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <label
        className="flex justify-start items-center w-full px-2
rounded-md bg-white border-none outline-none focus-within:shadow-sm flex-auto"
      >
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search..."
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full flex-auto bg-white outline-none"
        />
      </label>
      <div className="flex gap-3 items-center">
        <Link className="hidden md:block" to={`/user-profile/${user?._id}`}>
          <img src={user.image} alt="user" className="w-11  rounded-full" />
        </Link>
        <Link
          to="/create-pin"
          className="bg-zinc-800 text-white rounded-sm w-10 h-10 grid place-items-center flex-none "
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
}
