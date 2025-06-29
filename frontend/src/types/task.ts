export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}