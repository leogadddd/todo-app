import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "./db/database";
import { TodoType } from "./types";

const TABLE_NAME = "todos";
const DEFAULT_TODO: TodoType = {
  id: 0,
  title: "",
  completed: false,
  created_at: new Date(),
  updated_at: new Date(),
};

async function createTodo(data: Partial<TodoType>) {
  const todo = { ...DEFAULT_TODO, ...data };
  const result = await createRecord(TABLE_NAME, todo);
  return result;
}

async function getTodos(where?: Partial<TodoType>) {
  const todos = await getRecords(TABLE_NAME, where);
  return todos;
}

async function updateTodo(id: string, data: Partial<TodoType>) {
  const result = await updateRecord(TABLE_NAME, data, { id });
  return result;
}

async function deleteTodo(id: string) {
  const result = await deleteRecord(TABLE_NAME, { id });
  return result;
}

export { createTodo, getTodos, updateTodo, deleteTodo };
