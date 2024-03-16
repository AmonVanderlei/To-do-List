import { useState } from "react";
import clsx from "clsx";
import { Task } from "../types/Task";
import ModifyButton from "./ModifyButton";
import DoneButton from "./DoneButton";

function bgColor(
  task: Task,
  currentDate: Date,
  today: string,
  taskDate: Date
): string {
  if (
    taskDate.getTime() <= currentDate.getTime() &&
    task.days.includes(today)
  ) {
    if (task.status === "Completed") {
      return "bg-green-600";
    } else {
      switch (task.priority) {
        case "High":
          return "bg-red-600";
        case "Medium":
          return "bg-yellow-500";
        case "Low":
          return "bg-primary";
      }
    }
  } else {
    if (task.status === "Completed") {
      return "bg-green-600 bg-opacity-50";
    } else {
      switch (task.priority) {
        case "High":
          return "bg-red-600 bg-opacity-50";
        case "Medium":
          return "bg-yellow-500 bg-opacity-50";
        case "Low":
          return "bg-slate-700";
      }
    }
  }
}

interface Props {
  obj: Task;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToModify: React.Dispatch<React.SetStateAction<boolean>>;
}

function Task({ obj, setTask, setShowModal, setToModify }: Props) {
  const [readMore, setReadMore] = useState<boolean>(false);
  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = daysOfWeek[currentDate.getDay()];
  const taskDate = new Date(obj.inicialDate.split("/").reverse().join("/"));
  const color = bgColor(obj, currentDate, today, taskDate);

  const descriptionLines = obj.description.split("\n").map((line, index) => {
    return <p key={index}>{line.trim() === "" ? "\u00A0" : line} </p>;
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (readMore) {
      setReadMore(false);
    } else {
      setReadMore(true);
    }
  };

  return (
    <>
      <div className={`card w-full ${color} text-primary-content mt-4`}>
        <div className="card-body !px-6">
          <h2 className="card-title">{obj.title}</h2>

          <div
            className={clsx({
              "": readMore,
              "max-h-24 overflow-hidden": !readMore,
            })}
          >
            {descriptionLines}
          </div>

          {descriptionLines.length >= 4 && (
            <button
              className="font-bold underline hover:text-blue-800"
              type="button"
              onClick={handleClick}
            >
              {readMore ? "Ler menos" : "Ler mais"}
            </button>
          )}

          {taskDate.getTime() > currentDate.getTime() ||
          !obj.days.includes(today) ? (
            <div className="card-actions justify-between">
              <p className="m-auto">
                <b>Inicial Date:</b> {obj.inicialDate}
              </p>
            </div>
          ) : null}

          <div className="card-actions justify-end">
            <div className="card-actions justify-evenly">
              <ModifyButton
                key={obj.id}
                obj={obj}
                setTask={setTask}
                setShowModal={setShowModal}
                setToModify={setToModify}
              />
              <DoneButton
                key={`${obj.id}${obj.title}`}
                id={obj.id}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                inicialDate={obj.inicialDate}
                days={obj.days}
                description={obj.description}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
