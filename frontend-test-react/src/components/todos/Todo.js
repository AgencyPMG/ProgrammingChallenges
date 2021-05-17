import React from 'react';
import { useDispatch } from 'react-redux';
import { todoUpdated, todoRemoved } from '../../features/todos/todosSlice';

export function Todo({ todo }) {
    const dispatch = useDispatch();
    const handleDoneClick = () => 
        dispatch(todoUpdated({
            id: todo.id, 
            changes: {
                status: todo.status === 'complete' ? 'incomplete' : 'complete'
            }
        }));
    const handleRemoveClick = () => dispatch(todoRemoved(todo.id));

    return (
        <div
            className="flex mb-4 items-center justify-between"
        >
            <div>
                <div
                    className={`
                        flex-grow text-gray-darkest ${todo.status === 'complete' ? 'line-through' : ''}
                    `}
                >
                    { todo.content }
                </div>
            </div>
            <div>
                <button
                    className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-700 border-green-700 hover:bg-green-700"
                    onClick={handleDoneClick}
                >
                    { todo.status === 'complete' ? 'Not Done' : 'Done' }
                </button>
                <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-700 border-red-700 hover:text-white hover:bg-red-700"
                    onClick={handleRemoveClick}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
