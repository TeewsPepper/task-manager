import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks";
import styles from "./TaskList.module.css";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar tareas al iniciar
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const nueva = await createTask(newTitle.trim());
    setTasks((prev) => [...prev, nueva]);
    setNewTitle("");
  };

  const handleStatusChange = async (task: Task, nuevoEstado: Task["status"]) => {
    const actualizada = await updateTask({ ...task, status: nuevoEstado });
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? actualizada : t))
    );
  };

  const handleEdit = async (task: Task, nuevoTitulo: string) => {
    const actualizada = await updateTask({ ...task, title: nuevoTitulo });
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? actualizada : t))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getStatusClass = (status: Task["status"]) => {
    return {
      todo: styles.statusTodo,
      "in-progress": styles.statusInProgress,
      done: styles.statusDone,
    }[status];
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>📝 Mis Tareas</h2>

      <div className={styles.newTask}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className={styles.emptyState}>No hay tareas aún.</div>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`${styles.taskCard} ${getStatusClass(task.status)}`}
            >
              <div className={styles.taskContent}>
                <input
                  className={`${styles.taskTitle} ${
                    task.status === "done" ? styles.completed : ""
                  }`}
                  value={task.title}
                  onChange={(e) => handleEdit(task, e.target.value)}
                />

                <select
                  className={`${styles.taskStatus}`}
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task, e.target.value as Task["status"])
                  }
                >
                  <option value="todo">Pendiente</option>
                  <option value="in-progress">En progreso</option>
                  <option value="done">Hecha</option>
                </select>

                <button onClick={() => handleDelete(task.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
