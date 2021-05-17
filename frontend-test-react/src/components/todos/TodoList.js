import React from 'react';
import { useSelector } from 'react-redux';
import { NewTodoForm } from './NewTodoForm';
import { selectAllTodos } from '../../features/todos/todosSlice';
import { Todo } from './Todo';

export function TodoList() {
    const allTodos = useSelector(selectAllTodos);

    return (
        <div
            className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
        >
            <div
                className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/5"
            >
                <div
                    className="mb-4"
                >
                    <h1
                        className="text-gray-darkest text-3xl font-bold"
                    >
                        Todo List
                    </h1>
                    <NewTodoForm />
                </div>
                <div>
                    {allTodos.map(todo => <Todo todo={todo} key={todo.id} />)}
                </div>
            </div>
        </div>
    );
}
