import React from "react";
import { TodoList } from "./components/todos/TodoList";
import { TodoHeader } from "./components/todos/TodoHeader";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <div
              className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
          >
              <div
                  className="bg-white rounded shadow p-6 m-4 w-full lg:w-2/5"
              >
                  <TodoHeader />
                  <TodoList />
              </div>
          </div>
      </div>
    </Provider>
  );
}

export default App;
