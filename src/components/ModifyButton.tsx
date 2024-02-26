import { useRouter } from "next/navigation";
import { Task } from "../types/Task";
import { deleteTask } from "@/utils/taskUtils";

function ModifyButton(obj: Task) {
  const router = useRouter();
  const handleModify: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget as HTMLButtonElement;
    const modifiedTask: Task = JSON.parse(value);

    deleteTask(modifiedTask);

    const queryString = `title=${modifiedTask.title}&status=${
      modifiedTask.status
    }&priority=${modifiedTask.priority}&update=${
      modifiedTask.update
    }&inicialDate=${modifiedTask.inicialDate}&days=${
      modifiedTask.days
    }&description=${encodeURIComponent(modifiedTask.description)}&cancel=false`;

    router.push(`/new-task?${queryString}`);
  };

  return (
    <button value={JSON.stringify(obj)} className="btn" onClick={handleModify}>
      Modify
    </button>
  );
}

export default ModifyButton;
