"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Task, TaskStatus, TaskPriority } from "../../types/Task";

const MyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title: string | null = searchParams.get("title");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const description: string | null = searchParams.get("description");
  const cancel: string =
    searchParams.get("cancel") === "false" ? "!hidden" : "";

  const [formData, setFormData] = useState<Task>({
    title: title !== null ? title : "",
    status: status !== null ? (status as TaskStatus) : "To-do",
    priority: priority !== null ? (priority as TaskPriority) : "Low",
    description: description !== null ? description : "",
  });

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
            <option value="In Progress">In Progress</option>
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

        <button type="submit" className="btn btn-outline mt-8 w-4/5">
          Submit
        </button>
        <Link
          className={`btn btn-outline btn-error mt-2 w-4/5 ${cancel}`}
          href="/"
        >
          Cancel
        </Link>
      </form>
    </>
  );
};

export default MyForm;
