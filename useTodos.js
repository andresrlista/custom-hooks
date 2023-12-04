import { useReducer, useEffect } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';
import { useState } from 'react';

const initialState = [];
const initTodos = () => {
  return JSON.parse(localStorage.getItem('todos')) ?? [];
};

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, initialState, initTodos);
  const [todosCounter, setTodosCounter] = useState(0);
  const [pendingTodosCounter, setPendingTodosCounter] = useState(0);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateTodos();
  }, [todos]);

  const handleNewTodo = todo => {
    const action = {
      type: '[TODO] Add',
      payload: todo,
    };
    dispatch(action);
  };

  const handleDeteleTodo = id => {
    const action = {
      type: '[TODO] Remove',
      payload: id,
    };
    dispatch(action);
  };

  const handleToggleTodo = id => {
    const action = {
      type: '[TODO] Toggle',
      payload: id,
    };
    dispatch(action);
  };

  const updateTodos = () => {
    setTodosCounter(todos.length);
    setPendingTodosCounter(todos.filter(todo => !todo.done).length);
  };

  return {
    todos,
    todosCounter,
    pendingTodosCounter,
    handleDeteleTodo,
    handleNewTodo,
    handleToggleTodo,
  };
}
