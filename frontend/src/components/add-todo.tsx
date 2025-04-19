import { useState } from "react";
import { useTodoContext } from "../context/todo-context";

const AddTodoForm = () => {
  const { addTodo } = useTodoContext();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") return;

    setIsLoading(true);
    await addTodo({ title, completed: isCompleted });
    setTitle("");
    setIsCompleted(false);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <li
        key={"new"}
        className={`flex gap-2 p-4 w-full rounded-xl border border-gray-700`}
      >
        <input
          type="checkbox"
          disabled={title === ""}
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        <input
          className="flex-1 rounded focus:outline-none bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded px-4 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } ${title.trim() === "" ? "hidden" : "block"}`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </li>
    </form>
  );
};

export default AddTodoForm;
