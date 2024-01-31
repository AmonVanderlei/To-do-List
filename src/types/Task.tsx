export type TaskStatus = "To-do" | "In-Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
}
