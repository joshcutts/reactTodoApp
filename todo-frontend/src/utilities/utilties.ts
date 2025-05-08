import { Todo, DateKey, FormattedTodo, dateKeyTodosProps, SelectionProps } from "../types"

const definedDueDate = (year: string, month: string): boolean => {
  return (year !== '' && month !== '')
}

const formatDate = (todo: Todo): string => {
  if (definedDueDate(todo.year, todo.month)) {
    return `${todo.month}/${todo.year.slice(-2)}`
  } else {
    return 'No Due Date'
  }
}

const formatTodos = (todos: Todo[]) => {
  return todos.map(todo => {
    return {...todo, dueDate: formatDate(todo)}
  })
}

const todoExists = (id: number | null, todos: Todo[]) => {
  return todos.map(todo => todo.id).includes(Number(id))
}

const sortByDate = (dateKeysObj: dateKeyTodosProps) => {
  return Object.entries(dateKeysObj).sort((a, b) => {
    if (b[0] === 'No Due Date') return 1;
    if (a[0] === 'No Due Date') return -1;
    const [aMonth, aYear] = a[0].split('/').map(val => Number(val));
    const [bMonth, bYear] = b[0].split('/').map(val => Number(val));
    if (aYear !== bYear) return aYear - bYear;
    return aMonth - bMonth;
  })
}

const generateDateKeyTodos = (todos: Todo[]): dateKeyTodosProps => {
  if (todos.length === 0) return {}
  const dateKeysObj: DateKey = {}

  todos.forEach(todo => {
    const dueDate = formatDate(todo)
    if (Object.keys(dateKeysObj).includes(dueDate)) {
      dateKeysObj[dueDate].push(todo)
    } else {
      dateKeysObj[dueDate] = [todo]
    }
  })

  return Object.fromEntries(sortByDate(dateKeysObj))
}

const isCurrentSelection = (completedView: boolean, sidebarDate: string | null, selection: SelectionProps) => {
  if (completedView === selection.completed && sidebarDate === selection.date) {
    return 'active'
  } else {
    return ''
  }
}

const filterOnCompleted = (selectionCompleted: boolean, todos: Todo[]) => {
  if (selectionCompleted) {
    return todos.filter(todo => todo.completed === true)
  } else {
    return todos
  }
}

const filterOnDate = (selectionDate: string | null, todos: Todo[]) => {
  if (selectionDate === null) {
    return todos
  } else {
    return todos.filter(todo => formatDate(todo) === selectionDate)
  }
}

const filterTodosOnSelection = (selectionCompleted: boolean, selectionDate: string | null, todos: Todo[]) => {
  const completeFilteredTodos = filterOnCompleted(selectionCompleted, todos)
  const dateFilteredTodos = filterOnDate(selectionDate, completeFilteredTodos)
  return dateFilteredTodos
}

const sortByTodoId = (todos: FormattedTodo[]) => {
  todos.sort((a, b) => a.id - b.id)
}

const sortByCompleted = (todos: FormattedTodo[]) => {
  const incompleteTodos = todos.filter(todo => todo.completed === false)
  const completedTodos = todos.filter(todo => todo.completed)

  sortByTodoId(incompleteTodos)
  sortByTodoId(completedTodos)

  return incompleteTodos.concat(completedTodos)
}

const generateSortedSelectedTodos = (currentSelection: SelectionProps, todos: Todo[]) => {
  const {completed, date} = currentSelection
  const filteredTodos = filterTodosOnSelection(completed, date, todos)
  const sortedTodos = sortByCompleted(filteredTodos)
  return sortedTodos
}

const getTitle = ({ completed, date }: { completed: boolean, date: string | null }) => {
  if (date) {
    return date;
  } else if (completed) {
    return 'Completed'
  } else {
    return "All Todos";
  }
}

export { formatTodos, formatDate, todoExists, generateDateKeyTodos, isCurrentSelection, generateSortedSelectedTodos, getTitle }