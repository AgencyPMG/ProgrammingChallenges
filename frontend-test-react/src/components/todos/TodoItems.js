import React from 'react';
import TodoItem from './TodoItem';

export default function TodoItems( { todos, toggleTodo, removeTodo } ) {
  return (
    <div>
      {todos.map((item, i) => {                     
          return (
              <TodoItem
                  key={i}
                  item={item}
                  i={i}
                  toggleTodo={toggleTodo}
                  removeTodo={removeTodo}
              />
          );
      })}
    </div>
  )
}