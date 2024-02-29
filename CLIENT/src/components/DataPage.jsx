import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LOAD_ITEMS } from '../GraphQL/Queries';
import GetByItem from './GetByItem';
import { useAuth } from '../contexts/authContext';
import Login from './auth/login';

const DataPage = () => {
  const Navigate = useNavigate();
  const { data, refetch } = useQuery(LOAD_ITEMS);
  const [items, setItems] = useState([]);
  const { userLoggedIn } = useAuth()
  useEffect(() => {
    if (data) {
      setItems(data.getitems);
    }
  }, [data]);

  const handleRefresh = () => {
    refetch();
  };

  const handleUpload = () => {
    Navigate('/Upload');
  };

  const handleDownload = () => {
    Navigate ('/Download');
  };

  return (
<>
{
  userLoggedIn?<>
  <div className="w-screen h-screen pt-28 py-4 px-6">
      <div className="flex justify-between mb-4">
        <GetByItem />
      </div>
      <div className='w-[90vw] h-[120px] flex flex-col justify-center items-center my-3 md:w-[95vw]'>
      <hr className='w-screen border-gray-700 mb-[10px] '/>
      <div className='w-screen flex justify-center items-center h-[80px] '>
      <button
          className="text-green-700 mr-3 hover:text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-md px-2 py-2 text-center dark:bg-green-300 dark:hover:bg-green-700"
          onClick={handleRefresh}
        >
         &#8635; Refresh
        </button>
      <button
          className="text-orange-700 mr-3 hover:text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-full text-md px-2 py-2 text-center dark:bg-orange-300 dark:hover:bg-orange-700"
          onClick={handleUpload}
        >
         &#8593; Upload
        </button>
      <button
          className="text-yellow-700 mr-3 hover:text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-full text-md px-2 py-2 text-center dark:bg-yellow-300 dark:hover:bg-yellow-700"
          onClick={handleDownload}
        >
         &#8595; Download
        </button>
      </div>
      <hr className='w-screen border-gray-700 mb-8 mt-[10px]'/>
        </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((val, index) => (
          <div className="h-auto max-w-full rounded-2xl m-2" key={index}>
            <Card data={val} />
          </div>
        ))}
      </div>
    </div>

  </>:

  <>
  
  {<Login/>}</>
}
</>
  );
};

export default DataPage;
