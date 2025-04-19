import { useRef, useState } from "react";
import { TodoType } from "../lib/types";
import { useTodoContext } from "../context/todo-context";

interface TodoItemProps {
  todo: TodoType;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleTodo, removeTodo, updateTodo } = useTodoContext();

  const [title, setTitle] = useState(todo.title);

  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggle = () => {
    setIsCompleted((prev) => !prev);
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    // additional confirmation logic can be added here
    // e.g., show a modal or alert before deleting

    // use alert for simplicity
    if (window.confirm("Are you sure you want to delete this todo?")) {
      removeTodo(todo.id);
    }
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
      }
    }, 0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const disableEditing = () => {
    setIsEditing(false);

    if (title.trim() !== "") {
      updateTodo(todo.id, { title });
    } else {
      setTitle(todo.title); // Reset to original title if empty
    }
  };

  return (
    <li
      className={`group/todo-item flex gap-2 justify-between p-4 w-full rounded-xl border border-gray-700 ${
        todo.completed ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-2 w-full">
        <input type="checkbox" checked={isCompleted} onChange={handleToggle} />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded focus:outline-none"
            value={title}
            onChange={(e) => {
              handleTitleChange(e);
            }}
            onBlur={disableEditing}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                disableEditing();
              }
            }}
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer w-full ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={enableEditing}
          >
            {title}
          </span>
        )}
      </div>
      <div>
        <button
          className="hidden group-hover/todo-item:block text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
export default TodoItem;
