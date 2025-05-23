export interface Todo {
  id: number;
  title: string;
  year: string;
  month: string;
  day: string;
  completed: boolean;
  description?: string;
}

export interface Style {
  display: string,
  top?: string
}

export interface DateKey {
  [key: string]: Todo[];
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
  todos: Todo[];
  onSelect: (selection: SelectionProps) => void;
  currentSelection: SelectionProps
}

export interface TodoManagerProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onSidebarToggleClick: () => void;
  currentSelection: SelectionProps;
  resetSelection: () => void;
}

export interface TodoTableProps {
  todos: Todo[],
  onView: (id: number) => void,
  onToggleCompleted: (id: number) => Promise<void>,
  onDelete: (id: number) => Promise<void>,
}

export interface TodoItemProps {
  todo: Todo;
  onView: (id: number) => void,
  onToggleCompleted: (id: number) => Promise<void>,
  onDelete: (id: number) => Promise<void>,
}

export interface SidebarTodoGroupProps {
  title: string;
  todos: Todo[];
  isCompletedView: boolean;
  currentSelection: SelectionProps;
  onSelect: (selection: SelectionProps) => void
}

export interface dateKeyTodosProps {
  [key: string]: Todo[]
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
  year: string | undefined;
  month: string | undefined;
  day: string | undefined;
}

export type TodoField = 'title' | 'description' | 'date' | 'year' | 'month' | 'day';

export interface ModalProps {
  displayModal: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSubmit: OnSubmitProps;
  onComplete: (id: number) => Promise<void>;
}

export interface ModalFormProps {
  onSubmit: OnSubmitProps;
  todo: Todo | null;
  onComplete: (id: number) => Promise<void>;
}

type onChangeProp = (property: TodoField, value: string | DateParts) => void

export interface TitleInputProps {
  title: string | undefined;
  onChange: onChangeProp;
  onBlur: () => void;
  titleError: string | null;
  titleBlur: boolean;
}

export interface DueDateInputProps {
  date: DateParts;
  onChange: onChangeProp;
}

export interface DescriptionInputProps {
  description: string | undefined;
  onChange: onChangeProp
}