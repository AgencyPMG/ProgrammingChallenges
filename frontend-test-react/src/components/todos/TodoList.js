import React, { useState } from "react";
import AddTaskItem from "../form/AddTaskItem";
import TodoItem from "./TodoItem";
import CompleteAndRemoveAllTasksButton from "../button/CompleteAndRemoveAllTasksButton";
import { todos } from "../../data/todos";

export function TodoList() {
  const [todoItemsList, setTodosItemsList] = useState(todos);

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/5">
        <div className="mb-4">
          <h1 className="text-gray-darkest text-3xl font-bold inline">
            Todo List
          </h1>
          <CompleteAndRemoveAllTasksButton
            todoItemsList={todoItemsList}
            setTodosItemsList={setTodosItemsList}
          />
          <AddTaskItem
            todoItemsList={todoItemsList}
            setTodosItemsList={setTodosItemsList}
          />
          {todoItemsList.map(({ content, status }, index) => {
            return (
              <TodoItem
                key={index}
                content={content}
                status={status}
                index={index}
                setTodosItemsList={setTodosItemsList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
