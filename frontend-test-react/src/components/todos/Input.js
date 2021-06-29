import React from 'react';

export default function input({ newTodo, updateInput, addTodo }) {
  return (
    <>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-darker"
        placeholder="Add Todo"
        value={newTodo}
        onChange={updateInput}
        onKeyDown={addTodo}
        aria-label="Input New Todo Text"
      />
      <button 
        className="flex-no-shrink p-2 border-2 rounded text-teal-700 border-teal-700 hover:text-white hover:bg-teal-700"
        onClick={addTodo}
        aria-label="Add New Todo"
      >
        Add
      </button>
    </>
  )
}