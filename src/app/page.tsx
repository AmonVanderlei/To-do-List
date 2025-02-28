"use client";

import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { Task } from "@/types/Task";
import { renderTask } from "@/utils/taskUtils";
import TaskModal from "@/components/TaskModal";
import { TaskContext } from "@/contexts/taskContext";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LiaInfoSolid } from "react-icons/lia";
import { VscSignOut } from "react-icons/vsc";

export default function Home() {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  const {
    tasks,
    dates,
    renderType,
    setRenderType,
    completed,
    setCompleted,
    setShowModal,
  } = taskContext;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  const { user, loading, logout } = authContext;

  // Filter tasks
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks ?? []);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (tasks?.length && tasks?.length > 0) {
      setFilteredTasks(
        tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [tasks, search]);

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="grow w-full h-full flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <div className="navbar bg-base-300 rounded-b-lg">
        <div className="flex-1 px-2 lg:flex-none">
          <a className="text-lg font-bold ml-4">Habit Maker</a>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-btn"
              >
                {user?.photoURL && (
                  <Image
                    src={user?.photoURL as string}
                    alt="Profile picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <li>
                  <a
                    href="https://github.com/AmonVanderlei/To-do-List"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2"
                  >
                    <LiaInfoSolid className="text-3xl" /> About
                  </a>
                </li>
                <li className="flex gap-2" onClick={logout}>
                  <p className="flex gap-2">
                    <VscSignOut className="text-3xl" />
                    Log Out
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col	w-full py-10 px-4">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="input input-bordered w-11/12 min-w-32"
          />
        </div>

        <div className="flex flex-wrap justify-around items-center my-4">
          <select
            onChange={(e) =>
              setRenderType(e.target.value as "To-do" | "Future" | "Tomorrow")
            }
            className={clsx("select select-bordered w-1/2 min-w-32 h-10", {
              "w-11/12": renderType != "To-do",
            })}
          >
            <option value="To-do">Tasks To Do</option>
            <option value="Future">Future Tasks</option>
            <option value="Tomorrow">Tomorrow Tasks</option>
          </select>

          <label
            className={clsx("swap border rounded h-10 px-2", {
              "text-success": completed,
              "!hidden": renderType != "To-do",
            })}
          >
            <input
              type="checkbox"
              onChange={() => setCompleted((prev) => !prev)}
            />

            <div className="swap-on">Completed</div>
            <div className="swap-off">Completed</div>
          </label>
        </div>

        <div className="w-full pt-4 px-4">
          {dates &&
            filteredTasks.map((task) =>
              renderTask(task, renderType, dates, completed)
            )}
        </div>
      </div>

      <TaskModal />
    </main>
  );
}
