import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doSignOut } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';


const Navbar = () => {
  const { userLoggedIn } = useAuth()


    const handleLogout = () => {
      doSignOut();
    }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white overflow-hidden border-gray-200 bg-opacity-5 z-50 w-screen lg:w-screen fixed top-0 left-0 backdrop-blur-2xl md:h-[70px] lg:h-[70px]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6 md:p-1.5 md:mx-24 relative">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://w7.pngwing.com/pngs/521/66/png-transparent-market-computer-icons-chart-market-blue-angle-text.png"
            className="h-8 rounded-sm"
            alt="logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap md:text-2xl dark:text-white">
            <span className='text-blue-300'>Stock</span> Manager<span className='text-2xl ml-1 font-bold text-blue-300'>.</span>
          </span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <ul className={`font-medium md:flex border p-4 border-gray-600 bg-cyan-950 md:bg-transparent rounded-lg mt-6 md:mt-0 md:border-none  ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:mr-4 dark:text-white md:dark:text-blue-500"
              aria-current="page"
            >
              Stocks
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              className="block py-2  md:mr-4 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="block py-2 px-3  md:mr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Add Stock
            </Link>
          </li>
          <li>
            <Link
              to="/getbyitem"
              className="block py-2 px-3  md:mr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Search Stock
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              className="block py-2 px-3 md:hover:border md:hover:border-blue-400  md:mr-4 text-gray-900 rounded hover:bg-gray-100 md:bg-blue-300 md:py-1 md:text-sm md:px-3 md:rounded-full  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              {userLoggedIn?"Log Out":"Login"}
            </Link>
          </li>
        </ul>
      </div>
       {isMobileMenuOpen && (
          <div
            className="bg-transparent mt-0 left-0 w-full h-[800px]"
            onClick={closeMobileMenu}
          ></div>
        )}
    </nav>
  );
};

export default Navbar;
