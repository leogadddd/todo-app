import { MySQLAdapter, initializeDatabase } from "./adapter/mysql";

export const db = MySQLAdapter;
export { initializeDatabase };
