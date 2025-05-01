import { useState, useEffect } from 'react'
import './todo_v2.css'
import './reset.css'
import './todo.css'
import { Todo, SelectionProps, TitleObjProps } from './types'
import Sidebar from './components/Sidebar'
import TodoManager from './components/TodoManager'
import { getAllTodos } from './todoService'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentSelection, setCurrentSelection] = useState<SelectionProps>({completed: false, date: null})
  const [displaySidebar, setDisplaySidebar] = useState(true)

  useEffect(() => {
    getAllTodos()
      .then(todos => setTodos(todos))
      .catch(error => window.alert(`Failed to fetch todos ${error}`))
  }, [])

  const handleSelect = (selection: SelectionProps) => {
    setCurrentSelection(selection)
  }

  const hangleToggleSidebar = () => {
    setDisplaySidebar(!displaySidebar)
  }

  const resetSelection = () => {
    setCurrentSelection({completed: false, date: null})
  }

  return (
    <>
      {displaySidebar && <Sidebar
        todos={todos}
        onSelect={handleSelect}
        currentSelection={currentSelection}
      />}
      <TodoManager
        todos={todos}
        setTodos={setTodos}
        onSidebarToggleClick={hangleToggleSidebar}
        currentSelection={currentSelection}
        resetSelection={resetSelection}
      />
    </>
  )
}

export default App
