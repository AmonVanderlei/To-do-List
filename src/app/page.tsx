"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { Task } from "@/types/Task";
import { getLocalStorage, renderTask } from "@/utils/taskUtils";
import TaskModal from "@/components/TaskModal";
import ErrorAlert from "@/components/ErrorAlert";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [renderType, setRenderType] = useState<"To-do" | "Future" | "Tomorrow">(
    "To-do"
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>(null);
  const [toModify, setToModify] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    if (reload) {
      let storedTasks: Task[] = getLocalStorage();

      setTasks(storedTasks);
      setFilteredTasks(storedTasks);
      setReload(false);
    }
  }, [reload]);

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

  const handleRenderType = (e: any) => {
    e.preventDefault();

    setRenderType(e.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-between py-10 px-4">
      <div className="flex flex-col	w-full">
        <div className="flex flex-wrap items-center justify-around w-full">
          <h1 className="text-3xl px-4">Tasks</h1>
          <button
            className="btn btn-outline w-1/2 text-primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create new task
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <input
            type="text"
            name="search"
            value={searchValue}
            placeholder="Search"
            className="input input-bordered w-11/12 min-w-32"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-wrap justify-around items-center my-4">
          <select
            onChange={handleRenderType}
            className="select select-bordered w-1/2 min-w-32 h-10"
          >
            <option value="To-do" selected>
              Tasks To Do
            </option>
            <option value="Future">Future Tasks</option>
            <option value="Tomorrow">Tomorrow Tasks</option>
          </select>

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

        <div className="w-full pt-4 px-4">
          {filteredTasks.map((task) =>
            renderTask(
              task,
              completed,
              renderType,
              setTask,
              setShowModal,
              setToModify,
              setReload,
              setCompleted
            )
          )}
        </div>
      </div>

      <TaskModal
        toModify={toModify}
        task={task}
        showModal={showModal}
        setShowModal={setShowModal}
        setReload={setReload}
        setTask={setTask}
        setToModify={setToModify}
        setShowError={setShowError}
      />

      <ErrorAlert showError={showError} />
    </main>
  );
}
