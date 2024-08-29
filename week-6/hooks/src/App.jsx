import React, { useEffect, useState } from 'react';
import Todo from './component/Todo';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:3000/todo?id="+id);
      const json = await res.json();
      setTodos(json.todos);
    };
    fetchTodos();
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          description={todo.description}
        />
      ))}
    </>
  );
};

export default App;
