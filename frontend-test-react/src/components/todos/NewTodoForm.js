import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { todoAdded } from '../../features/todos/todosSlice';

export function NewTodoForm() {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const handleChange = event => setContent(event.target.value);
    const handleSubmit = event => {
        event.preventDefault();
        dispatch(todoAdded({
            id: Date.now(),
            content,
            status: 'incomplete',
            date_created: Date.now(),
            date_due: undefined
        }));
        setContent('');
    }

    return (
      <form
          onSubmit={handleSubmit}
          className="flex my-8"
      >
          <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-darker"
              placeholder="Add Todo"
              value={content}
              onChange={handleChange}
          />
          <button
              className="flex-no-shrink p-2 border-2 rounded text-teal-700 border-teal-700 hover:text-white hover:bg-teal-700"
          >
              Add
          </button>
      </form>
  )
}
