import React from 'react';

export default function ToDoItem({ item, i, toggleTodo, removeTodo}) {
  return (
    <div key={i} className="flex mb-4 items-center justify-between">                                
        <div>
            <div
                className={`flex-grow text-gray-darkes ${item.status === 'incomplete' ? '' : 'line-through'}`}
            >
                {item.content}
            </div>
        </div>
        <div>
            <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-700 border-green-700 hover:bg-green-700"
                onClick={toggleTodo}
                data-id={i}
            >
                {item.status === 'incomplete' ? 'Not Done' : 'Done'}
            </button>
            <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-700 border-red-700 hover:text-white hover:bg-red-700"
                onClick={removeTodo}
                data-id={i}
            >
                Remove
            </button>
        </div>
    </div>
  );
}