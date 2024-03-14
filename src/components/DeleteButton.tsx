import { Task } from "../types/Task";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/utils/taskUtils";

function DeleteButton(obj: Task) {
  const router = useRouter();
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget as HTMLButtonElement;
    const deletedTask: Task = JSON.parse(value);

    deleteTask(deletedTask);

    router.push("/");
  };

  return (
    <button
      value={JSON.stringify(obj)}
      className="btn btn-outline btn-error mt-2 w-4/5"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
