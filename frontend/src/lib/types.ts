export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export type TodoContextType = {
  isLoading: boolean;
  todos: TodoType[];
  getTodos: () => void;
  addTodo: (todo: Partial<TodoType>) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, todo: Partial<TodoType>) => void;
};

export type APIResponse = {
  status: number;
  message: string;
  data: {
    todo?: TodoType;
    todos?: TodoType[];
    id?: number;
    len: number;
  };
};
