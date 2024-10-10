import "@natscale/react-calendar/dist/main.css";
import { Calendar } from "@natscale/react-calendar";
import React, { useState, useCallback, useEffect } from "react";
import { Task } from "../types/Task";
import Days from "@/components/Days";
import { Value } from "@natscale/react-calendar/dist/utils/types";
import DeleteButton from "@/components/DeleteButton";
import { setLocalStorageSorted } from "@/utils/taskUtils";

interface FormProps {
  toModify: boolean;
  task: Task | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setToModify: React.Dispatch<React.SetStateAction<boolean>>;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskForm = ({
  toModify,
  task,
  showModal,
  setShowModal,
  setShowDeleteModal,
  setReload,
  setTask,
  setToModify,
  setShowError,
}: FormProps) => {
  const taskToModify: Task = task
    ? task
    : {
        id: Date.now().toString(),
        title: "",
        status: "To-do",
        priority: "Low",
        inicialDate: "",
        days: [],
        description: "",
      };
  const [formData, setFormData] = useState<Task>(taskToModify);
  const [calendarValue, setCalendarValue] = useState<Value | undefined>(
    task ? toDate(task?.inicialDate) : undefined
  );

  function toDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day + 1));
    return date;
  }

  const onCalendarChange = useCallback(
    (value: any) => {
      setCalendarValue(value);

      const date = new Date(value);

      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = date.getUTCFullYear().toString();

      const formattedDate = `${day}/${month}/${year}`;

      setFormData((prevData) => ({
        ...prevData,
        inicialDate: formattedDate,
      }));
    },
    [setCalendarValue]
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.title != "" && formData.inicialDate !== "") {
      let storedTasks = localStorage.getItem("tasks");

      if (storedTasks != null) {
        let tasks = JSON.parse(storedTasks);

        if (toModify) {
          tasks.forEach((oldTask: Task) => {
            if (oldTask.id === formData.id) {
              oldTask.title = formData.title;
              oldTask.status = formData.status;
              oldTask.priority = formData.priority;
              oldTask.inicialDate = formData.inicialDate;
              oldTask.days = formData.days;
              oldTask.description = formData.description;
            }
          });
          setLocalStorageSorted(tasks);
        } else {
          tasks.push(formData);
          setLocalStorageSorted(tasks);
        }
      } else {
        localStorage.setItem("tasks", JSON.stringify([formData]));
      }

      setTask(null);
      setToModify(false);
      setShowModal(false);
      setReload((prevReload) => !prevReload);
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showModal) {
      setFormData(taskToModify);
    }
  }, [showModal]);

  useEffect(() => {
    if (formData.inicialDate) {
      setCalendarValue(toDate(formData.inicialDate));
    }
  }, [formData]);

  return (
    <form className="flex items-center flex-col" onSubmit={handleSubmit}>
      <label className="flex flex-col w-full">
        <div className="label">
          <span className="label-text">Title*</span>
        </div>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Status</span>
        </div>
        <select
          name="status"
          value={formData.status}
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="To-do">To-do</option>
          <option value="Completed">Completed</option>
        </select>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Priority</span>
        </div>
        <select
          name="priority"
          value={formData.priority}
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Inicial date*</span>
        </div>
        <div className="flex justify-center w-full">
          <Calendar
            value={calendarValue}
            onChange={onCalendarChange}
            startOfWeek={0}
            useDarkMode
          />
        </div>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Days</span>
        </div>
        <Days setFormData={setFormData} days={formData.days} />
      </label>

      <label className="flex flex-col w-full">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          name="description"
          value={formData.description}
          placeholder="Type here"
          className="input input-bordered w-full !h-36"
          onChange={handleChange}
        />
      </label>

      {!toModify ? (
        <>
          <button type="submit" className="btn btn-outline mt-8 mb-2 w-full">
            Submit
          </button>
          <button
            className="btn btn-outline btn-error mt-2 w-full"
            onClick={(e) => {
              e.preventDefault();

              setTask(null);
              setToModify(false);
              setShowModal(false);
              setReload((prevReload) => !prevReload);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button type="submit" className="btn btn-outline mt-8 mb-2 w-full">
            Done
          </button>
          <div className="flex justify-between w-full">
            <DeleteButton
              key={formData.id}
              obj={formData}
              className="w-1/2"
              setShowDeleteModal={setShowDeleteModal}
            />
            <button
              className="btn btn-primary mt-2 w-5/12"
              onClick={(e) => {
                e.preventDefault();

                setTask(null);
                setToModify(false);
                setShowModal(false);
                setReload((prevReload) => !prevReload);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default TaskForm;
