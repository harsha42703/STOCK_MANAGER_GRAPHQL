import React, { useState } from 'react';
import { CREATE_ITEM_MUTATION } from '../GraphQL/Mutations';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from '../contexts/authContext';
import Login from './auth/login';

const Addform = () => {
  const { userLoggedIn } = useAuth()
  const Navigate = useNavigate();
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const [createItem, { error }] = useMutation(CREATE_ITEM_MUTATION);

  const additem = async (e) => {
    e.preventDefault();
  
    try {
      const result = await createItem({
        variables: {
          item: item,
          price: parseInt(price),
          desc: parseInt(desc),
        },
      });
  
      Navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    {
      userLoggedIn?<>
    <div className='flex items-center justify-center h-screen w-screen'>
      <form className='max-w-sm mx-auto'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-white'>Add Stock</h5>
        <hr className="pt-1 mt-2" />
        <hr className="border-red-400 pb-1" />
        <hr className="border-blue-800 mb-2" />
        <div className='mb-5'>
          <label htmlFor='Item' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Item Name
          </label>
          <input
            type='text'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            placeholder='Enter Item Name'
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='Price' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Price
          </label>
          <input
            type='number'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            placeholder='Price'
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='Description' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Description
          </label>
          <input
            type='text'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            placeholder='Description'
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='text-blue-700 hover:text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-700 '
          onClick={additem}
        >
          Add Item
        </button>
      </form>
    </div>
    </>:

<>
{<Login/>}</>}
</>
  );
};

export default Addform;
