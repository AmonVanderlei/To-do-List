"use client";
import { Task } from "@/types/Task";
import { sortTasks } from "@/utils/taskUtils";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast, ToastContentProps } from "react-toastify";

export interface TaskContextType {
  tasks: Task[] | null;
  setTasks: Dispatch<SetStateAction<Task[] | null>>;
  renderType: "To-do" | "Future" | "Tomorrow";
  setRenderType: Dispatch<SetStateAction<"To-do" | "Future" | "Tomorrow">>;
  completed: boolean;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  dates: {
    today: string;
    currentDate: Date;
    tomorrow: string;
    tomorrowDate: Date;
  } | null;
  task: Task | null;
  setTask: Dispatch<SetStateAction<Task | null>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  toModify: boolean;
  setToModify: Dispatch<SetStateAction<boolean>>;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TaskContextProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [renderType, setRenderType] = useState<"To-do" | "Future" | "Tomorrow">(
    "To-do"
  );
  const [completed, setCompleted] = useState<boolean>(false);
  const [dates, setDates] = useState<{
    today: string;
    currentDate: Date;
    tomorrow: string;
    tomorrowDate: Date;
  } | null>(null);

  // Modal states
  const [task, setTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toModify, setToModify] = useState<boolean>(false);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    const currentDate = new Date();
    const tomorrowIndex = (currentDate.getDay() + 1) % 7;

    const today = daysOfWeek[currentDate.getDay()];
    const tomorrow = daysOfWeek[tomorrowIndex];

    // Get full tomorrow date
    currentDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    setDates({ today, currentDate, tomorrow, tomorrowDate });

    // Take all the tasks from firebase
    // const tasksData = await getDocuments("tasks", user.uid);
    // setTasks(sortTasks(updateTasks(taskData)));
  }, []);

  async function addTask(task: Task) {
    const { id, ...taskWithoutId } = task;
    // Add to firebase
    const newId = new Date().getTime().toString(); //await toast.promise(addDocument("tasks", task), {
    //   pending: messages.loading.add,
    //   success: messages.success.add,
    //   error: messages.error.something,
    // });

    // Add locally
    setTasks((prevState) => {
      if (prevState) {
        return sortTasks([
          ...prevState,
          { id: newId, ...taskWithoutId } as Task,
        ]) as Task[];
      } else {
        return [{ id: newId, ...taskWithoutId } as Task];
      }
    });
  }

  function updateTask(task: Task) {
    // Update on firebase
    // toast.promise(updateDocument("tasks", task), {
    //   pending: messages.loading.update,
    //   success: messages.success.update,
    //   error: messages.error.something,
    // });

    // Update locally
    setTasks((prevState) => {
      const updatedTasks = (prevState ?? []).map((t) =>
        t.id === task.id ? { ...t, ...task } : t
      );
      return sortTasks(updatedTasks);
    });
  }

  function CustomNotification({ closeToast }: ToastContentProps) {
    return (
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-20 w-20 text-error"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl my-4">Are you sure?</h1>
        <p className="text-center mb-4">
          Do you really want to delete this task? It can&apos;t be undone.
        </p>
        <div className="flex justify-between w-full">
          <button
            value={JSON.stringify(task)}
            className="btn btn-outline btn-error mt-2 w-1/2"
            onClick={() => closeToast("delete")}
          >
            Delete
          </button>
          <button className="btn btn-primary mt-2 w-5/12" onClick={closeToast}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  function deleteTask(task: Task) {
    toast(CustomNotification, {
      closeButton: false,
      position: "bottom-center",
      autoClose: false,
      draggable: false,
      onClose(reason) {
        switch (reason) {
          case "delete":
            // Delete on firebase
            // toast.promise(deleteDocument("tasks", task.id), {
            //   pending: messages.loading.delete,
            //   success: messages.success.delete,
            //   error: messages.error.something,
            // });

            // Delete locally
            setTasks((prevState) => {
              return prevState
                ? sortTasks(prevState.filter((t) => t.id !== task.id))
                : [];
            });
            setTask(null);
            setToModify(false);
            setShowModal(false);
        }
      },
    });
  }

  const values: TaskContextType = {
    tasks,
    setTasks,
    renderType,
    setRenderType,
    completed,
    setCompleted,
    dates,
    task,
    setTask,
    showModal,
    setShowModal,
    toModify,
    setToModify,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
}
