import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks";
import styles from "./TaskList.module.css";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    const nuevos = arrayMove(tasks, oldIndex, newIndex);
    setTasks(nuevos);
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <SortableTask
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  getStatusClass={getStatusClass}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

const SortableTask = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  getStatusClass,
}: {
  task: Task;
  onEdit: (task: Task, title: string) => void;
  onDelete: (id: number) => void;
  onStatusChange: (task: Task, status: Task["status"]) => void;
  getStatusClass: (status: Task["status"]) => string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${styles.taskCard} ${getStatusClass(task.status)}`}
    >
      <div className={styles.taskContent}>
        <input
          className={`${styles.taskTitle} ${
            task.status === "done" ? styles.completed : ""
          }`}
          value={task.title}
          onChange={(e) => onEdit(task, e.target.value)}
        />

        <select
          className={styles.taskStatus}
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value as Task["status"])}
        >
          <option value="todo">Pendiente</option>
          <option value="in-progress">En progreso</option>
          <option value="done">Hecha</option>
        </select>

        <button onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </li>
  );
};

