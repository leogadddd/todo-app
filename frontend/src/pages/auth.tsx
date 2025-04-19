import axios from "axios";
import React, { useState } from "react";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        {isSignup ? (
          <SignupForm onToggle={handleToggle} />
        ) : (
          <LoginForm onToggle={handleToggle} />
        )}
      </div>
    </div>
  );
};

interface LoginFormProps {
  onToggle: () => void;
}

const LoginForm = ({ onToggle }: LoginFormProps) => {
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Handle successful login, e.g., redirect or store token
        const { token, username } = response.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        window.location.href = "/"; // Redirect to home page
      } else {
        alert("Failed to login.");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(error.response.data.message);
        return;
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-6">
        Login to <span className="font-bold">Todo App</span>
      </h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            placeholder="Enter your username"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button onClick={onToggle} className="text-blue-500 hover:underline">
          Create one
        </button>
      </p>
    </div>
  );
};

interface SignupFormProps {
  onToggle: () => void;
}

const SignupForm = ({ onToggle }: SignupFormProps) => {
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;

    const confirmPassword = (event.target as HTMLFormElement).confirmPassword
      .value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      if (response.status === 201) {
        alert("User registered successfully!");
        onToggle(); // Switch to login form after successful signup
      } else {
        alert("Failed to register user.");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(error.response.data.message);
        return;
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-medium mb-6">
        Sign Up to <span className="font-bold">Todo App</span>
      </h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            placeholder="Enter your username"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create Account
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button onClick={onToggle} className="text-blue-500 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
