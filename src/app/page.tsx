"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Task from "@/components/TaskComponent";
import { sortTasks, updateTasks } from "@/utils/taskUtils";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
    setIsChecked(!isChecked);
  };

  return (
    <main className="flex flex-col items-center justify-between py-10 px-4">
      <div className="flex flex-col	w-full">
        <h1 className="text-3xl mt-4 px-4">Tasks</h1>

        <div className="flex justify-evenly flex-wrap mt-4">
          <input
            type="text"
            name="search"
            value={searchValue}
            placeholder="Search"
            className="input input-bordered w-3/5 min-w-32"
            onChange={handleChange}
          />
          <label className="label cursor-pointer flex-col">
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={isChecked}
              onClick={handleClick}
            />
            <span className={clsx("label-text", { "text-success": isChecked })}>
              Completed
            </span>
          </label>
        </div>

        <Link className="btn btn-ghost mt-4" href="/new-task">
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
          {filteredTasks.map((task) => {
            if (isChecked) {
              if (task.status === "Completed") {
                return (
                  <Task
                    key={task.description + task.title}
                    title={task.title}
                    status={task.status}
                    priority={task.priority}
                    update={task.update}
                    inicialDate={task.inicialDate}
                    days={task.days}
                    description={task.description}
                  />
                );
              }
            } else {
              if (task.status !== "Completed") {
                return (
                  <Task
                    key={task.description + task.title}
                    title={task.title}
                    status={task.status}
                    priority={task.priority}
                    update={task.update}
                    inicialDate={task.inicialDate}
                    days={task.days}
                    description={task.description}
                  />
                );
              }
            }
          })}
        </div>
      </div>
    </main>
  );
}
