import React from 'react'
import { useAuth } from '../contexts/authContext';
import Login from './auth/login';

const About = () => {
 const userLoggedIn = useAuth();
  return (
    <>
{
  !userLoggedIn?<>
         <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <img
            src="https://w7.pngwing.com/pngs/521/66/png-transparent-market-computer-icons-chart-market-blue-angle-text.png"
            className="h-8 rounded-sm mr-2"
            alt="logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <span className='text-blue-300'>Stock</span> Manager<span className='text-2xl ml-1 font-bold text-blue-300'>.</span>
          </span>
          <hr className=" w-[30vw] pt-1 mt-2" />
        <hr className=" w-[30vw] border-red-400 pb-1" />
        <hr className="w-[30vw] border-blue-800 mb-2" />
        </div>
        </>:

<>
{<Login/>}</>}
</>
  )
}

export default About