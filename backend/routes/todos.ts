import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../lib/todo";
import { APIResponse } from "../lib/types";
import { authenticateToken } from "./middleware";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const todos = await getTodos();

    if (!todos) {
      res.status(404).json({
        status: 404,
        message: "No todos found",
        data: {
          todos: [],
          len: 0,
        },
      } as APIResponse);
      return;
    }

    res.status(200).json({
      status: 200,
      message: "Todos fetched successfully",
      data: {
        todos,
        len: todos.length,
      },
    } as APIResponse);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch todos",
    } as APIResponse);
    return;
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof completed !== "boolean") {
    res.status(403).json({
      status: 403,
      message:
        "Invalid input. Title is required and completed must be a boolean.",
    } as APIResponse);
    return;
  }

  try {
    const newTodo = {
      title,
      completed,
    };
    const result = await createTodo(newTodo);

    console.log("result", result);

    res.status(200).json({
      status: 200,
      message: "Todo created successfully",
      data: {
        todo: result,
        len: 1,
      },
    } as APIResponse);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to create todo",
    } as APIResponse);
    return;
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  // check if the todo with the given ID exists
  const todoId = req.params.id;

  // check if the request body has fields title or completed
  const { title, completed } = req.body;

  if (!title && typeof completed !== "boolean") {
    res.status(403).json({
      status: 403,
      message:
        "Invalid input. Title is required and completed must be a boolean.",
    } as APIResponse);
    return;
  }

  try {
    const updatedTodo = {
      title,
      completed,
    };
    // update the todo with the given ID
    const result = await updateTodo(todoId, updatedTodo);
    res.status(200).json({
      status: 200,
      message: "Todo updated successfully",
      data: {
        todo: result,
        len: 1,
      },
    } as APIResponse);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to update todo",
    } as APIResponse);
    return;
  }
});
router.delete("/:id", authenticateToken, async (req, res) => {
  // check if the todo with the given ID exists
  const todoId = req.params.id;

  try {
    // delete the todo with the given ID
    const result = await deleteTodo(todoId);
    res.status(200).json({
      message: "Todo deleted successfully",
      data: {
        todo: result,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete todo",
    } as APIResponse);
    return;
  }
});

export default router;
