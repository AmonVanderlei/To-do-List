import { Task } from "../types/Task";
import { deleteTask } from "@/utils/taskUtils";

interface Props {
  obj: Task;
  className?: string;
}

function DeleteButton({ obj, className }: Props) {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget as HTMLButtonElement;
    const deletedTask: Task = JSON.parse(value);

    deleteTask(deletedTask);

    window.location.reload();
  };

  return (
    <button
      value={JSON.stringify(obj)}
      className={`btn btn-outline btn-error mt-2 w-4/5 ${className}`}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
