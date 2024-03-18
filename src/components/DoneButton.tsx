import { Task } from "../types/Task";
import { deleteTask } from "@/utils/taskUtils";

interface Props {
  obj: Task;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function DoneButton({ obj, setReload, setCompleted }: Props) {
  const handleDone: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const modifiedTask: Task = JSON.parse(value);

    deleteTask(modifiedTask);

    if (obj.status === "Completed") {
      modifiedTask.status = "To-do";
    } else {
      modifiedTask.status = "Completed";
    }

    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks != null) {
      let tasks = JSON.parse(storedTasks);
      tasks.push(modifiedTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify([modifiedTask]));
    }

    setCompleted(false);
    setReload((prevReload) => !prevReload);
  };

  return (
    <button value={JSON.stringify(obj)} className="btn" onClick={handleDone}>
      {obj.status === "Completed" ? "Undo" : "Done"}
    </button>
  );
}

export default DoneButton;
