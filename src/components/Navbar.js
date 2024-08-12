import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getIdFromToken from "../helpers/GetIdFromToken.js";
import Cookies from "js-cookie";
import { BorderButton } from "./BorderButton.js";

const Navbar = () => {
  const [id, setId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getIdFromToken();
      if (user) {
        setId(user._id);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    Cookies.remove("NotesSaverToken");
    window.location.href = "/";
  };

  return (
    <div className="navbar bg-slate-400 dark:bg-gray-950 text-black dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-600 dark:bg-gray-950 text-black dark:text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {id && (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Notes Saver
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          {id && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}
          
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="toggle mr-4"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          {id ? (
            <div onClick={handleLogout}>
              <BorderButton text="Logout" />
            </div>
          ) : (
            <Link to="/register">
              <BorderButton text="SignUp" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
