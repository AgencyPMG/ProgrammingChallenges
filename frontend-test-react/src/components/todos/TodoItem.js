import React from "react";

function TodoItem({ content, status, index, setTodosItemsList }) {
  let buttonClassName;
  let contentClassName;
  let contentStatus;

  if (status === "complete") {
    contentClassName = "flex-grow text-gray-darkest line-through";
    contentStatus = "Done";
    buttonClassName =
      "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-700 border-green-700 hover:bg-green-700";
  } else {
    contentClassName = "flex-grow text-gray-darkest";
    contentStatus = "Not Done";
    buttonClassName =
      "flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-500";
  }

  const handleStatusChange = () => {
    setTodosItemsList((prevList) => {
      const newTasksList = prevList.map((obj) => {
        return Object.assign({}, obj);
      });

      status === "complete"
        ? (newTasksList[index].status = "incomplete")
        : (newTasksList[index].status = "complete");

      return newTasksList;
    });
  };

  const handleRemovalOfTask = () => {
    setTodosItemsList((prevList) => {
      const newTasksList = prevList.map((obj) => {
        return Object.assign({}, obj);
      });

      newTasksList.splice(index, 1);

      return newTasksList;
    });
  };

  return (
    <div className={"flex mb-4 items-center justify-between"}>
      <div className={contentClassName}>{content}</div>
      <button onClick={handleStatusChange} className={buttonClassName}>
        {contentStatus}
      </button>
      <button
        onClick={handleRemovalOfTask}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-700 border-red-700 hover:text-white hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  );
}

export default TodoItem;
