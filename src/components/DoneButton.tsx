import { Task } from "../types/Task";
import { setLocalStorageSorted } from "@/utils/taskUtils";

interface Props {
  obj: Task;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function DoneButton({ obj, setReload, setCompleted }: Props) {
  const handleDone: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const taskToModify: Task = JSON.parse(value);

    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks != null) {
      let tasks = JSON.parse(storedTasks);

      tasks.forEach((oldTask: Task) => {
        if (oldTask.id === taskToModify.id) {
          if (oldTask.status === "Completed") {
            oldTask.status = "To-do";
          } else {
            oldTask.status = "Completed";
          }
        }
      });

      setLocalStorageSorted(tasks);
    } else {
      localStorage.setItem("tasks", JSON.stringify([taskToModify]));
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
