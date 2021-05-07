import React from 'react';
import { TodoList } from './components/todos';
import { todos } from './data/todos';

function App() {

  return (
    <div className="App">
      <TodoList  todos={todos} />
    </div>
  );
}

export default App;
