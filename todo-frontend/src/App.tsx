import { useState, useEffect } from 'react'
import './todo_v2.css'
import './reset.css'
import './todo.css'
import { FormattedTodo, Todo, SelectionProps, TitleObjProps, OnSubmitProps } from './types'
import Sidebar from './components/Sidebar'
import TodoManager from './components/TodoManager'
import { getAllTodos, addTodo, updateTodo, toggleComplete, deleteTodo } from './todoService'
import { formatDate, todoExists, filterTodosOnSelection, sortByCompleted, getTitle } from './utilities/utilties'

function App() {
  const [todos, setTodos] = useState<FormattedTodo[]>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [todo, setTodo] = useState<FormattedTodo | null>(null)
  const [currentSelection, setCurrentSelection] = useState<SelectionProps>({completed: false, date: null})
  const [selectedTodos, setSelectedTodos] = useState<FormattedTodo[]>([])
  const [titleInfo, setTitleInfo] = useState<TitleObjProps>({title: '', numberTodos: 0})
  const [displaySidebar, setDisplaySidebar] = useState(true)

  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar)
  }

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

  const handleToggleCompleted = async (id: number) => {
    const selectedTodo = todos.find(todo => todo.id === id)

    if (!selectedTodo) {
      console.log('Todo not found')
      return
    }

    const newStatus = !selectedTodo.completed
    const updatedTodo = await toggleComplete(id, newStatus)
    const updatedTodos = todos.filter(todo => todo.id !== id).concat(updatedTodo)
    setTodos(updatedTodos)
  }

  const handleDelete = async (id: number) => {
    deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleCreate = async (newTodo: Todo) => {
    const newFormattedTodo = await addTodo(newTodo)
    setTodos(todos.concat(newFormattedTodo))
  }

  const handleEdit = async (newTodo: Todo) => {
    let updatedTodo = await updateTodo(newTodo)
    updatedTodo = {...updatedTodo, dueDate: formatDate(newTodo)}
    const updatedTodos = todos.filter(todo => todo.id !== newTodo.id).concat(updatedTodo)
    setTodos(updatedTodos)
  }

  const handleComplete = async(id: number) => {
    const updatedTodo = await toggleComplete(id, true)
    const updatedTodos = todos.filter(todo => todo.id !== id).concat(updatedTodo)
    setTodos(updatedTodos)
    setDisplayModal(!displayModal)
  }

  const handleDisplayModal = () => {
    setTodo(null)
    setDisplayModal(!displayModal)
    setCurrentSelection({completed: false, date: null})
  }

  const onView = (id: number) => {
    setDisplayModal(!displayModal)
    const selectedTodo = todos.find(todo => todo.id === id)
    if (selectedTodo) {
      setTodo(selectedTodo)
    } else {
      throw new Error('Todo not found')
    }
  }

  const onSubmit: OnSubmitProps = (event, newTodo): void => {
    event.preventDefault()

    if (todoExists(newTodo, todos)) {
      handleEdit(newTodo)
      setDisplayModal(!displayModal)
    } else {
      handleCreate(newTodo)
      setDisplayModal(!displayModal)
    }
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
        onToggleCompleted={handleToggleCompleted}
        onDelete={handleDelete}
        titleInfo={titleInfo}
        onComplete={handleComplete}
        handleDisplayModal={handleDisplayModal}
        onView={onView}
        displayModal={displayModal}
        todo={todo}
        onSubmit={onSubmit}
        toggleSidebar={toggleSidebar}
      />
    </>
  )
}

export default App
