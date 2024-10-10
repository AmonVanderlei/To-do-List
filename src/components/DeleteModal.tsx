import React from "react";
import { Task } from "@/types/Task";
import { deleteTask } from "@/utils/taskUtils";

interface ModalProps {
  task: Task | null;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setToModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({
  task,
  showDeleteModal,
  setShowDeleteModal,
  setShowModal,
  setReload,
  setTask,
  setToModify,
}: ModalProps) => {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget as HTMLButtonElement;
    const deletedTask: Task = JSON.parse(value);

    deleteTask(deletedTask);

    setTask(null);
    setToModify(false);
    setShowModal(false);
    setShowDeleteModal(false);
    setReload((prevReload) => !prevReload);
  };
  return (
    <>
      <input
        type="checkbox"
        id="user-modal"
        className="modal-toggle"
        checked={showDeleteModal}
        onChange={() => setShowDeleteModal(false)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-20 w-20 text-error"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl my-4">Are you sure?</h1>
          <p className="text-center mb-4">
            Do you really want to delete this task? It can't be undone.
          </p>
          <div className="flex justify-between w-full">
            <button
              value={JSON.stringify(task)}
              className="btn btn-outline btn-error mt-2 w-1/2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="btn btn-primary mt-2 w-5/12"
              onClick={(e) => {
                e.preventDefault();

                setShowDeleteModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
