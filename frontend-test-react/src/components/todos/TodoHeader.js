import React from 'react';
import { NewTodoForm } from './NewTodoForm';
import { useDispatch, useSelector } from 'react-redux';
import { allTodosRemoved, selectAllTodos, allTodosSetted } from '../../features/todos/todosSlice';

export function TodoHeader() {
    const dispatch = useDispatch();
    const allTodos = useSelector(selectAllTodos);
    const areAllTodosComplete = allTodos.every(({ status }) => status === 'complete');
    const handleRemoveAllClick = () => dispatch(allTodosRemoved());
    const handleCompleteAllClick = () => {
        const newAllTodos = allTodos.map(todo => ({ ...todo, status: 'complete' }));

        dispatch(allTodosSetted(newAllTodos));
    }

    return (
        <div
            className="mb-4"
        >
            <div class="flex justify-between">
                <h1
                    className="text-gray-darkest text-3xl font-bold inline-block"
                >
                    Todo List
                </h1>
                {areAllTodosComplete ? (
                    <button
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-700 border-red-700 hover:text-white hover:bg-red-700"
                        onClick={handleRemoveAllClick}
                    >
                        Remove All
                    </button>
                ) : (
                    <button
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-teal-700 border-teal-700 hover:text-white hover:bg-teal-700"
                        onClick={handleCompleteAllClick}
                    >
                        Complete All
                    </button>
                )}
            </div>
            <NewTodoForm />
        </div>
    )
}
