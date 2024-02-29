import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM_MUTATION } from '../GraphQL/Mutations';
import './animatecard.css';


const Card = ({ data }) => {
  const { id, item, price, desc } = data;
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);


  const handleRemove = async () => {
    try {
      await deleteItem({
        variables: {
          id: id,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='animate-card'>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-shadow shadow shadow-4xl shadow-slate-600 shadow-inner">
        <h5 className="mb-2 text-sm font-bold capitalize tracking-tight text-gray-900 dark:text-white md:text-2xl">{item}</h5>
        <hr className="pt-1 mt-2" />
        <hr className="border-red-400 pb-1" />
        <hr className="border-blue-800 mb-2" />
        <h3 className="mb-2 text-sm font-bold capitalize tracking-tight text-slate-300 md:text-lg">Price : {price}/-</h3>
        <h2 className="text-sm font-bold capitalize text-gray-400 md:text-2xl">Stock Count : {desc}</h2>
        <div>
          <Link
            to={`/update/${id}`}
            className="block w-full px-4 py-2 mt-4 text-sm font-semibold text-center text-white uppercase transition-colors duration-200 transform bg-blue-700 rounded-2xl hover:text-white hover:bg-blue-600 dark:text-blue-700 dark:bg-blue-300 focus:outline-none focus:bg-blue-600"
          >
            Update
          </Link>
          <button
            className="block w-full px-4 py-2 mt-4 text-sm font-semibold text-center text-white uppercase transition-colors duration-200 transform bg-red-700 rounded-2xl hover:text-white hover:bg-red-600 dark:text-red-700 dark:bg-red-300 focus:outline-none focus:bg-red-600"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
