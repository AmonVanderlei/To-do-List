import { Task } from "../types/Task";

interface Props {
  obj: Task;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToModify: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModifyButton({ obj, setTask, setShowModal, setToModify }: Props) {
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
