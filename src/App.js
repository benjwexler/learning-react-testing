
import './App.css';
import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import cloneDeep from 'lodash.clonedeep';

function App() {
  const [inputVal, setInputVal] = useState('')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const todoInputRef = useRef()

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const localStorageTodos = localStorage.getItem('todos')
    setTodos(JSON.parse(localStorageTodos))
  }, [])

  const onClickToggleCompleted = (i) => () => {
    setTodos((prevTodos) => {
      const newTodos = cloneDeep(prevTodos)
      newTodos[i].isCompleted = !newTodos[i].isCompleted
      return newTodos
    })
  }

  const onClickDeleteTodo = (i) => (ev) => {
    ev.stopPropagation()
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos]
      newTodos.splice(i, 1)
      return newTodos
    })
  }

  return (
    <div className="">
      <form
        id="todo-form"
        onSubmit={(ev) => {
          ev.preventDefault()
          setTodos((prevTodos) => [...prevTodos, { name: inputVal }])
          setInputVal('')
          todoInputRef.current.focus()
        }}
      >
        <input
          id="todo-input"
          ref={todoInputRef}
          value={inputVal}
          onChange={(ev) => setInputVal(ev.target.value)}
        />
        <button
          id="todo-btn-submit"
          disabled={!inputVal.trim().length}
          type="submit"
        >
          Add Todo
      </button>
      </form>
      <div>
        <TodoList 
          onClickDeleteTodo={onClickDeleteTodo}
          onClickToggleCompleted={onClickToggleCompleted}
          todos={todos}
        />
      </div>
    </div>
  );
}

export default App;
