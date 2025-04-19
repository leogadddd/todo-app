// lib/database.ts
import { db, initializeDatabase } from "./index";

// Initialize database and tables when starting the server
(async () => {
  try {
    await initializeDatabase();
    console.log("Database and tables initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
})();

export async function createRecord(table: string, data: any) {
  return db.create(table, data);
}

export async function getRecords(table: string, where?: any) {
  return db.read(table, where);
}

export async function updateRecord(table: string, data: any, where: any) {
  return db.update(table, data, where);
}

export async function deleteRecord(table: string, where: any) {
  return db.remove(table, where);
}
