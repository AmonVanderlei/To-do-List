import { Task } from "../types/Task";
import TaskComponent from "@/components/TaskComponent";

function _bgColor(
  task: Task,
  renderType: "To-do" | "Future" | "Tomorrow"
): string {
  if (renderType === "To-do" && task.status === "Completed") {
    return "bg-success";
  }

  switch (task.priority) {
    case "High":
      return "bg-error";
    case "Medium":
      return "bg-warning";
    case "Low":
      return "bg-primary";
  }
}

export function renderTask(
  task: Task,
  renderType: "To-do" | "Future" | "Tomorrow",
  dates: {
    currentDate: Date;
    today: string;
    tomorrow: string;
    tomorrowDate: Date;
  },
  completed: boolean
) {
  if (!dates) {
    return;
  }
  const taskDate: Date = new Date(task.inicialDate);
  taskDate.setHours(0, 0, 0, 0);

  switch (renderType) {
    case "To-do":
      if (
        taskDate.getTime() <= dates.currentDate.getTime() &&
        task.days.includes(dates.today)
      ) {
        const taskCompleted = task.status === "Completed";
        if (completed === taskCompleted) {
          return (
            <TaskComponent
              key={task.id}
              obj={task}
              bgColor={_bgColor(task, renderType)}
            />
          );
        }
      }
      break;
    case "Tomorrow":
      if (
        taskDate.getTime() <= dates.tomorrowDate.getTime() &&
        task.days.includes(dates.tomorrow)
      ) {
        return (
          <TaskComponent
            key={task.id}
            obj={task}
            bgColor={_bgColor(task, renderType)}
          />
        );
      }
      break;
    default:
      if (
        taskDate.getTime() > dates.currentDate.getTime() ||
        !task.days.includes(dates.today)
      ) {
        return (
          <TaskComponent
            key={task.id}
            obj={task}
            bgColor={_bgColor(task, renderType)}
          />
        );
      }
      break;
  }
}

export function sortTasks(tasks: Task[]): Task[] {
  let highPriorityTasks: Task[] = tasks.filter(
    (task) => task.priority === "High"
  );
  let mediumPriorityTasks: Task[] = tasks.filter(
    (task) => task.priority === "Medium"
  );
  let lowPriorityTasks: Task[] = tasks.filter(
    (task) => task.priority === "Low"
  );

  return [...highPriorityTasks, ...mediumPriorityTasks, ...lowPriorityTasks];
}
