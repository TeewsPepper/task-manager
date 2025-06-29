// src/controllers/tasks.ts
import { Request, Response } from 'express';
import pool from '../db';

// GET /api/tasks
export const getAllTasks = async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
  res.json(rows);
};

// GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(rows[0]);
};

// POST /api/tasks
export const createTask = async (req: Request, res: Response) => {
  const { title, status = false } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
    [title, status]
  );
  res.status(201).json(rows[0]);
};

// PUT /api/tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const { rows } = await pool.query(
    'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
    [title, status, id]
  );
  if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(rows[0]);
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING *',
    [id]
  );
  if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json({ message: 'Tarea eliminada', tarea: rows[0] });
};
