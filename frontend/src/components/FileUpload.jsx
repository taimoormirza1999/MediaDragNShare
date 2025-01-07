import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFileUpload } from 'react-icons/fa';

// toast.configure();

const FileUpload = ({ userId, refreshFiles }) => {
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*,video/*',
  });

  const handleUpload = async () => {
    if (!file) {
      toast.info('Please attach a file first!');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('token');
    try {
      console.log(userId);
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', file);
      formData.append('tags', tags || '');

      const response = await axios.post('http://localhost:5002/auth/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('File uploaded successfully!');
      setFile(null);
      setTags('');  
      refreshFiles();
      
    } catch (error) {
      toast.error('File upload failed');
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  // Suggestion tags
  const suggestionTags = ['Urgent', 'Important', 'Completed', 'In Progress'];

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
      <div className="flex flex-col space-y-2 mt-4">
        <label className="text-lg font-semibold text-gray-700 font-serif">Tags</label>
        <input
          type="text"
          placeholder="Enter tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Suggested Tags:</span>
          <div className="flex space-x-2 mt-1">
            {suggestionTags.map((tag, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setTags((prevTags) => `${prevTags ? prevTags + ', ' : ''}${tag}`)}
                className="px-2 py-1 bg-blue-200 rounded text-blue-600 text-sm hover:bg-blue-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleUpload}
        className={`w-full px-4 py-2 font-semibold text-white rounded-lg transition ${
          uploading ? 'bg-blue-300' : 'bg-gradient-to-r from-primaryBlue to-primaryPurple hover:bg-blue-500'
        }`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default FileUpload;
