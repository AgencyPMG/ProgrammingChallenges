import React, { useState } from 'react';
import CompleteRemoveButton from './CompleteRemoveButton';
import Input from './Input';
import TodoItems from './TodoItems';
import TodoItem from './TodoItem';

export function TodoList(props) {
    const [todos, setTodos] = useState(props.todos); // or []
    const [newTodo, setNewTodo] = useState('');
    const [allComplete, setAllComplete] = useState(false);
    
    const updateInput = function(e) {
        setNewTodo(e.target.value);
    }
    const addTodo = function(e) {
        if (e.key === 'Enter' || e.target.innerHTML === 'Add') {
            if (newTodo.length > 0) {
                let updated = [...todos];
                updated.push({
                    id: todos.length,
                    content: newTodo,
                    status: 'incomplete',
                    date_created: Date.now(),
                    date_due: Date.now() + 10000
                });
                setTodos(updated);
                setNewTodo('');
                setAllComplete(checkAllComplete(updated));
            }
        }
    }
    const toggleTodo = function(e) {
        let updated = [...todos];
        updated[e.target.dataset.id].status = updated[e.target.dataset.id].status === 'incomplete' ? 'complete' : 'incomplete';
        setTodos(updated);
        setAllComplete(checkAllComplete(updated));
    }
    const removeTodo = function(e) {
        let updated = [...todos];
        updated.splice(e.target.dataset.id, 1);
        setTodos(updated.length > 0 ? updated : []);
        setAllComplete(checkAllComplete(updated));
        
    }
    const completeAll = function() {
        let updated = [...todos];
        if (updated.length > 0) {
            updated.map((item) => {
                item.status = 'complete';
                return item;
            });
            setTodos(updated);
            setAllComplete(true);
        }
    }
    const removeAll = function() {        
        setTodos([]);
        setAllComplete(false);
    }
    const checkAllComplete = function(items) {
        let a = true;
        items.forEach(item => {
            if (item.status !== 'complete') {
                a = false;
            }
        });
        if (items.length === 0) {
            a = false;
        }
        return a;
    }

    return (
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/5">
                <div className="mb-4">
                    <h1 className="text-gray-darkest text-3xl font-bold inline-block">Todo List</h1>
                    <CompleteRemoveButton
                        allComplete={allComplete} 
                        removeAll={removeAll} 
                        completeAll={completeAll}
                        visible={todos.length > 0 ? true : false} 
                    />
                    <Input
                        newTodo={newTodo}
                        updateInput={updateInput}
                        addTodo={addTodo}
                    />
                </div>
                <TodoItems
                    todos={todos}
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}    
                />
            </div>
        </div>
    );
}
