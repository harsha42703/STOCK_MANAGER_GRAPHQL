import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { CREATE_ITEM_MUTATION } from '../GraphQL/Mutations';
import { useAuth } from '../contexts/authContext';
import Login from './auth/login';

const UploadForm = () => {
  const [createItem] = useMutation(CREATE_ITEM_MUTATION);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { userLoggedIn } = useAuth()

  const onDrop = useCallback((acceptedFiles) => {
    setUploadError(null);
    setUploadSuccess(false);

    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          jsonData.forEach(async (item) => {
            try {
              await createItem({
                variables: {
                  item: item.item,
                  price: parseInt(item.price),
                  desc: item.desc,
                },
              });
            } catch (error) {
              console.error('Error uploading item:', error.message);
              setUploadError('Error uploading items. Please check your file.');
            }
          });

          console.log('Data uploaded successfully.');
          setUploadSuccess(true);
        } catch (error) {
          console.error('Error processing file:', error.message);
          setUploadError('Error processing file. Please try again.');
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, [createItem]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
  });

  return (
    <>
    {
      userLoggedIn?<>
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <div {...getRootProps()} className='dropzone'>
        <input {...getInputProps()} />
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-[80vw] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        </label>
        {uploadError && (
          <p className='text-white font-bold text-lg opacity-50 flex justify-center items-center flex-col my-2 bg-red-500 backdrop-blur-2xl w-screen h-[40px]'>
            {uploadError}
          </p>
        )}
        {uploadSuccess && (
          <p className='text-white font-bold text-lg opacity-50 flex justify-center items-center flex-col my-2 bg-green-500 backdrop-blur-2xl w-screen h-[40px]'>
            Data uploaded successfully.
          </p>
        )}
      </div>
    </div>
    </>:

<>
{<Login/>}</>}
</>
  );
};

export default UploadForm;
