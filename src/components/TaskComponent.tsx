import { useState } from "react";
import clsx from "clsx";
import { Task, TaskStatus, TaskPriority } from "../types/Task";
import DeleteButton from "./DeleteButton";
import ModifyButton from "./ModifyButton";
import DoneButton from "./DoneButton";

function bgColor(taskStatus: TaskStatus, taskPriority: TaskPriority): string {
  if (taskStatus === "Completed") {
    return "bg-green-600";
  }
  if (taskPriority === "Low") {
    return "bg-primary";
  } else if (taskPriority === "Medium") {
    return "bg-yellow-500";
  }
  return "bg-red-600";
}

function Task(obj: Task) {
  const [readMore, setReadMore] = useState<boolean>(false);
  const color = bgColor(obj.status, obj.priority);

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

          {descriptionLines.length > 4 && (
            <button
              className="font-bold underline hover:text-blue-800"
              type="button"
              onClick={handleClick}
            >
              {readMore ? "Ler menos" : "Ler mais"}
            </button>
          )}

          <div className="card-actions justify-between">
            <p className="m-auto">
              <b>Status:</b> {obj.status}
            </p>
            <p className="m-auto">
              <b>Priority:</b> {obj.priority}
            </p>
            <p className="m-auto">
              <b>Update:</b> {obj.update}
            </p>
          </div>

          <div className="card-actions justify-between">
            <div className="card-actions justify-evenly">
              <ModifyButton
                key={obj.title}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                update={obj.update}
                inicialDate={obj.inicialDate}
                days={obj.days}
                description={obj.description}
              />
              <DeleteButton
                key={obj.description}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                update={obj.update}
                inicialDate={obj.inicialDate}
                days={obj.days}
                description={obj.description}
              />
              <DoneButton
                key={obj.priority}
                title={obj.title}
                status={obj.status}
                priority={obj.priority}
                update={obj.update}
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
