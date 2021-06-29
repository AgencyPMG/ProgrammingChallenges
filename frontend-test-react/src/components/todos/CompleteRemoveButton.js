import React from 'react';

export default function CompleteRemoveButton({ allComplete, removeAll, completeAll, visible }) {
  return (
    <>
      {
        visible ? 
          allComplete ?
              <button
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-red-300 border-red-300 hover:bg-red-300 inline-block"
                  onClick={removeAll}
              >
                  Remove All
              </button>
          :
              <button
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-300 border-teal-300 hover:bg-teal-300 inline-block"
                  onClick={completeAll}
              >
                  Complete All
              </button>
        : 
        null
      }
    </>
  )
}