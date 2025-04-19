import express from "express";
import jwt from "jsonwebtoken";

import { loginUser, registerUser } from "../lib/auth";

import { APIResponse, JWTPayload } from "../lib/types";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(402).json({
      status: 402,
      message: "Username and password are required",
    } as APIResponse);
    return;
  }

  try {
    const user = await loginUser(username, password);

    if (!user) {
      res.status(401).json({
        status: 401,
        message: "Invalid username or password",
      } as APIResponse);
      return;
    }

    const payload = {
      id: user.id.toString(),
      username: user.username,
    } as Partial<JWTPayload>;

    const secretKey = process.env.JWT_SECRET!;

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        id: user.id.toString(),
        token,
        username: user.username,
        auth: true,
        len: 1,
      },
    } as APIResponse);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    } as APIResponse);
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      status: 402,
      message: "Username and password are required",
    } as APIResponse);
    return;
  }

  try {
    const user = await registerUser(username, password);

    if (!user) {
      res.status(401).json({
        status: 400,
        message: "User already exists",
      } as APIResponse);
      return;
    }

    res.status(201).json({
      status: 200,
      message: "User registered successfully",
      data: {
        id: user.id.toString(),
        username: user.username,
        len: 1,
      },
    } as APIResponse);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    } as APIResponse);
  }
});

export default router;
