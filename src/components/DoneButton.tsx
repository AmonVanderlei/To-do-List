import { useContext } from "react";
import { Task } from "../types/Task";
import { TaskContext } from "@/contexts/taskContext";

interface Props {
  obj: Task;
}

function DoneButton({ obj }: Props) {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const { setCompleted, updateTask } = taskContext;

  const handleDone: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const taskToModify: Task = JSON.parse(value);

    if (taskToModify.status === "Completed") {
      taskToModify.status = "To-do";
    } else {
      taskToModify.status = "Completed";
    }

    updateTask(taskToModify);

    setCompleted(false);
  };

  return (
    <button value={JSON.stringify(obj)} className="btn" onClick={handleDone}>
      {obj.status === "Completed" ? "Undo" : "Done"}
    </button>
  );
}

export default DoneButton;
