
import './App.css';
import {useState, useRef, useEffect} from 'react';

function App() {
  const [inputVal, setInputVal] = useState('')
  // const [todos, setTodos] = useState([])
  // console.log('local', JSON.parse(localStorage.getItem('todos')))
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const todoInputRef = useRef()

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const localStorageTodos = localStorage.getItem('todos')
    setTodos(JSON.parse(localStorageTodos))
    

  }, [])

  return (
    <div className="">
      <form
        id="todo-form"
        onSubmit={(ev) => {
          ev.preventDefault()
          const updatedTodos = [...todos, {name: inputVal}]
          setTodos(updatedTodos)
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
      <ul style={{width: 'auto', display: 'flex', flexDirection: 'column'}}>
        {todos.map((todo, i) =>
        <div
          className="row"
          style={{display: 'flex'}}
          key={`${i}-${todo.name}` }
        >
          <li
            className="todo-item"
            
            style={{
              position: 'relative',
              textDecoration: todo.isCompleted ? 'line-through' : ''
            }}
            onClick={() => {
              const newTodos = [...todos]
              newTodos[i].isCompleted = !newTodos[i].isCompleted
              setTodos(newTodos)
            }}
            
          >
            {todo.name}
            
          </li>
          <button
              className="btn-delete-todo"
              style={{ marginLeft: 15, zIndex: 2}}
              onClick={(ev) => {
                ev.stopPropagation()
                const newTodos = [...todos]
                newTodos.splice(i, 1)
                setTodos(newTodos)
              }}
            
            >
              X
            </button>
          </div>
        )}
      </ul>
    </div>
    </div>
  );
}

export default App;
