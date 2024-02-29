import React, { useState } from 'react';
import { useLazyQuery } from "@apollo/client";
import Card from './Card';
import { LOAD_ITEM_BY_ITEM } from '../GraphQL/Queries';
import Login from './auth/login';
import { useAuth } from '../contexts/authContext';

const GetByItem = () => {
  const { userLoggedIn } = useAuth()
  const [item, setItem] = useState('');
  const [getItem, { loading, error, data }] = useLazyQuery(LOAD_ITEM_BY_ITEM);

  const handleGetByitem = () => {
    getItem({ variables: { item: item } });
  };

  return (
    <>
    {
      userLoggedIn?<>
    <div className='w-[98vw] h-auto pt-2 pb-4 flex flex-col justify-center items-center mb-3 '>
      <form onSubmit={(e) => { e.preventDefault(); handleGetByitem(); }} className='mb-4 h-[43px] '>
        <input
          type='text'
          id='itemName'
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder='Enter Item Name : '
          className='placeholder:text-blue-200 placeholder:font-normal placeholder:text-sm text-blue-700 py-[7px] w-[200px] rounded-l-full font-bold bg-transparent border outline-none'
          required
        />
        <button type='submit' className='text-white bg-blue-300 hover:bg-blue-800 font-medium rounded-r-full text-md px-5 py-[8px] md:py-[7.5px] text-center dark:bg-blue-700 dark:hover:bg-blue-700'>
        Search
        </button>
      </form>

      {loading && <p className='text-white'>Loading...</p>}
      {error && <p className='text-white font-bold text-lg opacity-50 flex jusity-center items-center flex-col my-2 bg-transparent backdrop-blur-2xl w-screen h-[40px]'>Stock Not Available 😑</p>}
      {data && data.getitembyitem && (
        <div className='h-auto mt-4 max-w-full'>
          <Card key={data.id} data={data.getitembyitem} />
        </div>
      )}
    </div>
    </>:

<>
{<Login/>}</>}
</>
  );
};

export default GetByItem;
