import React, { useState } from "react";

const AddTaskItem = ({ setTodosItemsList, todoItemsList }) => {
  const [value, setValue] = useState("");

  return (
    <form>
      <div className="flex my-8">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-darker"
          placeholder="Add Todo"
          type="text"
          name="addToDo"
          value={value}
        />
        <button
          type="submit"
          className="flex-no-shrink p-2 border-2 rounded text-teal-700 border-teal-700 hover:text-white hover:bg-teal-700"
          onClick={(e) => {
            e.preventDefault();
            if (value !== "") {
              setTodosItemsList((prevList) => {
                const newTodoItem = {
                  content: value,
                  status: "incomplete",
                  date_created: Date.now(),
                  date_due: Date.now(),
                };

                return [...prevList, newTodoItem];
              });

              setValue("");
            }
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskItem;
