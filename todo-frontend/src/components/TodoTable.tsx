import { TodoTableProps, TodoItemProps } from "../types"

const TodoItem = ({
  todo,
  onView,
  onToggleCompleted,
  onDelete }: TodoItemProps ) => {
  const handleTodoClick = (event: React.SyntheticEvent) => {

    if ((event.target as HTMLElement).className !== 'delete' && (event.target as HTMLElement).tagName !== 'LABEL') {
      onToggleCompleted(todo.id)
    }
  }

  const handleDeleteClick = (event: React.SyntheticEvent) => {
    event.stopPropagation()
    onDelete(todo.id)
  }

  const handleViewClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onView(todo.id)
  }

  return (
    <>
    <tr data-id={todo.id} onClick={handleTodoClick}>
      <td className="list_item">
      <input type="checkbox" name={`item_${todo.id}`} id={`item_${todo.id}`} checked={todo.completed} readOnly/>
      <span className="check"></span>
      <label htmlFor={`item_${todo.id}`} onClick={handleViewClick}>{todo.title} - {todo.dueDate}</label></td> 
      <td className="delete" onClick={event => handleDeleteClick(event)}><img src="images/trash.png" alt="Delete"/></td>
    </tr>
    </>
  )
}

const TodoTable = ({
  todos,
  onView,
  onToggleCompleted,
  onDelete }: TodoTableProps) => {
  return (
    <table cellSpacing="0">
        <tbody>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onView={onView}
              onToggleCompleted={onToggleCompleted}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
  )
}

export default TodoTable