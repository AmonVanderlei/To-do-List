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

  tasks.forEach((task) => {
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
  });

  return [...highPriorityTasks, ...mediumPriorityTasks, ...lowPriorityTasks];
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

export function setLocalStorageSorted(tasks: Task[]) {
  const updatedTasks = _updateTasks(tasks);
  const sortedTasks: Task[] = _sortTasks(updatedTasks);

  localStorage.setItem("tasks", JSON.stringify(sortedTasks));
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
  const tomorrowIndex = (currentDate.getDay() + 1) % 7;
  const tomorrow = daysOfWeek[tomorrowIndex];

  const taskDate = new Date(task.inicialDate.split("/").reverse().join("/"));
  taskDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  switch (renderType) {
    case "To-do":
      if (
        taskDate.getTime() <= currentDate.getTime() &&
        task.days.includes(today)
      ) {
        return _renderStatus(
          task,
          completed,
          renderType,
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
        taskDate.getTime() <= tomorrowDate.getTime() &&
        task.days.includes(tomorrow)
      ) {
        return (
          <TaskComponent
            key={task.id}
            obj={task}
            setTask={setTask}
            setShowModal={setShowModal}
            setToModify={setToModify}
            setReload={setReload}
            setCompleted={setCompleted}
            renderType={renderType}
          />
        );
      }
      break;
    default:
      if (
        taskDate.getTime() > currentDate.getTime() ||
        !task.days.includes(today)
      ) {
        return (
          <TaskComponent
            key={task.id}
            obj={task}
            setTask={setTask}
            setShowModal={setShowModal}
            setToModify={setToModify}
            setReload={setReload}
            setCompleted={setCompleted}
            renderType={renderType}
          />
        );
      }
      break;
  }
}

function _renderStatus(
  task: Task,
  completed: boolean,
  renderType: "To-do" | "Future" | "Tomorrow",
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
          setTask={setTask}
          setShowModal={setShowModal}
          setToModify={setToModify}
          setReload={setReload}
          setCompleted={setCompleted}
          renderType={renderType}
        />
      );
    }
  } else {
    if (task.status !== "Completed") {
      return (
        <TaskComponent
          key={task.id}
          obj={task}
          setTask={setTask}
          setShowModal={setShowModal}
          setToModify={setToModify}
          setReload={setReload}
          setCompleted={setCompleted}
          renderType={renderType}
        />
      );
    }
  }
}
