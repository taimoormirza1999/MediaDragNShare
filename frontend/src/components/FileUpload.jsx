import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFileUpload } from 'react-icons/fa';

// toast.configure();

const FileUpload = () => {
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*,video/*', 
  });

//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('tags', tags);
//     setUploading(true);

//     try {
//       await axios.post('http://localhost:5002/auth/upload', formData);
//       toast.success('File uploaded successfully!');
//     } catch (error) {
//       toast.error('File upload failed');
//       console.log(error)
//       console.error('Error uploading file:', error); // Log the error
//     } finally {
//       setUploading(false);
//     }
//   };
const handleUpload = async (file) => {
  const token = localStorage.getItem('token'); 
    try {
      console.log("Uploading file:", file);  // Log the file being uploaded
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', tags || '');
  
      const response = await axios.post('http://localhost:5002/auth/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form className="p-6 bg-gradient-to-r from-blue-50 to-purple-100 rounded-lg shadow-md space-y-4">
      <div {...getRootProps()} className={`border-dashed border-2 p-6 rounded-lg cursor-pointer ${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        } flex justify-center items-center space-x-3`}>
        <input {...getInputProps()} />
        <FaFileUpload className="text-3xl text-blue-500" />
        <span className="text-lg font-medium text-gray-600">
          {isDragActive ? 'Drop files here...' : 'Drag and drop files or click to select'}
        </span>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-semibold text-gray-700 font-serif">Tags</label>
        <input
          type="text"
          placeholder="Enter tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="button"
        onClick={() => toast.info('Please attach the File!')}
        className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition ${
          uploading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-500'
        }`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default FileUpload;
