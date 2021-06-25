import React from "react";
import ReactDOM from "react-dom";
import AddTaskItem from "./AddTaskItem";

test("renders the add task item component", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddTaskItem />, div);
  expect(div.querySelector("input")).toHaveAttribute("type", "text");
  expect(div.querySelector("input")).toHaveAttribute("placeholder", "Add Todo");
  expect(div.querySelector("button")).toHaveAttribute("type", "submit");
  expect(div).toHaveTextContent("Add");
});
