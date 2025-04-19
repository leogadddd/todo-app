import mysql from "mysql2/promise";
import { Pool } from "mysql2/promise";

// Create Todos Table
export const createTodoTable = async (pool: Pool) => {
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await pool.execute(tableQuery);
  console.log("Todos table created or already exists.");
};

// Create Users Table
export const createUserTable = async (pool: Pool) => {
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await pool.execute(tableQuery);
  console.log("Users table created or already exists.");
};

// Create the Database
export const createDatabase = async () => {
  const connection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
  });

  try {
    console.log("Connecting to MySQL server...");
    await connection.query("CREATE DATABASE IF NOT EXISTS `todo-app`;");
    console.log("Database 'todo-app' is ready.");
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  } finally {
    await connection.end();
  }
};
