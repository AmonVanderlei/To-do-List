import { Task } from "../types/Task";

interface Props {
  obj: Task;
  className?: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteButton({ obj, className, setShowDeleteModal }: Props) {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setShowDeleteModal(true);
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
