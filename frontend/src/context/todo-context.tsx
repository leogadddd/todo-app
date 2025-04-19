import React, { createContext, useState, useEffect } from "react";
import { TodoType, TodoContextType, APIResponse } from "../lib/types";
import axios from "axios";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping todo fetch.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get<APIResponse>(BACKEND_URL + "/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const todos = res.data.data.todos;
      if (todos) {
        setTodos(todos);
      } else {
        console.error("No todos found in the response.");
        setTodos([]);
      }
    } catch (error) {
      setTodos([]);
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (todo: Partial<TodoType>) => {
    if (!todo.title) {
      console.error("Title is required to add a todo.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping todo fetch.");
      setIsLoading(false);
      return;
    }

    const newTodo: Partial<TodoType> = {
      title: todo.title,
      completed: todo.completed || false,
    };

    try {
      const res = await axios.post<APIResponse>(
        BACKEND_URL + "/todos",
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdTodo = res.data.data.todo as TodoType;

      if (createdTodo) {
        setTodos((prev) => [...prev, createdTodo]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);

    if (!todo) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping todo fetch.");
      setIsLoading(false);
      return;
    }

    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      axios
        .delete(`${BACKEND_URL}/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
          // Optional: Revert back if the request fails
          setTodos((prev) => [...prev, todo]);
        });
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Optional: Revert back if the request fails
      setTodos((prev) => [...prev, todo]);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping todo fetch.");
      setIsLoading(false);
      return;
    }

    const updatedTodo = { ...todo, completed: !todo.completed };

    // Optimistically update the UI
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));

    try {
      await axios.put(`${BACKEND_URL}/todos/${id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      // Optional: Revert back if the request fails
      setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
    }
  };

  const updateTodo = async (id: number, updatedData: Partial<TodoType>) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping todo fetch.");
      setIsLoading(false);
      return;
    }

    const updatedTodo = { ...todo, ...updatedData };

    // Optimistically update the UI
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));

    try {
      await axios.put(`${BACKEND_URL}/todos/${id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      // Optional: Revert back if the request fails
      setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
    }
  };

  // Load todos on mount
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        isLoading,
        todos,
        getTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
