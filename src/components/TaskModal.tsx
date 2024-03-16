import React from "react";
import TaskForm from "./TaskForm";
import { Task } from "@/types/Task";

interface ModalProps {
  toModify: boolean;
  task: Task | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal = ({ toModify, task, showModal, setShowModal }: ModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="user-modal"
        className="modal-toggle"
        checked={showModal}
        onChange={() => setShowModal(false)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box min-w-full min-h-screen !rounded-none">
          <TaskForm
            toModify={toModify}
            task={task}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </>
  );
};

export default TaskModal;
