require("dotenv").config();

import cors from "cors";
import express from "express";
import todosRouter from "./routes/todos";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// just for testing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRouter);
app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
