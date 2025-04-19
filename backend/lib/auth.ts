import { createRecord, getRecords } from "./db/database";

import bcrypt from "bcryptjs";
import { UserType } from "./types";

const saltRounds = 10;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

const TABLE_NAME = "users";
const DEFAULT_USER = {
  id: 0,
  username: "",
  password: "",
  created_at: new Date(),
  updated_at: new Date(),
};

async function createUser(data: Partial<typeof DEFAULT_USER>) {
  const user = { ...DEFAULT_USER, ...data };
  const result = await createRecord(TABLE_NAME, user);
  return result;
}

async function loginUser(
  username: string,
  password: string
): Promise<UserType | null> {
  const users = await getRecords(TABLE_NAME, { username });

  if (users.length === 0) {
    return null; // User not found
  }

  const user = users[0] as UserType;
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return null; // Invalid password
  }

  // Password is valid, return user information
  const { password: _, ...userInfo } = user; // Exclude password from the returned user object

  return userInfo as UserType;
}

async function registerUser(
  username: string,
  password: string
): Promise<UserType | null> {
  const existingUsers = await getRecords(TABLE_NAME, { username });
  if (existingUsers.length > 0) {
    return null; // User already exists
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await createUser({ username, password: hashedPassword });

  if (!newUser) {
    return null; // Failed to create user
  }

  const userId = newUser.id;

  return newUser;
}

export { loginUser, registerUser };
