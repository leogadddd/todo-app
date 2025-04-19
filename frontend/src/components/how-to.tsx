const HowTow = () => {
  return (
    <div className="max-w-xl w-full mt-4 opacity-75 pb-24">
      <div className="flex flex-col justify-center">
        <p className="text-lg font-medium">Manage your tasks efficiently</p>

        <ul className="flex flex-col gap-2 mt-2 indent-4">
          <li className="flex gap-1">
            1. Use the input field to add a new task
            <span className="text-gray-500">(press enter to add)</span>
          </li>
          <li className="">2. Hover over a task to edit or delete it</li>
          <li className="">3. Edit the task title by clicking on it</li>
        </ul>

        <p className="mt-6 text-lg font-medium">Things I would like to add:</p>

        <ul className="flex flex-col gap-2 mt-2 indent-4">
          <li className="flex gap-1">
            1. Bind the tasks to the logged in user
            <span className="text-gray-500">(so that they are not shared)</span>
          </li>
          <li className="">2. Add a delete all button</li>
          <li className="">3. better flow of the app</li>
          <li className="">4. Better Styling</li>
          <li className="">5. Add a loading spinner</li>
          <li className="flex gap-1">
            6. Seperate them by the time they created like
            <span className="text-gray-500">(last week, yesterday, etc.)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowTow;
