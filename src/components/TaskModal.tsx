import React, { useContext } from "react";
import TaskForm from "./TaskForm";
import { TaskContext } from "@/contexts/taskContext";

const TaskModal = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const { showModal, setShowModal } = taskContext;

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
          <TaskForm />
        </div>
      </div>
    </>
  );
};

export default TaskModal;
