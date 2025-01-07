import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactModalImage from 'react-modal-image';
import { ToastContainer, toast } from 'react-toastify';
const FileList = ({ files }) => {
  // Organize files by their tags
  const filesByTags = files.reduce((acc, file) => {
    if (file.tags) {
      file.tags.split(',').forEach((tag) => {
        tag = tag.trim();
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(file);
      });
    }
    return acc;
  }, {});

  // Handle Drag End
  const handleDragEnd = (result, tagKey) => {
    if (!result.destination) return;

    const items = Array.from(filesByTags[tagKey]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedFilesByTags = { ...filesByTags, [tagKey]: items };
  };
 const incrementViewCount = async (fileId) => {
  try {
    const response = await fetch(`/increment-view/${fileId}`, {
      method: 'POST',
    });

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to increment view count: ${response.statusText}`);
    }

    // Log raw response to debug
    const rawResponse = await response.text();
    console.log('Raw Response:', rawResponse);

    // Check if response contains JSON
    try {
      const data = JSON.parse(rawResponse);
      toast.success('File view count incremented!');
      // Update the file views count in state after increment
      setFilesState((prevFiles) =>
        prevFiles.map((file) =>
          file.$id === fileId ? { ...file, views: data.views } : file
        )
      );
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast.error('Failed to parse server response');
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
    toast.error('Error incrementing view count');
  }
};

  

  const renderFilePreview = (file) => {
    if (file.fileUrl.endsWith('.jpg') || file.fileUrl.endsWith('.png') || file.fileUrl.endsWith('.jpeg')) {
      return (
        <ReactModalImage
          small={file.fileUrl}
          large={file.fileUrl}
          alt={file.fileName}
          className="w-100 h-100 object-cover rounded shadow-2xl cursor-pointer"
        />
      );
    }
    if (file.fileUrl.endsWith('.mp4') || file.fileUrl.endsWith('.webm') || file.fileUrl.endsWith('.mov')) {
      return (
        <video
          src={file.fileUrl}
          controls
          className="w-24 h-24 rounded shadow-xl cursor-pointer"
        />
      );
    }
    return <div className="w-24 h-24 bg-gray-300 rounded text-center flex items-center justify-center">No Preview</div>;
  };

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <div className="p-6 rounded-lg shadow-lg space-y-4 bg-gradient-to-r from-blue-100 to-pink-100 mx-auto">
        <Droppable droppableId="tags" direction="horizontal">
          {(provided) => (
            <div
              className="flex space-x-4 overflow-x-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.keys(filesByTags).map((tag, index) => (
                <Draggable key={tag} draggableId={tag} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="px-3 py-2 w-2/5 bg-white   rounded-lg shadow hover:shadow-xl transition duration-300 ease-in-out"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{tag}</h3>
                      </div>

                      <Droppable droppableId={tag}>
                        {(provided) => (
                          <div
                            className="mt-4 space-y-4 "
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {filesByTags[tag].map((file, fileIndex) => (
                              <Draggable key={file.$id} draggableId={file.$id} index={fileIndex}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-4 bg-gray-100 rounded-lg  hover:shadow-md transition duration-200 ease-in-out shadow-2xl border border-pink-200"
                                  >
                                    {renderFilePreview(file)}
                                    <div className="mt-2 text-sm text-gray-600 relative">
                                      <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold hover:underline"
                                      >
                                        {file.file || 'Unnamed File'}
                                      </a>
                                    <span className='text-red-500 text-right text-end'> Count: {file.views}</span>
                                    </div>
                             <button
    onClick={() => {
      navigator.clipboard.writeText(file.fileUrl);
      toast.success('URL copied to clipboard!');
      incrementViewCount(file.$id);
    }}
    className=" text-xs top-2 right-2 bg-indigo-500 text-white px-1 py-1 rounded-full shadow-md hover:bg-indigo-600 focus:outline-none"
  >
    Copy URL
  </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default FileList;
