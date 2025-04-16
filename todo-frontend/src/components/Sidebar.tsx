import { generateDateKeyTodos } from "../utilities/utilties"
import { isCurrentSelection } from "../utilities/utilties"
import { SidebarProps, SidebarTodoGroupProps, dateKeyTodosProps } from "../types"

const SidebarTodoGroup = ({
  title,
  todos,
  isCompletedView,
  currentSelection,
  updateSelection
}: SidebarTodoGroupProps) => {
  const dateKeyTodos: dateKeyTodosProps = generateDateKeyTodos(todos)

  const handleSidebarClick = (date: string | null) => {
    updateSelection({completed: isCompletedView, date})
  }

  const sectionClass = isCompletedView ? 'completed' : ''
  const sectionId = isCompletedView ? 'completed_items' : 'all'
  const divId = isCompletedView ? 'completed_todos' : 'all_todos'
  const headerId = isCompletedView ? 'all_done_header' : 'all_header'

  return (
    <section className={sectionClass} id={sectionId}>
      <div id={divId}>
        <header
          data-title={title}
          data-total={todos.length}
          id={headerId}
          className={isCurrentSelection(isCompletedView, null, currentSelection)}
        >
        <dl onClick={() => handleSidebarClick(null)}>
          <dt>All Todos</dt>
            <dd>{todos.length}</dd>
          </dl>
      </header>
      </div>
      <article id="all_lists">
        {Object.entries(dateKeyTodos).map(([date, todosArr]) => {
          return (
            <dl key={date} data-title={`${date}`} data-total={`${todosArr.length}`} onClick={() => handleSidebarClick(date)} className={isCurrentSelection(isCompletedView, date, currentSelection)}>
              <dt><time>{date}</time></dt>
              <dd>{todosArr.length}</dd>
            </dl>
          )
        })}
      </article>
    </section>
  )
}

const Sidebar = ({
  todos,
  updateSelection,
  currentSelection,
}: SidebarProps) => {
  const completedTodos = todos.filter(todo => todo?.completed)

  return (
    <div id="sidebar" >
      <SidebarTodoGroup 
        title="All Todos"
        todos={todos}
        isCompletedView={false}
        currentSelection={currentSelection}
        updateSelection={updateSelection}
      />
      <SidebarTodoGroup 
        title="Completed"
        todos={completedTodos}
        isCompletedView={true}
        currentSelection={currentSelection}
        updateSelection={updateSelection}
      />
    </div>
  )
}

export default Sidebar