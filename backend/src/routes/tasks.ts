// src/routes/tasks.ts
import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks';

const router = Router();

router.get('/tasks', getAllTasks);           // GET    /api/tasks
router.get('/tasks/:id', getTaskById);       // GET    /api/tasks/1
router.post('/tasks', createTask);           // POST   /api/tasks
router.put('/tasks/:id', updateTask);        // PUT    /api/tasks/1
router.delete('/tasks/:id', deleteTask);     // DELETE /api/tasks/1

export default router;

