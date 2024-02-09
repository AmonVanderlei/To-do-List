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

export function sortTasks(tasks: Task[]): Task[] {
  let highPriorityTasks: Task[] = [];
  let mediumPriorityTasks: Task[] = [];
  let lowPriorityTasks: Task[] = [];
  let completedTasks: Task[] = [];

  tasks.forEach((task) => {
    if (task.status === "Completed") {
      completedTasks.push(task);
    } else {
      switch (task.priority) {
        case "High":
          highPriorityTasks.push(task);
          break;
        case "Medium":
          mediumPriorityTasks.push(task);
          break;
        default:
          lowPriorityTasks.push(task);
          break;
      }
    }
  });

  return [
    ...highPriorityTasks,
    ...mediumPriorityTasks,
    ...lowPriorityTasks,
    ...completedTasks,
  ];
}

export function updateTasks(tasks: Task[]) {
  const currentDate: string = Date().split(":")[0].slice(0, -3);
  const updateDate: string | null = localStorage.getItem("updateDate");

  if (updateDate) {
    if (currentDate !== updateDate) {
      tasks.forEach((task) => {
        if (task.status === "Completed") {
          task.status = "To-do";
        }
      });
    }
  }

  localStorage.setItem("updateDate", currentDate);

  return tasks;
}
