import React from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_ITEMS } from '../GraphQL/Queries';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Login from './auth/login';
import { useAuth } from '../contexts/authContext';

const Download = () => {
  const { loading, error, data } = useQuery(LOAD_ITEMS);
  const { userLoggedIn } = useAuth()

  const downloadExcel = () => {
    if (!loading && !error) {
      const items = data?.getitems || [];

      if (items.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(items);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'items.xlsx');
      } else {
        console.error('No items data to export.');
      }
    }
  };

  return (
    <>
    {
      userLoggedIn?<>
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <button
        className='text-blue-700 hover:text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center dark:bg-blue-300 dark:hover:bg-blue-700'
        onClick={downloadExcel}
      >
        Download Excel
      </button>
    </div>
    </>:

<>
{<Login/>}</>}
</>
  );
};

export default Download;