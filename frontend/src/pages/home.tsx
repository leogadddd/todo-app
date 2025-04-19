import { useTodoContext } from "../context/todo-context";
import TodoItem from "../components/todo-item";
import AddTodoButton from "../components/add-todo";

const HomePage = () => {
  const { isLoading, todos } = useTodoContext();
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-xl w-full rounded-lg">
        <ul className="flex flex-col gap-2">
          {isLoading && <li className="text-center">Loading...</li>}
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}

          {!isLoading && <AddTodoButton />}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
