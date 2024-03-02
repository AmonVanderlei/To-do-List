"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Task from "@/components/TaskComponent";
import { sortTasks, renderTask, updateTasks } from "@/utils/taskUtils";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [renderType, setRenderType] = useState<"To-do" | "Future">("To-do");

  useEffect(() => {
    let storedTasks: string | null = localStorage.getItem("tasks");

    if (storedTasks != null) {
      const updatedTasks = updateTasks(JSON.parse(storedTasks));
      const sortedTasks: Task[] = sortTasks(updatedTasks);

      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks);

      localStorage.setItem("tasks", JSON.stringify(sortedTasks));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    const newFilteredTasks: Task[] = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.description.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTasks(newFilteredTasks);
  };

  const handleClick = () => {
    setCompleted(!completed);
  };

  const handleRenderType = () => {
    if (renderType === "To-do") {
      setRenderType("Future");
    } else {
      setRenderType("To-do");
    }
  };

  return (
    <main className="flex flex-col items-center justify-between py-10 px-4">
      <div className="flex flex-col	w-full">
        <h1 className="text-3xl mt-4 px-4">Tasks</h1>

        <div className="flex justify-center mt-4">
          <input
            type="text"
            name="search"
            value={searchValue}
            placeholder="Search"
            className="input input-bordered w-5/6 min-w-32"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-wrap justify-evenly mt-2">
          <label className="swap border rounded h-10 px-2">
            <input type="checkbox" onClick={handleRenderType} />
            <div className="swap-on">Tasks To Do</div>
            <div className="swap-off">Future Tasks</div>
          </label>
          <label
            className={clsx("swap border rounded h-10 px-2", {
              "text-success": completed,
            })}
          >
            <input type="checkbox" onClick={handleClick} />
            <div className="swap-on">Completed</div>
            <div className="swap-off">Completed</div>
          </label>
        </div>

        <Link className="btn btn-ghost" href="/new-task">
          <svg
            className="white-svg"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
          </svg>
          Create new task
        </Link>

        <div className="w-full pt-4 px-4">
          {filteredTasks.map((task) => renderTask(task, completed, renderType))}
        </div>
      </div>
    </main>
  );
}
