import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { createDatabase, createTodoTable, createUserTable } from "../db-utils";

// Define the DatabaseAdapter interface
interface DatabaseAdapter {
  create: <T extends object>(table: string, data: T) => Promise<T>;
  read: <T>(table: string, where?: Record<string, any>) => Promise<T[]>;
  update: <T extends object>(
    table: string,
    data: T,
    where: Record<string, any>
  ) => Promise<T>;
  remove: <T>(table: string, where: Record<string, any>) => Promise<T>;
}

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "todo-app",
  port: 3306,
});

// MySQLAdapter implementation
export const MySQLAdapter: DatabaseAdapter = {
  async create<T extends object>(table: string, data: T): Promise<T> {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    // Execute the insert query
    const [result] = await pool.execute<ResultSetHeader>(sql, values); // Expect ResultSetHeader

    // Fetch the newly created row
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM ${table} WHERE id = ?`,
      [result.insertId]
    );

    return rows[0] as T; // Return the created row, cast to the correct type
  },

  async read<T>(table: string, where?: Record<string, any>): Promise<T[]> {
    let sql = `SELECT * FROM ${table}`;
    let values: any[] = [];

    if (where) {
      const conditions = Object.keys(where)
        .map((k) => `${k} = ?`)
        .join(" AND ");
      sql += ` WHERE ${conditions}`;
      values = Object.values(where);
    }

    const [rows] = await pool.execute<RowDataPacket[]>(sql, values); // Expect RowDataPacket[]
    return rows as T[]; // Return the result rows cast to the correct type
  },

  async update<T extends object>(
    table: string,
    data: T,
    where: Record<string, any>
  ): Promise<T> {
    const conditions = Object.keys(where)
      .map((k) => `${k} = ?`)
      .join(" AND ");
    const updates = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(", ");

    // Collect values from both `data` and `where`, ensuring correct typing
    const values = [...Object.values(data), ...Object.values(where)];

    const sql = `UPDATE ${table} SET ${updates} WHERE ${conditions}`;
    await pool.execute(sql, values);

    // Fetch the updated row
    const whereValues = Object.values(where);
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM ${table} WHERE ${conditions}`,
      whereValues
    );

    return rows[0] as T; // Return the updated row, cast to the correct type
  },

  async remove<T>(table: string, where: Record<string, any>): Promise<T> {
    const conditions = Object.keys(where)
      .map((k) => `${k} = ?`)
      .join(" AND ");
    const values = Object.values(where);

    // Get rows before deletion
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM ${table} WHERE ${conditions}`,
      values
    );

    // Perform deletion
    await pool.execute(`DELETE FROM ${table} WHERE ${conditions}`, values);

    return rows[0] as T; // Return the deleted row, cast to the correct type
  },
};

// Utility function to initialize the database and tables
export const initializeDatabase = async () => {
  // Assume createDatabase, createTodoTable, and createUserTable
  // are implemented elsewhere and are responsible for creating necessary tables
  await createDatabase(); // Create the database if it doesn't exist
  await createTodoTable(pool); // Create the todo table
  await createUserTable(pool); // Create the user table
};
