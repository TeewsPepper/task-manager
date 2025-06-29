// src/types/task.ts
export interface ITask {
  id?: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  created_at?: Date;
}