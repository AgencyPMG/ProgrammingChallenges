import React, { useState } from 'react';
import TodoItem from './TodoItem';

export function TodoList(props) {
    const [todos, setTodos] = useState(props.todos); // props.todo
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
            }
        }
    }
    const toggleTodo = function(e) {
        let allComplete = true;
        // let updated = [...todos].map(item => {
        //     if (parseInt(e.target.dataset.id) === parseInt(item.id)) {
        //         item.status = item.status === 'incomplete' ? 'complete' : 'incomplete';
        //     }
        //     if (item.status !== 'complete') {
        //         allComplete = false;
        //      }
        //     return item;
        // });
        let updated = [...todos];
        updated[e.target.dataset.id].status = updated[e.target.dataset.id].status === 'incomplete' ? 'complete' : 'incomplete';
        updated.forEach(item => {
            if (item.status !== 'complete') {
                allComplete = false;
            }
        })
        setTodos(updated);
        setAllComplete(allComplete);
    }
    const removeTodo = function(e) {        
        let updated = [...todos].filter((item) => {
            if (parseInt(e.target.dataset.id) !== parseInt(item.id)) {
                return item;
            }
        });        
        setTodos(updated.length > 0 ? updated : []);
        setAllComplete(updated.length > 0 ? true : false)
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

    return (
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/5">
                <div className="mb-4">
                    {/* Title */}
                    <h1 
                        className="text-gray-darkest text-3xl font-bold inline-block"
                    >
                        Todo List
                    </h1>
                    {allComplete ?
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
                    }
                    {/* New Todo */}
                    <div className="flex my-8">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-darker"
                            placeholder="Add Todo"
                            value={newTodo}
                            onChange={updateInput}
                            onKeyDown={addTodo}
                        />
                        <button 
                            className="flex-no-shrink p-2 border-2 rounded text-teal-700 border-teal-700 hover:text-white hover:bg-teal-700"
                            onClick={addTodo}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div>
                    {/* Todo Items */}
                    {todos.map((item, i) => {                     
                        return <TodoItem item={item} i={i} toggleTodo={toggleTodo} removeTodo={removeTodo} /> 
                    })}
                    
                </div>
            </div>
        </div>
    );
}
