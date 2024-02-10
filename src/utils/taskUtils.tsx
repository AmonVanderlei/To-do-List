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
          const curDate = new Date(currentDate);
          const lastDate = new Date(updateDate);
          const differenceInMs = lastDate.getTime() - curDate.getTime();
          const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
          const monthChanged =
            currentDate.split(" ")[1] !== updateDate.split(" ")[1];
          const yearChanged =
            currentDate.split(" ")[3] !== updateDate.split(" ")[3];

          switch (task.update) {
            case "Daily":
              task.status = "To-do";
              break;
            case "Weekly":
              if (differenceInMs > millisecondsInWeek) {
                task.status = "To-do";
              }
              break;
            case "Monthly":
              if (monthChanged || yearChanged) {
                task.status = "To-do";
              }
              break;
            default:
              if (yearChanged) {
                task.status = "To-do";
              }
              break;
          }
        }
      });
    }
  }

  localStorage.setItem("updateDate", currentDate);

  return tasks;
}
