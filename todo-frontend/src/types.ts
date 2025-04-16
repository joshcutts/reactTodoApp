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

export interface ModalProps {
  displayModal: boolean;
  handleDisplayModal: React.MouseEventHandler<HTMLLabelElement>;
  setTodos: React.Dispatch<React.SetStateAction<FormattedTodo[]>>;
  todos: FormattedTodo[]
}

export interface Style {
  display: string,
  top?: string
}

export interface AcutalModalProps {
  handleDisplayModal: React.MouseEventHandler<HTMLLabelElement>;
  setTodos: React.Dispatch<React.SetStateAction<FormattedTodo[]>>;
  todos: FormattedTodo[];
  style: Style;
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
  resetForm: () => void,
) => void

export interface SidebarProps {
  todos: FormattedTodo[];
  updateSelection: (selection: SelectionProps) => void;
  currentSelection: SelectionProps
}

export interface TodoManagerProps {
  todos: FormattedTodo[],
  onToggleCompleted: (id: number) => Promise<void>,
  onDelete: (id: number) => Promise<void>,
  titleInfo: TitleObjProps,
  onComplete: (id: number) => Promise<void>,
  handleDisplayModal: () => void,
  onView: (id: number) => void,
  displayModal: boolean,
  todo: FormattedTodo | null,
  onSubmit: OnSubmitProps,
  toggleSidebar: () => void
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
  updateSelection: (selection: SelectionProps) => void
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
  toggleSidebar: () => void;
}