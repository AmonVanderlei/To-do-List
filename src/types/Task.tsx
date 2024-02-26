export type TaskStatus = "To-do" | "In-Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskUpdate = "Daily" | "Weekly" | "Monthly" | "Yearly";

export interface Task {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  update: TaskUpdate;
  inicialDate: string;
  days: string[];
  description: string;
}
