import { Task } from "../types/Task";

export function deleteTask(deletedTask: Task) {
  const tasksInLocalStorage: string | null = localStorage.getItem("tasks");
  let storedTasks: string =
    tasksInLocalStorage !== null ? (tasksInLocalStorage as string) : "";
  let tasks: Task[] = JSON.parse(storedTasks);

  const newTasks: Task[] = tasks.filter((task) => {
    return (
      task.title !== deletedTask.title ||
      task.description !== deletedTask.description ||
      task.status !== deletedTask.status ||
      task.priority !== deletedTask.priority
    );
  });

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}
