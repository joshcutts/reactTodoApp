import Title from "./Title"
import AddNewTodoBtn from "./AddNewTodoBtn"
import TodoTable from "./TodoTable"
import Modal from "./Modal"
import { TodoManagerProps } from "../types"

const TodoManager = ({
  todos,
  titleInfo,
  onToggleCompleted,
  onDelete,
  onComplete,
  handleDisplayModal,
  onView,
  displayModal,
  todo,
  onSubmit,
  toggleSidebar
  }: TodoManagerProps ) => {
  return (
    <div id="items">
      <header></header>
      <main>
        <Title titleInfo={titleInfo} toggleSidebar={toggleSidebar}/>
        <AddNewTodoBtn handleDisplayModal={handleDisplayModal}/>
        <TodoTable
          todos={todos}
          onView={onView}
          onToggleCompleted={onToggleCompleted}
          onDelete={onDelete}/>
        <Modal
          displayModal={displayModal}
          handleDisplayModal={handleDisplayModal}
          todo={todo} handleSubmit={onSubmit}
          onComplete={onComplete}/>
      </main>
    </div>
  )
}

export default TodoManager