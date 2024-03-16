"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Task from "@/components/TaskComponent";
import { sortTasks, renderTask, updateTasks } from "@/utils/taskUtils";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [renderType, setRenderType] = useState<"To-do" | "Future">("To-do");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>(null);
  const [toModify, setToModify] = useState<boolean>(false);

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

        <div className="flex flex-wrap justify-around my-4">
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

        <button
          className="btn btn-outline w-5/6 m-auto text-primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create new task
        </button>

        <div className="w-full pt-4 px-4">
          {filteredTasks.map((task) =>
            renderTask(
              task,
              completed,
              renderType,
              setTask,
              setShowModal,
              setToModify
            )
          )}
        </div>
      </div>

      <TaskModal
        toModify={toModify}
        task={task}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </main>
  );
}
