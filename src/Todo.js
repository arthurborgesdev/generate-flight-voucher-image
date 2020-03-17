import React, { useState } from 'react';

const TodoForm = ({ saveTodo }) => {
  const[value, setValue] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        saveTodo(value);
        setValue('');
      }}
    >
      <input onChange={event => setValue(event.target.value)} value={value} />
    </form>
  )
}


const TodoList =({ todos, deleteTodo }) => (
  <ul>
    {
      todos.map((todo, index) => (
        <li key={index.toString()}>
          <input></input>
          <button onClick={() => deleteTodo(index)}>X</button>
        </li>
      ))
    }
  </ul>
);


const Todo = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <h1>Todos</h1>

      <TodoForm saveTodo={todoText => {
        const trimmedText = todoText.trim();

        if(trimmedText.length > 0) {
          setTodos([...todos, trimmedText]);
        }
      }} 
    />
      <TodoList 
        todos={todos}
        deleteTodo={todoIndex => {
          const newTodos = todos.filter((_, index) => index !== todoIndex);
          setTodos(newTodos);
        }} 
      />
    </div>
  );
};

export default Todo;