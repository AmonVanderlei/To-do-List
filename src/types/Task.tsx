export type TaskStatus = "To-do" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  inicialDate: string;
  days: string[];
  description: string;
}
