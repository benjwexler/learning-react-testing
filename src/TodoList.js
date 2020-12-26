
const TodoList = ({
    todos,
    onClickDeleteTodo,
    onClickToggleCompleted,
}) => {
    return (
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
            onClick={onClickToggleCompleted(i)}
            
          >
            {todo.name}
            
          </li>
          <button
              className="btn-delete-todo"
              style={{ marginLeft: 15, zIndex: 2}}
              onClick={onClickDeleteTodo(i)}
            
            >
              X
            </button>
          </div>
        )}
      </ul>
    </div>
    )

};

export default TodoList;
