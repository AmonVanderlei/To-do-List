import { Task } from "../types/Task";
import { deleteTask } from "@/utils/taskUtils";

interface Props {
  obj: Task;
  className?: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setToModify: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteButton({
  obj,
  className,
  setReload,
  setShowModal,
  setTask,
  setToModify,
}: Props) {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget as HTMLButtonElement;
    const deletedTask: Task = JSON.parse(value);

    deleteTask(deletedTask);

    setTask(null);
    setToModify(false);
    setShowModal(false);
    setReload((prevReload) => !prevReload);
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
