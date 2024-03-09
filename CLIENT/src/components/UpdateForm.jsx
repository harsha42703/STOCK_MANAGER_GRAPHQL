import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { LOAD_ITEM_BY_ID } from '../GraphQL/Queries';
import { UPDATE_ITEM_MUTATION } from '../GraphQL/Mutations';
import Login from './auth/login';
import { useAuth } from '../contexts/authContext';

const UpdateForm = () => {
  const { userLoggedIn } = useAuth()
  const Navigate = useNavigate();
  const { id } = useParams();
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const { loading, error, data } = useQuery(LOAD_ITEM_BY_ID, {
    variables: { id },
  });

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);

  useEffect(() => {
    if (!loading && data && data.getitembyid) {
      const { id, item, price, desc } = data.getitembyid;
      setItemId(id);
      setItem(item);
      setPrice(price.toString()); 
      setDesc(desc);
    }
  }, [loading, data]);

  const updateItemHandler = async () => {
    try {
      await updateItem({
        variables: { id: itemId, item, price: parseInt(price), desc },
      });
      console.log('Item updated successfully!');
      Navigate('/');
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    {
      userLoggedIn?<>
    <div className='flex item-center justify-center h-screen w-screen flex-col'>
      <form className='max-w-sm mx-auto'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-500 text-white'>Update Stock</h5>
        <hr className="pt-1 mt-2" />
        <hr className="border-red-400 pb-1" />
        <hr className="border-blue-800 mb-2" />
        <div className='mb-5'>
          <label htmlFor='Item' className='block mb-2 text-sm font-medium text-gray-900 text-white'>
            Item ID
          </label>
          <input
            type='text'
            value={itemId}
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light'
            placeholder='Enter Item ID'
            required
            readOnly
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='Item' className='block mb-2 text-sm font-medium text-gray-900 text-white'>
            Item Name
          </label>
          <input
            type='text'
            value={item}
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light'
            placeholder='Enter Item Name'
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='Price' className='block mb-2 text-sm font-medium text-gray-900 text-white'>
            Price
          </label>
          <input
            type='number'
            value={price}
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light'
            placeholder='Price'
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='Description' className='block mb-2 text-sm font-medium text-gray-900 text-white'>
            Stock Count
          </label>
          <input
            type='text'
            value={desc}
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light'
            placeholder='Description'
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button
          type='button'
          className='text-blue-700 hover:text-white hover:bg-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center bg-blue-300 hover:bg-blue-700 '
          onClick={updateItemHandler}
        >
          Update Item
        </button>
      </form>
    </div>
    </>:

<>
{<Login/>}</>}
</>
  );
};

export default UpdateForm;
