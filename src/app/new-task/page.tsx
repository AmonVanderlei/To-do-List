"use client";

import "@natscale/react-calendar/dist/main.css";
import { Calendar } from "@natscale/react-calendar";
import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Task, TaskStatus, TaskPriority } from "../../types/Task";
import Days from "@/components/new-task/Days";
import { Value } from "@natscale/react-calendar/dist/utils/types";
import DeleteButton from "@/components/DeleteButton";
import { deleteTask } from "@/utils/taskUtils";

const MyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id: string | null = searchParams.get("id");
  const title: string | null = searchParams.get("title");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const inicialDate = searchParams.get("inicialDate");
  const days = searchParams.get("days");
  const description: string | null = searchParams.get("description");
  const cancel: string =
    searchParams.get("cancel") === "false" ? "!hidden" : "";

  const taskToModify: Task = {
    id: id !== null ? id : Date.now().toString(),
    title: title !== null ? title : "",
    status: status !== null ? (status as TaskStatus) : "To-do",
    priority: priority !== null ? (priority as TaskPriority) : "Low",
    inicialDate: inicialDate !== null ? inicialDate : "",
    days: days !== null && days !== undefined ? days.split(",") : [],
    description: description !== null ? description : "",
  };

  const [formData, setFormData] = useState<Task>(taskToModify);
  const [calendarValue, setCalendarValue] = useState<Value | undefined>(
    inicialDate !== null ? toDate(inicialDate) : undefined
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

    let storedTasks = localStorage.getItem("tasks");

    if (storedTasks != null) {
      let tasks = JSON.parse(storedTasks);
      deleteTask(taskToModify);
      tasks.push(formData);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify([formData]));
    }

    router.push("/");
  };

  return (
    <>
      <form className="flex items-center flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col w-4/5">
          <div className="label">
            <span className="label-text">Title</span>
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

        <label className="form-control w-4/5">
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

        <label className="form-control w-4/5">
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

        <label className="form-control w-4/5">
          <div className="label">
            <span className="label-text">Inicial date</span>
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

        <label className="form-control w-4/5">
          <div className="label">
            <span className="label-text">Days</span>
          </div>
          <Days setFormData={setFormData} days={formData.days} />
        </label>

        <label className="flex flex-col w-4/5">
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

        {cancel !== "!hidden" ? (
          <button type="submit" className="btn btn-outline mt-8 mb-2 w-4/5">
            Submit
          </button>
        ) : (
          <button type="submit" className="btn btn-outline mt-8 mb-2 w-4/5">
            Done
          </button>
        )}
        {cancel !== "!hidden" ? (
          <Link className="btn btn-outline btn-error mt-2 w-4/5" href="/">
            Cancel
          </Link>
        ) : (
          <DeleteButton
            key={formData.id}
            id={formData.id}
            title={formData.title}
            status={formData.status}
            priority={formData.priority}
            inicialDate={formData.inicialDate}
            days={formData.days}
            description={formData.description}
          />
        )}
      </form>
    </>
  );
};

export default MyForm;
