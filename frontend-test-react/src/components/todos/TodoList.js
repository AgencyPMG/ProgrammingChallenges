import React from 'react';
import { useSelector } from 'react-redux';
import { NewTodoForm } from './NewTodoForm';
import { selectAllTodos } from '../../features/todos/todosSlice';
import { Todo } from './Todo';

export function TodoList() {
    const allTodos = useSelector(selectAllTodos);

    return (
        <div>
            {allTodos.map(todo => <Todo todo={todo} key={todo.id} />)}
        </div>
    );
}
