// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [
      "https://task-manager-1-vk2h.onrender.com", // URL de tu frontend en Render
      "http://localhost:5173", // Desarrollo local
    ],
    credentials: true,
  })
);
app.use(express.json());

// Rutas
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
