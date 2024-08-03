import { useEffect, useState } from "react";
import clsx from "clsx";
import { Task } from "../types/Task";
import ModifyButton from "./ModifyButton";
import DoneButton from "./DoneButton";

interface Props {
  obj: Task;
  colorTask: string;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToModify: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskComponent({
  obj,
  colorTask,
  setTask,
  setShowModal,
  setToModify,
  setReload,
  setCompleted,
}: Props) {
  const [color, setColor] = useState<string>("bg-yellow-500");
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

  useEffect(() => {
    setColor(colorTask);
  }, [colorTask]);

  return (
    <>
      <div className={clsx("card w-full text-primary-content mt-4", color)}>
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
                obj={obj}
                setReload={setReload}
                setCompleted={setCompleted}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskComponent;
