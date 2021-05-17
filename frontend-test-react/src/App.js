import React from "react";
import { TodoList } from "./components/todos";
import { todos } from "./data/todos";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList todos={todos} />
      </div>
    </Provider>
  );
}

export default App;
