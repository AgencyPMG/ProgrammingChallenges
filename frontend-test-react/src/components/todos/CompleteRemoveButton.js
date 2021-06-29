import React from 'react';

export default function CompleteRemoveButton({ allComplete, removeAll, completeAll, visible }) {
  return (
    <>
      {
        visible ? 
          allComplete ?
              <button
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-red-700 border-red-700 hover:bg-red-700 inline-block"
                  onClick={removeAll}
                  aria-label="Remove All Todos"
              >
                  Remove All
              </button>
          :
              <button
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-700 border-teal-700 hover:bg-teal-700 inline-block"
                  onClick={completeAll}
                  aria-label="Complete All Todos"
              >
                  Complete All
              </button>
        : 
        null
      }
    </>
  )
}