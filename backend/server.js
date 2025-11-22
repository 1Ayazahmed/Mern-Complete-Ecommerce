import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use("/api/v1/users", userRoutes);

// http://localhost:3000/api/v1/users/register

// Connect to MongoDB first
connectDB()
  .then(() => {
    // Start the server after successful database connection
    app.listen(PORT, () => {
    

      console.log(`\nServer is running on http://localhost:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });