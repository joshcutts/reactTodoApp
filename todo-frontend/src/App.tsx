import { useState, useEffect } from 'react'
import './todo_v2.css'
import './reset.css'
import './todo.css'
import { FormattedTodo, SelectionProps, TitleObjProps } from './types'
import Sidebar from './components/Sidebar'
import TodoManager from './components/TodoManager'
import { getAllTodos } from './todoService'
import { filterTodosOnSelection, sortByCompleted, getTitle } from './utilities/utilties'

function App() {
  const [todos, setTodos] = useState<FormattedTodo[]>([]);
  const [currentSelection, setCurrentSelection] = useState<SelectionProps>({completed: false, date: null})
  const [selectedTodos, setSelectedTodos] = useState<FormattedTodo[]>([])
  const [displaySidebar, setDisplaySidebar] = useState(true)
  const [titleInfo, setTitleInfo] = useState<TitleObjProps>({title: '', numberTodos: 0})


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

  useEffect(() => {
    const {completed, date} = currentSelection
    const filteredTodos = filterTodosOnSelection(completed, date, todos)
    const sortedTodos = sortByCompleted(filteredTodos)

    setSelectedTodos(sortedTodos)

    const title = getTitle(currentSelection)
    setTitleInfo({title, numberTodos: sortedTodos.length})
  }, [todos, currentSelection])

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
        todos={selectedTodos}
        setTodos={setTodos}
        onSidebarToggleClick={hangleToggleSidebar}
        titleInfo={titleInfo}
        resetSelection={resetSelection}
      />
    </>
  )
}

export default App
