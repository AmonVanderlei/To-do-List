import "@natscale/react-calendar/dist/main.css";
import { Calendar } from "@natscale/react-calendar";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { Task } from "../types/Task";
import Days from "@/components/Days";
import { Value } from "@natscale/react-calendar/dist/utils/types";
import DeleteButton from "@/components/DeleteButton";
import { TaskContext } from "@/contexts/taskContext";
import { toast } from "react-toastify";

const TaskForm = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const {
    task,
    toModify,
    showModal,
    setShowModal,
    setTask,
    setToModify,
    addTask,
    updateTask,
  } = taskContext;

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

  // Turn string 'dd/mm/yyyy' in a Date
  function toDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day + 1));
    return date;
  }

  // Turn calendar Date in a 'dd/mm/yyyy' format to form
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

  // Change the selected atribute
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

  // Create/Update the task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.inicialDate) {
      toast.warning("Title and Inicial Date must be filled.");
      return;
    }

    if (toModify) {
      updateTask(formData);
    } else {
      addTask(formData);
    }

    setTask(null);
    setToModify(false);
    setShowModal(false);
  };

  // Put the tast to modify in the form
  useEffect(() => {
    if (showModal) {
      setFormData(taskToModify);
    }
  }, [showModal]);

  // When the form changes, set the calendar value
  useEffect(() => {
    if (formData.inicialDate) {
      setCalendarValue(toDate(formData.inicialDate));
    }
  }, [formData]);

  return (
    <form className="flex items-center flex-col" onSubmit={handleSubmit}>
      {/* Title */}
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
          required
        />
      </label>

      {/* Priority */}
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

      {/* Inicial Date */}
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

      {/* Days */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Days</span>
        </div>
        <Days setFormData={setFormData} days={formData.days} />
      </label>

      {/* Description */}
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

      <button type="submit" className="btn btn-outline mt-8 mb-2 w-full">
        {!toModify ? "Submit" : "Done"}
      </button>

      {!toModify ? (
        <button
          className="btn btn-outline btn-error mt-2 w-full"
          onClick={(e) => {
            e.preventDefault();

            setTask(null);
            setToModify(false);
            setShowModal(false);
          }}
        >
          Cancel
        </button>
      ) : (
        <div className="flex justify-between w-full">
          <DeleteButton key={formData.id} obj={formData} className="w-1/2" />
          <button
            className="btn btn-primary mt-2 w-5/12"
            onClick={(e) => {
              e.preventDefault();

              setTask(null);
              setToModify(false);
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
