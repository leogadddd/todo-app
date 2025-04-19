import React, { useEffect } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/auth";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div
      className={`max-w-xl mx-auto w-full my-4 flex items-center ${
        isLoggedIn ? "justify-between" : "hidden"
      }`}
    >
      <h1 className="text-2xl font-bold">Todo App</h1>
      <nav className={`flex space-x-4 ${isLoggedIn ? "" : "hidden"}`}>
        <span>
          Welcome back, {localStorage.getItem("username") || "Guest"}!
        </span>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="hover:text-red-500 text-gray-400"
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
