import { useContext } from "react";
import { Task } from "../types/Task";
import { TaskContext } from "@/contexts/taskContext";

interface Props {
  obj: Task;
  className?: string;
}

function DeleteButton({ obj, className }: Props) {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const { deleteTask } = taskContext;

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget as HTMLButtonElement;
    const taskToDelete: Task = JSON.parse(value);

    deleteTask(taskToDelete);
  };

  return (
    <button
      value={JSON.stringify(obj)}
      className={`btn btn-outline btn-error mt-2 ${className}`}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
