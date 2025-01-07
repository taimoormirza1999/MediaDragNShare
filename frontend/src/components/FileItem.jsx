import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const FileItem = ({ file, index, moveFile, addTag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'file',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'file',
    hover: (item) => {
      if (item.index !== index) {
        moveFile(item.index, index);
        item.index = index; // Update the moved index
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`file-item ${isDragging ? 'opacity-50' : ''}`}
      style={{
        border: isOver ? '2px dashed green' : '2px solid transparent',
        padding: '10px',
        margin: '5px',
        cursor: 'move',
      }}
    >
      <div>{file.name}</div>
      <div>
        Tags: {file.tags.join(', ')}
        <input
          type="text"
          placeholder="Add a tag"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTag(index, e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  
  // Handles adding a file to the list
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      tags: [],
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handles moving files in the list
  const moveFile = (fromIndex, toIndex) => {
    const updatedFiles = [...files];
    const [movedFile] = updatedFiles.splice(fromIndex, 1);
    updatedFiles.splice(toIndex, 0, movedFile);
    setFiles(updatedFiles);
  };

  // Handles adding a tag to a file
  const addTag = (index, tag) => {
    const updatedFiles = [...files];
    updatedFiles[index].tags.push(tag);
    setFiles(updatedFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileUpload} />
      <div>
        {files.map((file, index) => (
          <FileItem
            key={index}
            file={file}
            index={index}
            moveFile={moveFile}
            addTag={addTag}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
