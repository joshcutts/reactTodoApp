import { useState,  } from 'react'
import Title from "./Title"
import AddNewTodoBtn from "./AddNewTodoBtn"
import TodoTable from "./TodoTable"
import Modal from "./Modal"
import { Todo, TodoManagerProps, OnSubmitProps, FormattedTodo } from "../types"
import { formatDate, todoExists, generateSortedSelectedTodos, getTitle } from '../utilities/utilties'
import { addTodo, updateTodo, deleteTodo, toggleComplete } from '../todoService'

const TodoManager = ({
  todos,
  setTodos,
  onSidebarToggleClick,
  currentSelection,
  resetSelection
  }: TodoManagerProps ) => {
    const [todo, setTodo] = useState<FormattedTodo | null>(null)
    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const sortedSelectedTodos = generateSortedSelectedTodos(currentSelection, todos)
    const title = {
      title: getTitle(currentSelection),
      numberTodos: sortedSelectedTodos.length,
    }

    const handleModalClose = () => {
      setTodo(null)
      setDisplayModal(false)
      resetSelection()
    }

    const handleNewTodoModal = () => {
      setTodo(null)
      setDisplayModal(true)
    }
    
    const onView = (id: number) => {
      const selectedTodo = todos.find(todo => todo.id === id)
      if (selectedTodo) {
        setTodo(selectedTodo)
        setDisplayModal(true)
      } else {
        throw new Error('Todo not found')
      }
    }

    const handleDelete = async (id: number) => {
      deleteTodo(id)
      setTodos(todos.filter(todo => todo.id !== id))
    }
  
    const handleCreate = async (newTodo: Todo) => {
      const newFormattedTodo = await addTodo(newTodo)
      setTodos(todos.concat(newFormattedTodo))
      resetSelection()
      setDisplayModal(false)
    }
  
    const handleEdit = async (draftTodo: Todo) => {
      const updatedTodo = await updateTodo(draftTodo)
      const updatedTodos = todos.filter(todo => todo.id !== draftTodo.id).concat(updatedTodo)
      setTodos(updatedTodos)
      setDisplayModal(false)
    }
  
    const handleComplete = async(id: number) => {
      const updatedTodo = await toggleComplete(id, true)
      const updatedTodos = todos.filter(todo => todo.id !== id).concat(updatedTodo)
      setTodos(updatedTodos)
      setDisplayModal(false)
    }

    const handleSubmit: OnSubmitProps = (event, draftTodo): void => {
      event.preventDefault()
  
      if (todoExists(draftTodo.id, todos)) {
        handleEdit(draftTodo)
      } else {
        handleCreate(draftTodo)
      }
    }

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

  return (
    <div id="items">
      <header></header>
      <main>
        <Title titleInfo={title} onClick={onSidebarToggleClick}/>
        <AddNewTodoBtn onClick={handleNewTodoModal}/>
        <TodoTable
          todos={sortedSelectedTodos}
          onView={onView}
          onToggleCompleted={handleToggleCompleted}
          onDelete={handleDelete}/>
        <Modal
          displayModal={displayModal}
          onClose={handleModalClose}
          todo={todo} 
          onSubmit={handleSubmit}
          onComplete={handleComplete}/>
      </main>
    </div>
  )
}

export default TodoManager