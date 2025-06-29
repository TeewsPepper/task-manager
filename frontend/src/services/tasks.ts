
import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:3000/api/tasks";

// GET - Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST - Crear tarea
export const createTask = async (title: string): Promise<Task> => {
  const response = await axios.post(API_URL, {
    title,
    status: "todo", // ✅ usamos "todo" como estado inicial
  });
  return response.data;
};

// PUT - Actualizar tarea (título o estado)
export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
};

// DELETE - Eliminar tarea
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};


