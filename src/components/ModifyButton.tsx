import { useContext } from "react";
import { Task } from "../types/Task";
import { TaskContext } from "@/contexts/taskContext";

interface Props {
  obj: Task;
}

function ModifyButton({ obj }: Props) {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const { setTask, setToModify, setShowModal } = taskContext;

  const handleModify: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const modifiedTask: Task = JSON.parse(value);

    setToModify(true);
    setTask(modifiedTask);
    setShowModal(true);
  };

  return (
    <button value={JSON.stringify(obj)} className="btn" onClick={handleModify}>
      Modify
    </button>
  );
}

export default ModifyButton;
