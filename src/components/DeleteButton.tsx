import { Task } from "../types/Task";
import { deleteTask } from "@/utils/taskUtils";

function DeleteButton(obj: Task) {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const deletedTask: Task = JSON.parse(value);

    deleteTask(deletedTask);

    window.location.reload();
  };

  return (
    <button value={JSON.stringify(obj)} className="btn" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteButton;
