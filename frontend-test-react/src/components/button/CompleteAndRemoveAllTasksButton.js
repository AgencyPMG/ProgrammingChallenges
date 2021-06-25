import React, { useState, useEffect } from "react";

function CompleteAndRemoveAllTasksButton({ todoItemsList, setTodosItemsList }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let bool = true;
    function verifyAllTasksCompleted() {
      todoItemsList.forEach((task) => {
        const { status } = task;
        if (status === "incomplete") bool = false;
      });
      setCompleted(bool);
    }

    verifyAllTasksCompleted();
  }, [todoItemsList]);

  const handleCompleteAll = () => {
    setTodosItemsList((prevList) => {
      const newTasksList = prevList.map(
        ({ content, date_created, date_due }) => {
          return { content, date_created, date_due, status: "complete" };
        }
      );
      return newTasksList;
    });
  };

  const handleRemoveAll = () => {
    setTodosItemsList([]);
  };

  return (
    <div className="inline" data-testid="CompleteAndRemoveAllTasksButton">
      {completed ? (
        <button
          onClick={handleRemoveAll}
          className="float-right p-2 border-2 rounded text-red-700 border-red-700 hover:text-white hover:bg-red-700"
        >
          Remove All
        </button>
      ) : (
        <button
          onClick={handleCompleteAll}
          className="float-right p-2 border-2 rounded text-teal-300 border-teal-300 hover:text-white hover:bg-teal-300"
        >
          Complete All
        </button>
      )}
    </div>
  );
}

export default CompleteAndRemoveAllTasksButton;
