import { useState, useEffect } from 'react'
import './todo_v2.css'
import './reset.css'
import './todo.css'
import { FormattedTodo, SelectionProps, TitleObjProps } from './types'
import Sidebar from './components/Sidebar'
import TodoManager from './components/TodoManager'
import { getAllTodos } from './todoService'
import { generateSortedSelectedTodos, getTitle } from './utilities/utilties'

function App() {
  const [todos, setTodos] = useState<FormattedTodo[]>([]);
  const [currentSelection, setCurrentSelection] = useState<SelectionProps>({completed: false, date: null})
  const [displaySidebar, setDisplaySidebar] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos()
        setTodos(todos)
      } catch (error) {
        window.alert(`Failed to fetch todos ${error}`)
      }
    }

    fetchTodos()
  }, [])

  const updateSelection = (selection: SelectionProps) => {
    setCurrentSelection(selection)
  }

  const sortedSelectedTodos = generateSortedSelectedTodos(currentSelection, todos)
  const title = {
    title: getTitle(currentSelection),
    numberTodos: sortedSelectedTodos.length,
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
        updateSelection={updateSelection}
        currentSelection={currentSelection}
      />}
      <TodoManager
        todos={sortedSelectedTodos}
        setTodos={setTodos}
        onSidebarToggleClick={hangleToggleSidebar}
        titleInfo={title}
        resetSelection={resetSelection}
      />
    </>
  )
}

export default App
