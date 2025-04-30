export interface Todo {
  id: number;
  title: string;
  year: string;
  month: string;
  day: string;
  completed: boolean;
  description?: string;
}

export interface FormattedTodo {
  id: number;
  title: string;
  dueDate: string,
  completed: boolean;
  description?: string;
}

export interface Style {
  display: string,
  top?: string
}

export interface ModalFormProps {
  handleDisplayModal: React.MouseEventHandler<HTMLLabelElement>;
  setTodos: React.Dispatch<React.SetStateAction<FormattedTodo[]>>;
  todos: FormattedTodo[];
}

export interface DateKey {
  [key: string]: FormattedTodo[];
}

export interface SelectionProps {
  completed: boolean;
  date: string | null
}

export interface TitleObjProps {
  title: string;
  numberTodos: number;
}

export type OnSubmitProps = (
  event: React.FormEvent<HTMLFormElement>,
  newTodo: Todo,
) => void

export interface SidebarProps {
  todos: FormattedTodo[];
  onSelect: (selection: SelectionProps) => void;
  currentSelection: SelectionProps
}

export interface TodoManagerProps {
  todos: FormattedTodo[];
  setTodos: React.Dispatch<React.SetStateAction<FormattedTodo[]>>;
  onSidebarToggleClick: () => void;
  titleInfo: TitleObjProps;
  resetSelection: () => void;
}

export interface TodoTableProps {
  todos: FormattedTodo[],
  onView: (id: number) => void,
  onToggleCompleted: (id: number) => Promise<void>,
  onDelete: (id: number) => Promise<void>,
}

export interface TodoItemProps {
  todo: FormattedTodo;
  onView: (id: number) => void,
  onToggleCompleted: (id: number) => Promise<void>,
  onDelete: (id: number) => Promise<void>,
}

export interface SidebarTodoGroupProps {
  title: string;
  todos: FormattedTodo[];
  isCompletedView: boolean;
  currentSelection: SelectionProps;
  onSelect: (selection: SelectionProps) => void
}

export interface dateKeyTodosProps {
  [key: string]: FormattedTodo[]
}

interface TitleInfoProps {
  title: string;
  numberTodos: number;
}

export interface TitleProps {
  titleInfo: TitleInfoProps;
  onClick: () => void;
}

export interface DateParts {
  year: string;
  month: string;
  day: string;
}

export type TodoField = 'title' | 'description' | 'date' | 'year' | 'month' | 'day' | 'description'

export interface ModalProps {
  displayModal: boolean;
  onClose: () => void;
  todo: FormattedTodo | null;
  handleSubmit: OnSubmitProps;
  onComplete: (id: number) => Promise<void>;
}