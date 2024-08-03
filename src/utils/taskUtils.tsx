import { Task } from "../types/Task";
import TaskComponent from "@/components/TaskComponent";

export function deleteTask(deletedTask: Task) {
  const tasksInLocalStorage: string | null = localStorage.getItem("tasks");
  let storedTasks: string =
    tasksInLocalStorage !== null ? (tasksInLocalStorage as string) : "";
  let tasks: Task[] = JSON.parse(storedTasks);

  const newTasks: Task[] = tasks.filter((task) => {
    return task.id !== deletedTask.id;
  });

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function _sortTasks(tasks: Task[]): Task[] {
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

function _updateTasks(tasks: Task[]) {
  const currentDate = new Date();
  const today = currentDate.toDateString();
  const lastUpdate: string | null = localStorage.getItem("lastUpdate");

  if (lastUpdate) {
    if (today !== lastUpdate) {
      tasks.forEach((task) => {
        if (task.status === "Completed") {
          task.status = "To-do";
        }
      });
    }
  }

  localStorage.setItem("lastUpdate", today);

  return tasks;
}

export function getLocalStorage() {
  let storedTasks: string | null = localStorage.getItem("tasks");

  if (storedTasks != null) {
    const updatedTasks = _updateTasks(JSON.parse(storedTasks));
    const sortedTasks: Task[] = _sortTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(sortedTasks));

    return sortedTasks;
  }
  return [];
}

export function renderTask(
  task: Task,
  completed: boolean,
  renderType: "To-do" | "Future" | "Tomorrow",
  setTask: React.Dispatch<React.SetStateAction<Task | null>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setToModify: React.Dispatch<React.SetStateAction<boolean>>,
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
) {
  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = daysOfWeek[currentDate.getDay()];
  const tomorrow = daysOfWeek[currentDate.getDay() + 1];
  const milliseconds_per_day = 24 * 60 * 60 * 1000;

  const taskDate = new Date(task.inicialDate.split("/").reverse().join("/"));

  let colorTask = "bg-primary";

  switch (renderType) {
    case "To-do":
      if (
        taskDate.getTime() <= currentDate.getTime() &&
        task.days.includes(today)
      ) {
        if (task.priority === "High") {
          colorTask = "bg-red-600";
        } else if (task.priority === "Medium") {
          colorTask = "bg-yellow-500";
        }

        return _renderStatus(
          task,
          colorTask,
          completed,
          setTask,
          setShowModal,
          setToModify,
          setReload,
          setCompleted
        );
      }
      break;
    case "Tomorrow":
      if (
        taskDate.getTime() <= currentDate.getTime() + milliseconds_per_day &&
        task.days.includes(tomorrow)
      ) {
        if (task.priority === "High") {
          colorTask = "bg-red-600";
        } else if (task.priority === "Medium") {
          colorTask = "bg-yellow-500";
        }

        return _renderStatus(
          task,
          colorTask,
          completed,
          setTask,
          setShowModal,
          setToModify,
          setReload,
          setCompleted
        );
      }
      break;
    default:
      if (
        taskDate.getTime() > currentDate.getTime() ||
        !task.days.includes(today)
      ) {
        if (task.priority === "High") {
          colorTask = "bg-red-600 bg-opacity-50";
        } else if (task.priority === "Medium") {
          colorTask = "bg-yellow-500 bg-opacity-50";
        } else {
          colorTask = "bg-slate-700";
        }

        return _renderStatus(
          task,
          colorTask,
          completed,
          setTask,
          setShowModal,
          setToModify,
          setReload,
          setCompleted
        );
      }
      break;
  }
}

function _renderStatus(
  task: Task,
  colorTask: string,
  completed: boolean,
  setTask: React.Dispatch<React.SetStateAction<Task | null>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setToModify: React.Dispatch<React.SetStateAction<boolean>>,
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (completed) {
    if (task.status === "Completed") {
      return (
        <TaskComponent
          key={task.id}
          obj={task}
          colorTask="bg-green-600"
          setTask={setTask}
          setShowModal={setShowModal}
          setToModify={setToModify}
          setReload={setReload}
          setCompleted={setCompleted}
        />
      );
    }
  } else {
    if (task.status !== "Completed") {
      return (
        <TaskComponent
          key={task.id}
          obj={task}
          colorTask={colorTask}
          setTask={setTask}
          setShowModal={setShowModal}
          setToModify={setToModify}
          setReload={setReload}
          setCompleted={setCompleted}
        />
      );
    }
  }
}
