import { Task } from "../types/Task";
import TaskComponent from "@/components/TaskComponent";

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

function _renderType(task: Task, renderType: "To-do" | "Future") {
  const currentDate = new Date();
  const taskDate = new Date(task.inicialDate.split("/").reverse().join("/"));

  switch (renderType) {
    case "To-do":
      if (taskDate <= currentDate) {
        return (
          <TaskComponent
            key={task.description + task.title}
            title={task.title}
            status={task.status}
            priority={task.priority}
            inicialDate={task.inicialDate}
            days={task.days}
            description={task.description}
          />
        );
      }
      break;
    default:
      if (taskDate > currentDate) {
        return (
          <TaskComponent
            key={task.description + task.title}
            title={task.title}
            status={task.status}
            priority={task.priority}
            inicialDate={task.inicialDate}
            days={task.days}
            description={task.description}
          />
        );
      }
      break;
  }
}

export function renderTask(
  task: Task,
  completed: boolean,
  renderType: "To-do" | "Future"
) {
  if (completed) {
    if (task.status === "Completed") {
      return _renderType(task, renderType);
    }
  } else {
    if (task.status !== "Completed") {
      return _renderType(task, renderType);
    }
  }
}
