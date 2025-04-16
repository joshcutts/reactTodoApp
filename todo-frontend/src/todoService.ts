import { Todo, FormattedTodo } from "./types"
import { formatTodos, formatDate } from './utilities/utilties'
import axios from 'axios'


export const getAllTodos = async (): Promise<FormattedTodo[]> => {
  const response = await axios.get('/api/todos')
  return formatTodos(response.data)
}

export const addTodo = async(newTodo: Todo) => {
  try {
    const response = await axios.post('/api/todos', newTodo)
    const newFormattedTodo = {...response.data, dueDate: formatDate(response.data)}
    return newFormattedTodo
  } catch (error: unknown) {
    console.error('Error creating todo: ', error)
  }
}

export const updateTodo = async(todo: Todo) => {
  try {
    const response = await axios.put(`/api/todos/${todo.id}`, todo)
    const newFormattedTodo = {...response.data, dueDate: formatDate(response.data)}
    return newFormattedTodo
  } catch (error: unknown) {
    console.error('Error creating todo: ', error)
  }
}

export const toggleComplete = async (id: number, newStatus: boolean) => {
  try {
    const response = await axios.put(`/api/todos/${id}`, {completed: newStatus})
    const newFormattedTodo = {...response.data, dueDate: formatDate(response.data)}
    return newFormattedTodo
  } catch (error: unknown) {
    console.error('Error creating todo: ', error)
  }
}

export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`/api/todos/${id}`)
  } catch (error: unknown) {
    console.error('Error deleting todo: ', error)
  }
}