import React from 'react';
import { useAuth } from '../contexts/authContext';
import Login from './auth/login/index'; 

const About = () => {
 const userLoggedIn = useAuth();
  return (
    <>
      {userLoggedIn ? <>
      <div className='flex flex-col items-center justify-center h-screen w-screen'>
      <img
      src="https://w7.pngwing.com/pngs/521/66/png-transparent-market-computer-icons-chart-market-blue-angle-text.png"
      className="h-8 rounded-sm mr-2"
      alt="logo"
    />
    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
      <span className='text-blue-300'>Stock</span> Manager<span className='text-2xl ml-1 font-bold text-blue-300'>.</span>
    </span>
    <hr className=" w-[30vw] pt-1 mt-2" />
  <hr className=" w-[30vw] border-red-400 pb-1" />
  <hr className="w-[30vw] border-blue-800 mb-2" />
  <div className='text-center text-white w-[60vw] text-sm md:text-xl font-fold text-justify'>
<span className='text-blue-200'>Welcome to Stock Manager,</span> a cutting-edge application built on GraphQL, leveraging the power of Firebase for secure authentication and MongoDB for robust data storage. Developed with React, our platform offers seamless stock data management, enabling you to effortlessly download, upload, update, and delete stock information. The user-friendly interface, crafted with Tailwind CSS, ensures a fully responsive experience, making stock management efficient and intuitive. Explore the future of stock data handling with Stock Manager.
  </div>
  </div>


      </> : <Login/> }
      </>
  )
}

export default About
